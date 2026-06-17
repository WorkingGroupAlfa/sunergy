import {
  defaultAdminState,
  hydrateHomeContent,
  normalizeAdminState,
  sanitizeAboutContentForPersistence,
  sanitizeCaseForPersistence,
  sanitizeProductForPersistence,
  sortProductsByAvailability,
  withAdminStateTimestamp,
  type AdminState,
} from '@/lib/admin-state';
import { type AboutContent } from '@/data/about-content';
import { type HomeContent } from '@/data/home-content';
import { type CaseItem, type Product, type ProductCategory } from '@/data/shop';
import {
  discardDraft,
  getDraftStatus,
  isGitHubConflictError,
  publishDraft,
  readDraftAdminState,
  readPublishedAdminState,
  uploadDraftAsset,
  writeDraftAdminState,
} from '@/lib/github-cms';

function mergeState(currentState: AdminState, state: Partial<AdminState>) {
  return withAdminStateTimestamp({
    ...currentState,
    ...state,
    homeContent: state.homeContent ? { ...currentState.homeContent, ...state.homeContent } : currentState.homeContent,
    aboutContent: state.aboutContent ? { ...currentState.aboutContent, ...state.aboutContent } : currentState.aboutContent,
  });
}

async function mutateDraftState(mutator: (currentState: AdminState) => { state: AdminState; message: string }) {
  const maxAttempts = 5;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const { state: currentState, headSha } = await readDraftAdminState();
    const mutation = mutator(currentState);

    try {
      await writeDraftAdminState(mutation.state, mutation.message, headSha ?? undefined);
      return mutation.state;
    } catch (error) {
      if (attempt < maxAttempts - 1 && isGitHubConflictError(error)) continue;
      throw error;
    }
  }

  throw new Error('Не вдалося зберегти зміни. Спробуйте ще раз.');
}

export async function readAdminState(options: { draft?: boolean } = {}) {
  if (options.draft) {
    const { state } = await readDraftAdminState();
    return state;
  }
  return readPublishedAdminState();
}

export async function writeAdminState(state: Partial<AdminState>) {
  return mutateDraftState((currentState) => ({
    state: mergeState(currentState, state),
    message: 'Update admin state',
  }));
}

export async function saveProductState(product: Product, previousSlug?: string) {
  return mutateDraftState((currentState) => {
    const sanitized = sanitizeProductForPersistence(product);
    const sourceProducts =
      previousSlug && previousSlug !== sanitized.slug
        ? currentState.products.filter((item) => item.slug !== previousSlug)
        : currentState.products;
    const exists = sourceProducts.some((item) => item.slug === sanitized.slug);
    const products = sortProductsByAvailability(
      exists ? sourceProducts.map((item) => (item.slug === sanitized.slug ? sanitized : item)) : [sanitized, ...sourceProducts]
    );

    return {
      state: mergeState(currentState, { products }),
      message: `Save product: ${sanitized.slug}`,
    };
  });
}

export async function deleteProductState(slug: string) {
  return mutateDraftState((currentState) => ({
    state: mergeState(currentState, { products: currentState.products.filter((item) => item.slug !== slug) }),
    message: `Delete product: ${slug}`,
  }));
}

export async function resetProductsState() {
  return mutateDraftState((currentState) => ({
    state: mergeState(currentState, { products: defaultAdminState.products }),
    message: 'Reset products',
  }));
}

export async function saveCategoryState(category: ProductCategory, previousCategory?: ProductCategory) {
  return mutateDraftState((currentState) => {
    const nextCategory = category.trim() as ProductCategory;
    const withoutPrevious = previousCategory ? currentState.categories.filter((item) => item !== previousCategory) : currentState.categories;
    const categories = Array.from(new Set([...withoutPrevious, nextCategory]));
    const products =
      previousCategory && previousCategory !== nextCategory
        ? sortProductsByAvailability(currentState.products.map((product) => (product.category === previousCategory ? { ...product, category: nextCategory } : product)))
        : currentState.products;

    return {
      state: mergeState(currentState, { categories, products }),
      message: `Save category: ${nextCategory}`,
    };
  });
}

export async function deleteCategoryState(category: ProductCategory) {
  return mutateDraftState((currentState) => {
    if (currentState.products.some((product) => product.category === category)) {
      throw new Error('Category has products.');
    }

    return {
      state: mergeState(currentState, { categories: currentState.categories.filter((item) => item !== category) }),
      message: `Delete category: ${category}`,
    };
  });
}

export async function resetCategoriesState() {
  return mutateDraftState((currentState) => ({
    state: mergeState(currentState, { categories: defaultAdminState.categories }),
    message: 'Reset categories',
  }));
}

export async function saveCaseState(item: CaseItem, previousSlug?: string) {
  return mutateDraftState((currentState) => {
    const sanitized = sanitizeCaseForPersistence(item);
    const withoutPrevious = previousSlug ? currentState.cases.filter((caseItem) => caseItem.slug !== previousSlug) : currentState.cases;
    const exists = withoutPrevious.some((caseItem) => caseItem.slug === sanitized.slug);
    const cases = exists ? withoutPrevious.map((caseItem) => (caseItem.slug === sanitized.slug ? sanitized : caseItem)) : [sanitized, ...withoutPrevious];

    return {
      state: mergeState(currentState, { cases }),
      message: `Save case: ${sanitized.slug}`,
    };
  });
}

export async function deleteCaseState(slug: string) {
  return mutateDraftState((currentState) => ({
    state: mergeState(currentState, { cases: currentState.cases.filter((item) => item.slug !== slug) }),
    message: `Delete case: ${slug}`,
  }));
}

export async function resetCasesState() {
  return mutateDraftState((currentState) => ({
    state: mergeState(currentState, { cases: defaultAdminState.cases }),
    message: 'Reset cases',
  }));
}

export async function saveHomeContentState(content: HomeContent) {
  return mutateDraftState((currentState) => {
    const homeContent = hydrateHomeContent(content);

    return {
      state: mergeState(currentState, { homeContent }),
      message: 'Save home content',
    };
  });
}

export async function resetHomeContentState() {
  return mutateDraftState((currentState) => ({
    state: mergeState(currentState, { homeContent: defaultAdminState.homeContent }),
    message: 'Reset home content',
  }));
}

export async function saveAboutContentState(content: AboutContent) {
  return mutateDraftState((currentState) => {
    const aboutContent = sanitizeAboutContentForPersistence(content);

    return {
      state: mergeState(currentState, { aboutContent }),
      message: 'Save about content',
    };
  });
}

export async function resetAboutContentState() {
  return mutateDraftState((currentState) => ({
    state: mergeState(currentState, { aboutContent: defaultAdminState.aboutContent }),
    message: 'Reset about content',
  }));
}

export async function saveShowCalculatorState(showCalculator: boolean) {
  return mutateDraftState((currentState) => ({
    state: mergeState(currentState, { showCalculator }),
    message: 'Save settings',
  }));
}

export async function uploadAdminAssetState(file: File) {
  return uploadDraftAsset(file);
}

export async function readAdminDraftStatus() {
  return getDraftStatus();
}

export async function publishAdminDraft() {
  return publishDraft();
}

export async function discardAdminDraft() {
  return discardDraft();
}

export function normalizeStateForClient(state: Partial<AdminState>) {
  return normalizeAdminState(state);
}
