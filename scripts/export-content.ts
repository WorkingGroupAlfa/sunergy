import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { defaultAdminState, sanitizeAdminStateForPersistence } from '../lib/admin-state';

const contentDir = join(process.cwd(), 'content');
const state = sanitizeAdminStateForPersistence(defaultAdminState);
const timestamp = new Date().toISOString();

function writeJson(path: string, value: unknown) {
  writeFileSync(join(contentDir, path), `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

mkdirSync(contentDir, { recursive: true });

writeJson('products.json', state.products);
writeJson('categories.json', state.categories);
writeJson('cases.json', state.cases);
writeJson('home.json', state.homeContent);
writeJson('about.json', state.aboutContent);
writeJson('meta.json', {
  showCalculator: state.showCalculator,
  updatedAt: state.updatedAt ?? timestamp,
  catalogSignature: state.catalogSignature,
});

console.log(`Wrote content files to ${contentDir}`);
