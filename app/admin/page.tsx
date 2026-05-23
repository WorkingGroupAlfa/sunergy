'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, BadgeCheck, BriefcaseBusiness, FileText, Filter, Home, ImageIcon, Info, ListChecks, LockKeyhole, Pencil, Plus, RotateCcw, Save, Tags, Trash2, UploadCloud } from 'lucide-react';
import { type Product, type ProductAvailability, type ProductCategory } from '@/data/shop';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/components/shop/shop-provider';
import { ImageDropzone } from '@/components/admin/image-dropzone';

type ProductFormState = {
  slug: string;
  title: string;
  category: ProductCategory;
  brand: string;
  availability: ProductAvailability;
  price: string;
  oldPrice: string;
  rating: string;
  reviews: string;
  image: string;
  images: string;
  shortDescription: string;
  description: string;
  specs: string;
  badges: string;
};

type EditorTab = 'main' | 'content' | 'details';
type CategoryFilter = ProductCategory | 'all';

const ADMIN_PASSWORD = 'Vgz24';
const ADMIN_AUTH_KEY = 'sunergy_admin_authenticated';

const availabilityOptions: Array<{ value: ProductAvailability; label: string; className: string }> = [
  { value: 'available', label: 'Є в наявності', className: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
  { value: 'preorder', label: 'Під замовлення', className: 'bg-amber-50 text-amber-700 ring-amber-100' },
  { value: 'out_of_stock', label: 'Немає в наявності', className: 'bg-slate-100 text-slate-600 ring-slate-200' },
];

const availabilityMap = Object.fromEntries(availabilityOptions.map((option) => [option.value, option])) as Record<
  ProductAvailability,
  (typeof availabilityOptions)[number]
>;

const availabilitySortOrder: Record<ProductAvailability, number> = {
  available: 0,
  preorder: 1,
  out_of_stock: 2,
};

const tabs: Array<{ id: EditorTab; label: string; icon: typeof FileText }> = [
  { id: 'main', label: 'Основне', icon: BadgeCheck },
  { id: 'content', label: 'Опис', icon: FileText },
  { id: 'details', label: 'Деталі', icon: ListChecks },
];

const emptyForm: ProductFormState = {
  slug: '',
  title: '',
  category: 'Акумулятори',
  brand: 'SUNERGY',
  availability: 'available',
  price: '',
  oldPrice: '',
  rating: '4.8',
  reviews: '0',
  image: '/illustrations/product-battery.svg',
  images: '',
  shortDescription: '',
  description: '',
  specs: '',
  badges: '',
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яіїєґё]+/gi, '-')
    .replace(/^-+|-+$/g, '');
}

function listToText(items: string[]) {
  return items.join('\n');
}

function textToList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function formFromProduct(product: Product): ProductFormState {
  return {
    slug: product.slug,
    title: product.title,
    category: product.category,
    brand: product.brand,
    availability: product.availability ?? 'available',
    price: String(product.price),
    oldPrice: product.oldPrice ? String(product.oldPrice) : '',
    rating: String(product.rating),
    reviews: String(product.reviews),
    image: product.image,
    images: listToText(product.images?.filter((image) => image !== product.image) ?? []),
    shortDescription: product.shortDescription,
    description: product.description,
    specs: listToText(product.specs),
    badges: listToText(product.badges),
  };
}

export default function AdminPage() {
  const { products, categories, showCalculator, saveProduct, deleteProduct, resetProducts, saveCategory, deleteCategory, resetCategories, setShowCalculator } = useShop();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<EditorTab>('main');
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const availableCategories = useMemo(
    () => categories.filter((category) => products.some((product) => product.category === category)),
    [categories, products]
  );

  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true');
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...products]
      .sort((a, b) => {
        const availabilityDiff = availabilitySortOrder[a.availability ?? 'available'] - availabilitySortOrder[b.availability ?? 'available'];
        if (availabilityDiff !== 0) return availabilityDiff;
        return a.title.localeCompare(b.title);
      })
      .filter((product) => {
        if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
        if (!normalizedQuery) return true;
        return `${product.title} ${product.brand} ${product.category}`.toLowerCase().includes(normalizedQuery);
      });
  }, [products, query, selectedCategory]);

  const isEditing = editingSlug !== null;

  const updateForm = <K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addGalleryImages = async (files: FileList | null) => {
    if (!files?.length) return;

    const readers = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result ?? ''));
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          })
      );

    if (readers.length === 0) {
      setMessage('Оберіть файли зображень');
      return;
    }

    const uploadedImages = (await Promise.all(readers)).filter((value) => value.startsWith('data:image/'));
    setForm((prev) => ({
      ...prev,
      images: listToText(Array.from(new Set([...textToList(prev.images), ...uploadedImages]))),
    }));
    setMessage(`Додано фото: ${uploadedImages.length}`);
  };

  const startCreate = () => {
    setEditingSlug(null);
    setForm(emptyForm);
    setActiveTab('main');
    setMessage('');
  };

  const startEdit = (product: Product) => {
    setEditingSlug(product.slug);
    setForm(formFromProduct(product));
    setActiveTab('main');
    setMessage('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextSlug = form.slug.trim() || slugify(form.title);
    const mainImage = form.image.trim() || '/illustrations/product-battery.svg';
    const galleryImages = Array.from(new Set([mainImage, ...textToList(form.images)]));
    const product: Product = {
      slug: nextSlug,
      title: form.title.trim(),
      category: form.category,
      brand: form.brand.trim(),
      availability: form.availability,
      price: Number(form.price) || 0,
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
      image: mainImage,
      images: galleryImages.length > 1 ? galleryImages : undefined,
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim(),
      specs: textToList(form.specs),
      badges: textToList(form.badges),
    };

    if (editingSlug && editingSlug !== product.slug) {
      deleteProduct(editingSlug);
    }

    saveProduct(product);
    setEditingSlug(product.slug);
    setForm(formFromProduct(product));
    setMessage('Збережено');
  };

  const handleDelete = (slug: string) => {
    if (!window.confirm('Видалити товар з каталогу?')) return;
    deleteProduct(slug);
    if (editingSlug === slug) {
      startCreate();
    }
    setMessage('Видалено');
  };

  const handleReset = () => {
    if (!window.confirm('Скинути каталог до базового набору товарів?')) return;
    resetProducts();
    startCreate();
    setMessage('Каталог скинуто');
  };

  const startCategoryEdit = (category: ProductCategory) => {
    setEditingCategory(category);
    setCategoryName(category);
    setMessage('');
  };

  const handleCategorySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextCategory = categoryName.trim() as ProductCategory;
    if (!nextCategory) return;

    saveCategory(nextCategory, editingCategory ?? undefined);
    setForm((prev) => (editingCategory && prev.category === editingCategory ? { ...prev, category: nextCategory } : prev));
    setEditingCategory(null);
    setCategoryName('');
    setMessage('Категорію збережено');
  };

  const handleCategoryDelete = (category: ProductCategory) => {
    if (!window.confirm(`Видалити категорію "${category}"?`)) return;
    const deleted = deleteCategory(category);
    setMessage(deleted ? 'Категорію видалено' : 'Спочатку перенесіть або видаліть товари з цієї категорії');
    if (deleted && editingCategory === category) {
      setEditingCategory(null);
      setCategoryName('');
    }
  };

  const handleCategoriesReset = () => {
    if (!window.confirm('Скинути категорії до базового списку?')) return;
    resetCategories();
    setEditingCategory(null);
    setCategoryName('');
    setMessage('Категорії скинуто');
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setLoginError('');
      setPassword('');
      return;
    }

    setLoginError('Невірний пароль');
  };

  const selectedAvailability = availabilityMap[form.availability];

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4 text-ink">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
          <Link href="/" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-steel hover:text-ink" aria-label="На сайт">
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="mt-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white">
            <LockKeyhole className="h-5 w-5" />
          </div>

          <div className="mt-5">
            <div className="text-xs uppercase tracking-[0.18em] text-accent">SUNERGY CRM</div>
            <h1 className="mt-2 text-2xl font-semibold text-ink">Вхід в адмінку</h1>
            <p className="mt-2 text-sm leading-6 text-steel">Введіть пароль, щоб відкрити керування товарами.</p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-ink" htmlFor="admin-password">
                Пароль
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setLoginError('');
                }}
                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-accent focus:bg-white"
                autoComplete="current-password"
                autoFocus
              />
              {loginError ? <p className="mt-2 text-sm font-medium text-red-600">{loginError}</p> : null}
            </div>

            <button type="submit" className="btn-primary h-12 w-full">
              Увійти
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-ink">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1760px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-steel hover:text-ink" aria-label="На сайт">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-accent">SUNERGY CRM</div>
              <h1 className="text-xl font-semibold leading-tight text-ink">Товари</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {message ? <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{message}</span> : null}
            <button type="button" onClick={startCreate} className="btn-primary">
              <Plus className="h-4 w-4" />
              <span className="ml-2">Новий</span>
            </button>
            <Link href="/admin/works" className="btn-secondary">
              <BriefcaseBusiness className="h-4 w-4" />
              <span className="ml-2">Наші роботи</span>
            </Link>
            <Link href="/admin/home" className="btn-secondary">
              <Home className="h-4 w-4" />
              <span className="ml-2">Головна</span>
            </Link>
            <Link href="/admin/about" className="btn-secondary">
              <Info className="h-4 w-4" />
              <span className="ml-2">Про нас</span>
            </Link>
            <button type="button" onClick={handleReset} className="btn-secondary">
              <RotateCcw className="h-4 w-4" />
              <span className="ml-2">Скинути</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1760px] gap-4 px-4 py-4 sm:px-6 lg:h-[calc(100vh-65px)] lg:grid-cols-[minmax(360px,430px)_1fr]">
        <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft lg:flex lg:min-h-0 lg:flex-col">
          <div className="border-b border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-ink">Каталог</h2>
                <p className="mt-1 text-xs text-steel">{products.length} позицій</p>
              </div>
              <span className="rounded-full bg-frost px-3 py-1 text-xs font-medium text-accent">{filteredProducts.length} показано</span>
            </div>
            <div className="mt-3 flex gap-2">
              <input
                className="h-10 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-accent focus:bg-white"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Пошук за назвою, брендом..."
              />
              <button
                type="button"
                onClick={() => setFiltersOpen((value) => !value)}
                className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold transition ${
                  selectedCategory === 'all' ? 'border-slate-200 bg-white text-steel hover:text-ink' : 'border-accent bg-blue-50 text-accent'
                }`}
                aria-expanded={filtersOpen}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Фільтр</span>
              </button>
            </div>

            {filtersOpen ? (
              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.14em] text-steel">Категорія</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      selectedCategory === 'all' ? 'bg-ink text-white' : 'bg-white text-steel ring-1 ring-slate-200 hover:text-ink'
                    }`}
                  >
                    Усі
                  </button>
                  {availableCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        selectedCategory === category ? 'bg-ink text-white' : 'bg-white text-steel ring-1 ring-slate-200 hover:text-ink'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <input
                type="checkbox"
                checked={showCalculator}
                onChange={(event) => {
                  setShowCalculator(event.target.checked);
                  setMessage(event.target.checked ? 'Калькулятор показано на головній' : 'Калькулятор приховано з головної');
                }}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
              />
              <span>
                <span className="block text-sm font-semibold text-ink">Показувати калькулятор на головній</span>
                <span className="mt-1 block text-xs leading-5 text-steel">Зніміть галочку, щоб тимчасово приховати блок з сайту.</span>
              </span>
            </label>

            <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                  <Tags className="h-4 w-4 text-accent" />
                  Категорії
                </div>
                <button type="button" onClick={handleCategoriesReset} className="text-xs font-semibold text-accent hover:text-ink">
                  Скинути
                </button>
              </div>

              <form onSubmit={handleCategorySubmit} className="mt-3 flex gap-2">
                <input
                  className="h-10 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-accent"
                  value={categoryName}
                  onChange={(event) => setCategoryName(event.target.value)}
                  placeholder="Нова категорія"
                />
                <button type="submit" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white transition hover:bg-accent" aria-label="Зберегти категорію">
                  <Save className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((category) => {
                  const count = products.filter((product) => product.category === category).length;
                  return (
                    <span key={category} className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink ring-1 ring-slate-200">
                      <button type="button" onClick={() => startCategoryEdit(category)} className="max-w-[160px] truncate hover:text-accent" title={category}>
                        {category} ({count})
                      </button>
                      <button type="button" onClick={() => handleCategoryDelete(category)} className="rounded-full p-0.5 text-steel hover:bg-red-50 hover:text-red-600" aria-label={`Видалити ${category}`}>
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100 overflow-auto lg:min-h-0">
            {filteredProducts.map((product) => {
              const availability = availabilityMap[product.availability ?? 'available'];
              const active = editingSlug === product.slug;

              return (
                <button
                  key={product.slug}
                  type="button"
                  onClick={() => startEdit(product)}
                  className={`grid w-full grid-cols-[56px_1fr] gap-3 p-3 text-left transition hover:bg-slate-50 ${active ? 'bg-blue-50/70' : 'bg-white'}`}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={96}
                    height={96}
                    unoptimized={product.image.startsWith('data:image/')}
                    className="h-14 w-14 rounded-xl border border-slate-200 bg-frost object-cover"
                  />
                  <span className="min-w-0">
                    <span className="flex items-start justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-ink">{product.title}</span>
                      <span className="shrink-0 text-xs font-semibold text-ink">{formatPrice(product.price)}</span>
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-2 text-xs text-steel">
                      <span>{product.brand}</span>
                      <span>·</span>
                      <span>{product.category}</span>
                    </span>
                    <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${availability.className}`}>
                      {availability.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft lg:flex lg:min-h-0 lg:flex-col">
          <div className="border-b border-slate-200 p-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-[0.18em] text-accent">{isEditing ? 'Редагування' : 'Створення'}</div>
                <h2 className="mt-1 truncate text-xl font-semibold text-ink">{form.title || 'Новий товар'}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {isEditing ? (
                  <button
                    type="button"
                    onClick={() => handleDelete(editingSlug)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Видалити</span>
                  </button>
                ) : null}
                <button type="submit" className="btn-primary">
                  <Save className="h-4 w-4" />
                  <span className="ml-2">Зберегти</span>
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeTab === tab.id ? 'bg-ink text-white' : 'bg-slate-100 text-steel hover:bg-slate-200 hover:text-ink'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 overflow-auto p-4 lg:min-h-0 xl:grid-cols-[1fr_300px]">
            <section className="min-w-0">
              {activeTab === 'main' ? (
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  <label className="block md:col-span-2 xl:col-span-3">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Назва</span>
                    <input className="input h-11" value={form.title} onChange={(event) => updateForm('title', event.target.value)} required />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Slug</span>
                    <input className="input h-11" value={form.slug} onChange={(event) => updateForm('slug', slugify(event.target.value))} placeholder="auto-from-title" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Бренд</span>
                    <input className="input h-11" value={form.brand} onChange={(event) => updateForm('brand', event.target.value)} required />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Категорія</span>
                    <select className="input h-11" value={form.category} onChange={(event) => updateForm('category', event.target.value as ProductCategory)}>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Статус</span>
                    <select className="input h-11" value={form.availability} onChange={(event) => updateForm('availability', event.target.value as ProductAvailability)}>
                      {availabilityOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Ціна, грн</span>
                    <input className="input h-11" type="number" min="0" value={form.price} onChange={(event) => updateForm('price', event.target.value)} required />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Стара ціна</span>
                    <input className="input h-11" type="number" min="0" value={form.oldPrice} onChange={(event) => updateForm('oldPrice', event.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Рейтинг</span>
                    <input className="input h-11" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(event) => updateForm('rating', event.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Відгуки</span>
                    <input className="input h-11" type="number" min="0" value={form.reviews} onChange={(event) => updateForm('reviews', event.target.value)} />
                  </label>
                  <ImageDropzone
                    inputId="product-image"
                    label="Зображення"
                    value={form.image}
                    fallback="/illustrations/product-battery.svg"
                    onChange={(value) => updateForm('image', value)}
                  />
                  <label className="block md:col-span-2 xl:col-span-3">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Додаткові фото</span>
                    <textarea
                      className="input min-h-24 resize-y"
                      value={form.images}
                      onChange={(event) => updateForm('images', event.target.value)}
                      placeholder="Одне посилання або data:image у кожному рядку"
                    />
                    <input
                      ref={galleryInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(event) => {
                        void addGalleryImages(event.target.files);
                        event.target.value = '';
                      }}
                    />
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <button type="button" onClick={() => galleryInputRef.current?.click()} className="btn-secondary h-10 px-4">
                        <UploadCloud className="h-4 w-4" />
                        <span className="ml-2">Додати кілька фото</span>
                      </button>
                      <span className="text-xs text-steel">Превʼю картки завжди бере тільки основне зображення вище.</span>
                    </div>
                  </label>
                </div>
              ) : null}

              {activeTab === 'content' ? (
                <div className="grid gap-3">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Короткий опис</span>
                    <textarea className="input min-h-24 resize-y" value={form.shortDescription} onChange={(event) => updateForm('shortDescription', event.target.value)} required />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Повний опис</span>
                    <textarea className="input min-h-40 resize-y" value={form.description} onChange={(event) => updateForm('description', event.target.value)} required />
                  </label>
                </div>
              ) : null}

              {activeTab === 'details' ? (
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Характеристики</span>
                    <textarea className="input min-h-64 resize-y" value={form.specs} onChange={(event) => updateForm('specs', event.target.value)} placeholder="Один пункт в одному рядку" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-ink">Бейджі</span>
                    <textarea className="input min-h-64 resize-y" value={form.badges} onChange={(event) => updateForm('badges', event.target.value)} placeholder="Один бейдж в одному рядку" />
                  </label>
                </div>
              ) : null}
            </section>

            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <ImageIcon className="h-4 w-4 text-accent" />
                Прев'ю
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <Image
                  src={form.image || '/illustrations/product-battery.svg'}
                  alt={form.title || 'Товар'}
                  width={420}
                  height={280}
                  unoptimized={form.image.startsWith('data:image/')}
                  className="h-44 w-full bg-frost object-cover"
                />
                <div className="p-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${selectedAvailability.className}`}>
                    {selectedAvailability.label}
                  </span>
                  <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-ink">{form.title || 'Назва товару'}</h3>
                  <p className="mt-1 text-sm text-steel">{form.brand || 'Бренд'} · {form.category}</p>
                  <div className="mt-3 text-xl font-semibold text-ink">{formatPrice(Number(form.price) || 0)}</div>
                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-steel">{form.shortDescription || 'Короткий опис товару буде тут.'}</p>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}
