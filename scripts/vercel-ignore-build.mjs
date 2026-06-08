const draftBranch = process.env.GITHUB_DRAFT_BRANCH || 'admin-drafts';
const ref = process.env.VERCEL_GIT_COMMIT_REF || '';

if (ref === draftBranch) {
  console.log(`Skipping Vercel build for admin draft branch: ${draftBranch}`);
  process.exit(0);
}

console.log(`Allowing Vercel build for branch: ${ref || 'unknown'}`);
process.exit(1);
