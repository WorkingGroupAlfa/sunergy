import { type AboutContent } from '@/data/about-content';
import { type HomeContent } from '@/data/home-content';
import { type CaseItem, type Product, type ProductCategory } from '@/data/shop';

type JsonBody = Record<string, unknown>;

export type AdminDraftStatus = {
  configured: boolean;
  draftBranch: string;
  baseBranch: string;
  hasPendingChanges: boolean;
  changedFiles: string[];
};

async function parseError(response: Response) {
  const body = (await response.json().catch(() => null)) as { error?: string } | null;
  return body?.error || `Admin request failed: ${response.status}`;
}

function notifyAdminStateChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('sunergy-admin-state-change'));
  }
}

async function adminJson<T>(url: string, method: string, body?: JsonBody) {
  const response = await fetch(url, {
    method,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const result = (await response.json().catch(() => ({}))) as T;
  if (method !== 'GET') notifyAdminStateChanged();
  return result;
}

export async function loginAdmin(password: string) {
  return adminJson<{ ok: true }>('/api/admin-auth/login', 'POST', { password });
}

export async function logoutAdmin() {
  return adminJson<{ ok: true }>('/api/admin-auth/logout', 'POST');
}

export async function checkAdminSession() {
  const response = await fetch('/api/admin-auth/session', {
    cache: 'no-store',
    headers: { 'Cache-Control': 'no-cache' },
  });
  const body = (await response.json().catch(() => null)) as { authenticated?: boolean } | null;
  return body?.authenticated === true;
}

export async function getAdminDraftStatus() {
  return adminJson<AdminDraftStatus>('/api/admin-state/status', 'GET');
}

export async function publishAdminDraft() {
  return adminJson<AdminDraftStatus>('/api/admin-state/publish', 'POST');
}

export async function discardAdminDraft() {
  return adminJson<AdminDraftStatus>('/api/admin-state/discard', 'POST');
}

export async function saveRemoteProduct(product: Product, previousSlug?: string) {
  return adminJson<{ ok: true }>('/api/admin-state/products', 'PUT', { product, previousSlug });
}

export async function deleteRemoteProduct(slug: string) {
  return adminJson<{ ok: true }>('/api/admin-state/products', 'DELETE', { slug });
}

export async function resetRemoteProducts() {
  return adminJson<{ ok: true }>('/api/admin-state/products', 'POST', { action: 'reset' });
}

export async function saveRemoteCategory(category: ProductCategory, previousCategory?: ProductCategory) {
  return adminJson<{ ok: true }>('/api/admin-state/categories', 'PUT', { category, previousCategory });
}

export async function deleteRemoteCategory(category: ProductCategory) {
  return adminJson<{ ok: true }>('/api/admin-state/categories', 'DELETE', { category });
}

export async function resetRemoteCategories() {
  return adminJson<{ ok: true }>('/api/admin-state/categories', 'POST', { action: 'reset' });
}

export async function saveRemoteCase(item: CaseItem, previousSlug?: string) {
  return adminJson<{ ok: true }>('/api/admin-state/cases', 'PUT', { item, previousSlug });
}

export async function deleteRemoteCase(slug: string) {
  return adminJson<{ ok: true }>('/api/admin-state/cases', 'DELETE', { slug });
}

export async function resetRemoteCases() {
  return adminJson<{ ok: true }>('/api/admin-state/cases', 'POST', { action: 'reset' });
}

export async function saveRemoteHomeContent(content: HomeContent) {
  return adminJson<{ ok: true }>('/api/admin-state/home-content', 'PUT', { content });
}

export async function resetRemoteHomeContent() {
  return adminJson<{ ok: true }>('/api/admin-state/home-content', 'POST', { action: 'reset' });
}

export async function saveRemoteAboutContent(content: AboutContent) {
  return adminJson<{ ok: true }>('/api/admin-state/about-content', 'PUT', { content });
}

export async function resetRemoteAboutContent() {
  return adminJson<{ ok: true }>('/api/admin-state/about-content', 'POST', { action: 'reset' });
}

export async function saveRemoteShowCalculator(showCalculator: boolean) {
  return adminJson<{ ok: true }>('/api/admin-state/settings', 'PUT', { showCalculator });
}

export async function uploadAdminAsset(file: File) {
  const formData = new FormData();
  formData.set('file', file);

  const response = await fetch('/api/admin-state/assets', {
    method: 'POST',
    cache: 'no-store',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const body = (await response.json()) as { url?: string };
  if (!body.url) throw new Error('Image upload did not return a URL.');

  notifyAdminStateChanged();
  return body.url;
}
