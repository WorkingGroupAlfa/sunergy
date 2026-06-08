import { Buffer } from 'node:buffer';
import { contentFilesFromState, CONTENT_PATHS, isManagedContentPath, stateFromContentFiles, UPLOAD_PREFIX } from '@/lib/content-store';
import { normalizeAdminState, type AdminState } from '@/lib/admin-state';
import { type AboutContent } from '@/data/about-content';
import { type HomeContent } from '@/data/home-content';
import { type CaseItem, type Product, type ProductCategory } from '@/data/shop';

type GitHubConfig = {
  owner: string;
  repo: string;
  token: string;
  baseBranch: string;
  draftBranch: string;
};

type GitHubRef = {
  object: {
    sha: string;
  };
};

type GitHubCommit = {
  sha: string;
  tree: {
    sha: string;
  };
};

type GitHubTree = {
  tree: Array<{
    path?: string;
    mode?: string;
    type?: string;
    sha?: string;
  }>;
};

type GitHubContent = {
  content?: string;
  encoding?: string;
};

type DraftStatus = {
  configured: boolean;
  draftBranch: string;
  baseBranch: string;
  hasPendingChanges: boolean;
  changedFiles: string[];
};

type TextFileUpdate = {
  path: string;
  content: string;
};

type BlobFileUpdate = {
  path: string;
  blobSha: string;
};

type FileUpdate = TextFileUpdate | BlobFileUpdate;

export class GitHubApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: string
  ) {
    super(message);
  }
}

export function isGitHubConflictError(error: unknown) {
  return error instanceof GitHubApiError && (error.status === 409 || (error.status === 422 && /reference|fast-forward|sha/i.test(error.body)));
}

function getGitHubConfig(): GitHubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const repository = process.env.GITHUB_REPO;
  if (!token || !repository?.includes('/')) return null;

  const [owner, repo] = repository.split('/');
  return {
    owner,
    repo,
    token,
    baseBranch: process.env.GITHUB_BRANCH || 'main',
    draftBranch: process.env.GITHUB_DRAFT_BRANCH || 'admin-drafts',
  };
}

function endpoint(config: GitHubConfig, path: string) {
  return `https://api.github.com/repos/${config.owner}/${config.repo}${path}`;
}

async function githubFetch<T>(config: GitHubConfig, path: string, init: RequestInit = {}) {
  const response = await fetch(endpoint(config, path), {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...init.headers,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new GitHubApiError(`GitHub API failed: ${response.status} ${body}`, response.status, body);
  }

  return (await response.json()) as T;
}

async function githubFetchNullable<T>(config: GitHubConfig, path: string, init: RequestInit = {}) {
  const response = await fetch(endpoint(config, path), {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...init.headers,
    },
    cache: 'no-store',
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    const body = await response.text();
    throw new GitHubApiError(`GitHub API failed: ${response.status} ${body}`, response.status, body);
  }

  return (await response.json()) as T;
}

async function getBranchHead(config: GitHubConfig, branch: string) {
  const ref = await githubFetchNullable<GitHubRef>(config, `/git/ref/heads/${encodeURIComponent(branch)}`);
  return ref?.object.sha ?? null;
}

async function getCommit(config: GitHubConfig, sha: string) {
  return githubFetch<GitHubCommit>(config, `/git/commits/${sha}`);
}

async function createBranch(config: GitHubConfig, branch: string, sha: string) {
  await githubFetch(config, '/git/refs', {
    method: 'POST',
    body: JSON.stringify({
      ref: `refs/heads/${branch}`,
      sha,
    }),
  });
}

async function updateBranch(config: GitHubConfig, branch: string, sha: string, force = false) {
  await githubFetch(config, `/git/refs/heads/${encodeURIComponent(branch)}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha, force }),
  });
}

async function ensureDraftBranch(config: GitHubConfig) {
  const existingDraftHead = await getBranchHead(config, config.draftBranch);
  if (existingDraftHead) return existingDraftHead;

  const baseHead = await getBranchHead(config, config.baseBranch);
  if (!baseHead) throw new Error(`Base branch ${config.baseBranch} was not found.`);

  await createBranch(config, config.draftBranch, baseHead);
  return baseHead;
}

async function readJsonFromGitHub<T>(config: GitHubConfig, path: string, branch: string, fallback: T) {
  const file = await githubFetchNullable<GitHubContent>(
    config,
    `/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}?ref=${encodeURIComponent(branch)}`
  );

  if (!file?.content) return fallback;

  const raw = Buffer.from(file.content, 'base64').toString('utf8');
  return JSON.parse(raw) as T;
}

async function readStateFromBranch(config: GitHubConfig, branch: string) {
  const published = stateFromContentFiles();
  const [products, categories, cases, homeContent, aboutContent, meta] = await Promise.all([
    readJsonFromGitHub<Product[]>(config, CONTENT_PATHS.products, branch, published.products),
    readJsonFromGitHub<ProductCategory[]>(config, CONTENT_PATHS.categories, branch, published.categories),
    readJsonFromGitHub<CaseItem[]>(config, CONTENT_PATHS.cases, branch, published.cases),
    readJsonFromGitHub<HomeContent>(config, CONTENT_PATHS.home, branch, published.homeContent),
    readJsonFromGitHub<AboutContent>(config, CONTENT_PATHS.about, branch, published.aboutContent),
    readJsonFromGitHub<{ showCalculator?: boolean; updatedAt?: string; catalogSignature?: string }>(
      config,
      CONTENT_PATHS.meta,
      branch,
      { showCalculator: published.showCalculator, updatedAt: published.updatedAt, catalogSignature: published.catalogSignature }
    ),
  ]);

  return normalizeAdminState({
    products,
    categories,
    cases,
    homeContent,
    aboutContent,
    showCalculator: meta.showCalculator === true,
    updatedAt: meta.updatedAt,
    catalogSignature: meta.catalogSignature,
  });
}

async function commitFilesToBranch(config: GitHubConfig, branch: string, files: FileUpdate[], message: string) {
  if (files.length === 0) return;

  const head = branch === config.draftBranch ? await ensureDraftBranch(config) : await getBranchHead(config, branch);
  if (!head) throw new Error(`Branch ${branch} was not found.`);

  const headCommit = await getCommit(config, head);
  const tree = await githubFetch<{ sha: string }>(config, '/git/trees', {
    method: 'POST',
    body: JSON.stringify({
      base_tree: headCommit.tree.sha,
      tree: files.map((file) => ({
        path: file.path,
        mode: '100644',
        type: 'blob',
        ...('blobSha' in file ? { sha: file.blobSha } : { content: file.content }),
      })),
    }),
  });
  const commit = await githubFetch<{ sha: string }>(config, '/git/commits', {
    method: 'POST',
    body: JSON.stringify({
      message,
      tree: tree.sha,
      parents: [head],
    }),
  });

  await updateBranch(config, branch, commit.sha);
}

async function commitStateToDraft(state: AdminState, message: string) {
  const config = getGitHubConfig();
  if (!config) {
    throw new Error('GitHub CMS is not configured.');
  }

  const files = contentFilesFromState(state);
  await commitFilesToBranch(
    config,
    config.draftBranch,
    Object.entries(files).map(([path, value]) => ({ path, content: `${JSON.stringify(value, null, 2)}\n` })),
    message
  );
}

async function createBlob(config: GitHubConfig, content: ArrayBuffer) {
  const body = Buffer.from(content).toString('base64');
  const blob = await githubFetch<{ sha: string }>(config, '/git/blobs', {
    method: 'POST',
    body: JSON.stringify({
      content: body,
      encoding: 'base64',
    }),
  });

  return blob.sha;
}

function createUploadPath(fileName: string) {
  const extension = fileName.includes('.') ? fileName.split('.').pop()?.toLowerCase() : 'webp';
  const baseName =
    fileName
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9а-яіїєґё]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'image';
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  const suffix = Math.random().toString(36).slice(2, 8);

  return `${UPLOAD_PREFIX}${stamp}-${suffix}-${baseName}.${extension || 'webp'}`;
}

export async function readPublishedAdminState() {
  return stateFromContentFiles();
}

export async function readDraftAdminState() {
  const config = getGitHubConfig();
  if (!config) return stateFromContentFiles();

  const draftHead = await getBranchHead(config, config.draftBranch);
  return readStateFromBranch(config, draftHead ? config.draftBranch : config.baseBranch);
}

export async function writeDraftAdminState(state: AdminState, message = 'Update admin content') {
  await commitStateToDraft(state, message);
}

export async function uploadDraftAsset(file: File) {
  const config = getGitHubConfig();
  if (!config) {
    throw new Error('GitHub CMS is not configured.');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Only image uploads are supported.');
  }

  if (file.size > 4 * 1024 * 1024) {
    throw new Error('Image is still too large after optimization. Use a smaller source image.');
  }

  await ensureDraftBranch(config);
  const path = createUploadPath(file.name || 'image.webp');
  const blobSha = await createBlob(config, await file.arrayBuffer());
  await commitFilesToBranch(config, config.draftBranch, [{ path, blobSha }], `Upload admin asset: ${path.replace(UPLOAD_PREFIX, '')}`);

  return `/${path.replace(/^public\//, '')}`;
}

export async function getDraftStatus(): Promise<DraftStatus> {
  const config = getGitHubConfig();
  if (!config) {
    return {
      configured: false,
      draftBranch: 'admin-drafts',
      baseBranch: 'main',
      hasPendingChanges: false,
      changedFiles: [],
    };
  }

  const draftHead = await getBranchHead(config, config.draftBranch);
  const baseHead = await getBranchHead(config, config.baseBranch);
  if (!draftHead || !baseHead || draftHead === baseHead) {
    return {
      configured: true,
      draftBranch: config.draftBranch,
      baseBranch: config.baseBranch,
      hasPendingChanges: false,
      changedFiles: [],
    };
  }

  const compare = await githubFetch<{ files?: Array<{ filename: string }> }>(
    config,
    `/compare/${encodeURIComponent(config.baseBranch)}...${encodeURIComponent(config.draftBranch)}`
  );
  const changedFiles = (compare.files ?? []).map((file) => file.filename).filter(isManagedContentPath);

  return {
    configured: true,
    draftBranch: config.draftBranch,
    baseBranch: config.baseBranch,
    hasPendingChanges: changedFiles.length > 0,
    changedFiles,
  };
}

export async function publishDraft() {
  const config = getGitHubConfig();
  if (!config) throw new Error('GitHub CMS is not configured.');

  const draftHead = await ensureDraftBranch(config);
  const baseHead = await getBranchHead(config, config.baseBranch);
  if (!baseHead) throw new Error(`Base branch ${config.baseBranch} was not found.`);
  if (draftHead === baseHead) return getDraftStatus();

  const [baseCommit, draftCommit] = await Promise.all([getCommit(config, baseHead), getCommit(config, draftHead)]);
  const draftTree = await githubFetch<GitHubTree>(config, `/git/trees/${draftCommit.tree.sha}?recursive=1`);
  const managedFiles = draftTree.tree
    .filter((entry) => entry.path && entry.type === 'blob' && entry.sha && isManagedContentPath(entry.path))
    .map((entry) => ({
      path: entry.path,
      mode: entry.mode ?? '100644',
      type: 'blob',
      sha: entry.sha,
    }));

  const tree = await githubFetch<{ sha: string }>(config, '/git/trees', {
    method: 'POST',
    body: JSON.stringify({
      base_tree: baseCommit.tree.sha,
      tree: managedFiles,
    }),
  });
  const commit = await githubFetch<{ sha: string }>(config, '/git/commits', {
    method: 'POST',
    body: JSON.stringify({
      message: 'Publish admin content',
      tree: tree.sha,
      parents: [baseHead],
    }),
  });

  await updateBranch(config, config.baseBranch, commit.sha);
  await updateBranch(config, config.draftBranch, commit.sha, true);

  return getDraftStatus();
}

export async function discardDraft() {
  const config = getGitHubConfig();
  if (!config) throw new Error('GitHub CMS is not configured.');

  const baseHead = await getBranchHead(config, config.baseBranch);
  if (!baseHead) throw new Error(`Base branch ${config.baseBranch} was not found.`);

  const draftHead = await getBranchHead(config, config.draftBranch);
  if (!draftHead) {
    await createBranch(config, config.draftBranch, baseHead);
  } else {
    await updateBranch(config, config.draftBranch, baseHead, true);
  }

  return getDraftStatus();
}
