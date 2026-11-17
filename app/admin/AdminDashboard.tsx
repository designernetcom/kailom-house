"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

type Tab = "overview" | "categories" | "subcategories" | "products";
type IconName = "grid" | "folder" | "layers" | "box" | "plus" | "search" | "bell" | "menu" | "chevron-down" | "chevron-right" | "arrow-up-right" | "edit" | "trash" | "external" | "logout" | "close" | "check" | "clock" | "star";
type Category = { id: string; name: string; slug: string; description?: string; imageUrl?: string; sortOrder: number; published: boolean };
type Subcategory = { id: string; categoryId: string; categoryName: string; name: string; slug: string; description?: string; imageUrl?: string; sortOrder: number; published: boolean };
type ProductImage = { id: string; url: string; altText?: string; sortOrder: number };
type Specification = { id: string; label: string; value: string; sortOrder: number };
type Product = {
  id: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  subcategoryId?: string;
  subcategoryName?: string;
  name: string;
  model: string;
  slug: string;
  brand: string;
  description: string;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  images: ProductImage[];
  features: string[];
  specifications: Specification[];
};

type CategoryDraft = { name: string; slug: string; description: string; imageUrl: string; sortOrder: string; published: boolean };
type SubcategoryDraft = CategoryDraft & { categoryId: string };
type ProductDraft = {
  categoryId: string;
  subcategoryId: string;
  name: string;
  model: string;
  slug: string;
  brand: string;
  description: string;
  imageUrls: string;
  features: string;
  specifications: string;
  seoTitle: string;
  seoDescription: string;
  sortOrder: string;
  published: boolean;
  featured: boolean;
};

const emptyCategory: CategoryDraft = { name: "", slug: "", description: "", imageUrl: "", sortOrder: "0", published: true };
const emptySubcategory: SubcategoryDraft = { ...emptyCategory, categoryId: "" };
const emptyProduct: ProductDraft = {
  categoryId: "", subcategoryId: "", name: "", model: "", slug: "", brand: "PAT", description: "",
  imageUrls: "", features: "", specifications: "", seoTitle: "", seoDescription: "", sortOrder: "0", published: true, featured: false,
};

const navGroups: { label: string; items: { id: Tab; label: string; icon: IconName }[] }[] = [
  { label: "Workspace", items: [{ id: "overview", label: "Overview", icon: "grid" }] },
  {
    label: "Catalogue",
    items: [
      { id: "categories", label: "Categories", icon: "folder" },
      { id: "subcategories", label: "Subcategories", icon: "layers" },
      { id: "products", label: "Products", icon: "box" },
    ],
  },
];

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function api(path: string, init: RequestInit = {}) {
  const response = await fetch(`/api/admin/${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(typeof body.error === "string" ? body.error : "The request could not be completed.");
    if (response.status === 401) error.name = "Unauthorized";
    throw error;
  }
  return body;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryForm, setCategoryForm] = useState<CategoryDraft>(emptyCategory);
  const [subcategoryForm, setSubcategoryForm] = useState<SubcategoryDraft>(emptySubcategory);
  const [productForm, setProductForm] = useState<ProductDraft>(emptyProduct);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [catalogueOpen, setCatalogueOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [tableSearch, setTableSearch] = useState("");
  const [tablePage, setTablePage] = useState(1);
  const [pageSize, setPageSize] = useState("6");
  const [deletePrompt, setDeletePrompt] = useState<{ path: string; message: string; label: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [categoryData, subcategoryData, productData] = await Promise.all([
        api("categories"), api("subcategories"), api("products"),
      ]);
      setCategories(categoryData);
      setSubcategories(subcategoryData);
      setProducts(productData);
      setError("");
    } catch (loadError) {
      if (loadError instanceof Error && loadError.name === "Unauthorized") {
        router.replace("/admin/login");
        return;
      }
      setError(loadError instanceof Error ? loadError.message : "Could not load the dashboard.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { void loadData(); }, [loadData]);
  useEffect(() => { setTablePage(1); }, [tableSearch, tab, pageSize]);

  const selectedSubcategories = useMemo(
    () => subcategories.filter((subcategory) => subcategory.categoryId === productForm.categoryId),
    [productForm.categoryId, subcategories],
  );
  const filteredCategories = useMemo(() => {
    const query = tableSearch.toLowerCase().trim();
    return categories.filter((category) => !query || `${category.name} ${category.slug}`.toLowerCase().includes(query));
  }, [categories, tableSearch]);
  const filteredSubcategories = useMemo(() => {
    const query = tableSearch.toLowerCase().trim();
    return subcategories.filter((subcategory) => !query || `${subcategory.name} ${subcategory.slug} ${subcategory.categoryName}`.toLowerCase().includes(query));
  }, [subcategories, tableSearch]);
  const filteredProducts = useMemo(() => {
    const query = tableSearch.toLowerCase().trim();
    return products.filter((product) => !query || `${product.name} ${product.model} ${product.brand} ${product.categoryName} ${product.subcategoryName ?? ""}`.toLowerCase().includes(query));
  }, [products, tableSearch]);

  const totalRecords = categories.length + subcategories.length + products.length;
  const publishedRecords = categories.filter((item) => item.published).length + subcategories.filter((item) => item.published).length + products.filter((item) => item.published).length;
  const draftRecords = totalRecords - publishedRecords;
  const featuredProducts = products.filter((product) => product.featured).length;
  const activeCount = tab === "categories" ? filteredCategories.length : tab === "subcategories" ? filteredSubcategories.length : filteredProducts.length;
  const pageCount = Math.max(1, Math.ceil(activeCount / Number(pageSize)));
  const currentPage = Math.min(tablePage, pageCount);
  const pageStart = (currentPage - 1) * Number(pageSize);
  const visibleCategories = filteredCategories.slice(pageStart, pageStart + Number(pageSize));
  const visibleSubcategories = filteredSubcategories.slice(pageStart, pageStart + Number(pageSize));
  const visibleProducts = filteredProducts.slice(pageStart, pageStart + Number(pageSize));
  const firstImage = productForm.imageUrls.split("\n").map((url) => url.trim()).find(Boolean);
  const categorySummary = useMemo(() => categories.map((category) => ({ ...category, productCount: products.filter((product) => product.categoryId === category.id).length })), [categories, products]);

  function showNotice(message: string) {
    setNotice(message);
    setError("");
    window.setTimeout(() => setNotice(""), 3500);
  }
  function selectTab(nextTab: Tab) {
    setTab(nextTab); setMobileNavOpen(false); setProfileOpen(false); setTableSearch("");
    if (nextTab !== "overview") setCatalogueOpen(true);
  }
  function openCreate(nextTab: Exclude<Tab, "overview">) {
    selectTab(nextTab); setEditingCategory(null); setEditingSubcategory(null); setEditingProduct(null);
    if (nextTab === "categories") setCategoryForm(emptyCategory);
    if (nextTab === "subcategories") setSubcategoryForm(emptySubcategory);
    if (nextTab === "products") setProductForm(emptyProduct);
    setFormOpen(true);
  }
  function closeForm() { setFormOpen(false); setEditingCategory(null); setEditingSubcategory(null); setEditingProduct(null); }

  async function save(path: string, method: "POST" | "PUT", body: unknown, success: string) {
    setSubmitting(true);
    try { await api(path, { method, body: JSON.stringify(body) }); await loadData(); showNotice(success); return true; }
    catch (saveError) { setError(saveError instanceof Error ? saveError.message : "Could not save the record."); return false; }
    finally { setSubmitting(false); }
  }
  async function saveCategory(event: FormEvent) {
    event.preventDefault();
    const success = await save(editingCategory ? `categories/${editingCategory}` : "categories", editingCategory ? "PUT" : "POST", { ...categoryForm, sortOrder: Number(categoryForm.sortOrder) }, editingCategory ? "Category updated." : "Category created.");
    if (success) { setCategoryForm(emptyCategory); closeForm(); }
  }
  async function saveSubcategory(event: FormEvent) {
    event.preventDefault();
    const success = await save(editingSubcategory ? `subcategories/${editingSubcategory}` : "subcategories", editingSubcategory ? "PUT" : "POST", { ...subcategoryForm, sortOrder: Number(subcategoryForm.sortOrder) }, editingSubcategory ? "Subcategory updated." : "Subcategory created.");
    if (success) { setSubcategoryForm(emptySubcategory); closeForm(); }
  }
  async function saveProduct(event: FormEvent) {
    event.preventDefault();
    const images = productForm.imageUrls.split("\n").map((url) => url.trim()).filter(Boolean).map((url) => ({ url, altText: productForm.name }));
    const features = productForm.features.split("\n").map((feature) => feature.trim()).filter(Boolean);
    const specifications = productForm.specifications.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => { const [label, ...valueParts] = line.split("|"); return { label: label.trim(), value: valueParts.join("|").trim() }; }).filter((specification) => specification.label && specification.value);
    const success = await save(editingProduct ? `products/${editingProduct}` : "products", editingProduct ? "PUT" : "POST", { ...productForm, subcategoryId: productForm.subcategoryId || null, sortOrder: Number(productForm.sortOrder), images, features, specifications }, editingProduct ? "Product updated." : "Product created.");
    if (success) { setProductForm(emptyProduct); closeForm(); }
  }
  function remove(path: string, message: string, label: string) { setDeletePrompt({ path, message, label }); }
  async function confirmRemove() {
    if (!deletePrompt) return;
    setDeleting(true);
    try { await api(deletePrompt.path, { method: "DELETE" }); await loadData(); showNotice(deletePrompt.message); setDeletePrompt(null); }
    catch (removeError) { setError(removeError instanceof Error ? removeError.message : "Could not delete the record."); }
    finally { setDeleting(false); }
  }
  async function logout() { await fetch("/api/admin/auth/logout", { method: "POST" }); router.replace("/admin/login"); }
  function editCategory(category: Category) { selectTab("categories"); setEditingCategory(category.id); setCategoryForm({ name: category.name, slug: category.slug, description: category.description ?? "", imageUrl: category.imageUrl ?? "", sortOrder: String(category.sortOrder), published: category.published }); setFormOpen(true); }
  function editSubcategory(subcategory: Subcategory) { selectTab("subcategories"); setEditingSubcategory(subcategory.id); setSubcategoryForm({ categoryId: subcategory.categoryId, name: subcategory.name, slug: subcategory.slug, description: subcategory.description ?? "", imageUrl: subcategory.imageUrl ?? "", sortOrder: String(subcategory.sortOrder), published: subcategory.published }); setFormOpen(true); }
  function editProduct(product: Product) {
    selectTab("products"); setEditingProduct(product.id); setProductForm({ categoryId: product.categoryId, subcategoryId: product.subcategoryId ?? "", name: product.name, model: product.model, slug: product.slug, brand: product.brand, description: product.description, imageUrls: product.images.map((image) => image.url).join("\n"), features: product.features.join("\n"), specifications: product.specifications.map((specification) => `${specification.label} | ${specification.value}`).join("\n"), seoTitle: product.seoTitle ?? "", seoDescription: product.seoDescription ?? "", sortOrder: String(product.sortOrder), published: product.published, featured: product.featured });
    setFormOpen(true);
  }

  const currentTitle = tab === "overview" ? "Overview" : tab[0].toUpperCase() + tab.slice(1);
  const currentDescription = tab === "overview" ? "A clear view of your catalogue and publishing activity." : `Manage your ${tab} and keep the public catalogue up to date.`;

  return <main className={styles.dashboardPage}>
    <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ""} ${mobileNavOpen ? styles.sidebarMobileOpen : ""}`}>
      <div className={styles.sidebarBrand}><div className={styles.brandMark}>K</div><div className={styles.brandCopy}><strong>Kailom House</strong><span>Admin workspace</span></div><button className={`${styles.iconButton} ${styles.sidebarClose}`} aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}><Icon name="close" /></button></div>
      <div className={styles.sidebarScroll}><nav className={styles.sidebarNav} aria-label="Admin navigation">
        {navGroups.map((group) => <div className={styles.navGroup} key={group.label}>{!sidebarCollapsed && group.label !== "Catalogue" ? <p className={styles.navGroupLabel}>{group.label}</p> : null}{group.label === "Catalogue" && !sidebarCollapsed ? <button className={styles.navGroupToggle} onClick={() => setCatalogueOpen((open) => !open)} aria-expanded={catalogueOpen}><span>{group.label}</span><Icon name="chevron-down" /></button> : null}{group.items.map((item) => (group.label !== "Catalogue" || catalogueOpen || sidebarCollapsed) ? <button key={item.id} className={`${styles.navItem} ${tab === item.id ? styles.navItemActive : ""}`} onClick={() => selectTab(item.id)} title={sidebarCollapsed ? item.label : undefined}><Icon name={item.icon} /><span>{item.label}</span>{tab === item.id && !sidebarCollapsed ? <i /> : null}</button> : null)}</div>)}
      </nav><div className={styles.sidebarHelp}><span className={styles.helpIcon}>?</span>{!sidebarCollapsed ? <div><strong>Need a hand?</strong><span>Review your catalogue workflow.</span></div> : null}</div></div>
      <div className={styles.sidebarFooter}><div className={styles.sidebarUser}><span className={styles.avatar}>A</span>{!sidebarCollapsed ? <div><strong>Administrator</strong><span>Content manager</span></div> : null}</div><button className={styles.logoutButton} onClick={logout} title="Sign out"><Icon name="logout" />{!sidebarCollapsed ? <span>Sign out</span> : null}</button></div>
    </aside>
    {mobileNavOpen ? <button className={styles.mobileOverlay} aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} /> : null}
    <section className={styles.mainShell}>
      <header className={styles.topbar}><div className={styles.topbarLeft}><button className={styles.iconButton} aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Icon name="menu" /></button><button className={`${styles.iconButton} ${styles.desktopToggle}`} aria-label="Toggle sidebar" onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}><Icon name="chevron-right" /></button><div className={styles.topbarBreadcrumb}><span>Kailom House</span><Icon name="chevron-right" /><strong>{currentTitle}</strong></div></div><div className={styles.topbarRight}><label className={styles.topbarSearch}><Icon name="search" /><input value={tableSearch} onChange={(event) => setTableSearch(event.target.value)} placeholder={tab === "overview" ? "Search catalogue" : `Search ${tab}...`} aria-label={`Search ${tab}`} /></label><button className={styles.iconButton} aria-label="Notifications"><Icon name="bell" /><span className={styles.notificationDot} /></button><div className={styles.profileWrap}><button className={styles.profileButton} onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen}><span className={styles.avatar}>A</span><span className={styles.profileText}><strong>Admin</strong><small>Administrator</small></span><Icon name="chevron-down" /></button>{profileOpen ? <div className={styles.profileMenu}><a href="mailto:admin@kailomhouse.com">Account support</a><button onClick={logout}><Icon name="logout" />Sign out</button></div> : null}</div></div></header>
      <div className={styles.contentArea}><div className={styles.pageHeading}><div><div className={styles.breadcrumbs}><span>Workspace</span><Icon name="chevron-right" /><strong>{currentTitle}</strong></div><h1>{currentTitle}</h1><p>{currentDescription}</p></div>{tab !== "overview" ? <button className={styles.primaryButton} onClick={() => openCreate(tab as Exclude<Tab, "overview">)}><Icon name="plus" />Add {tab === "subcategories" ? "subcategory" : tab.slice(0, -1)}</button> : null}</div>
        {notice ? <div className={`${styles.toast} ${styles.toastSuccess}`} role="status"><span className={styles.toastIcon}><Icon name="check" /></span><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss notification"><Icon name="close" /></button></div> : null}{error ? <div className={`${styles.toast} ${styles.toastError}`} role="alert"><span className={styles.toastIcon}>!</span><span>{error}</span><button onClick={() => setError("")} aria-label="Dismiss error"><Icon name="close" /></button></div> : null}
        {loading ? <LoadingState /> : null}{!loading && tab === "overview" ? <Overview search={tableSearch} categories={categories} subcategories={subcategories} products={products} totalRecords={totalRecords} publishedRecords={publishedRecords} draftRecords={draftRecords} featuredProducts={featuredProducts} categorySummary={categorySummary} onCreate={openCreate} onNavigate={selectTab} /> : null}{!loading && tab === "categories" ? <CategoryTable rows={visibleCategories} total={filteredCategories.length} page={currentPage} pageCount={pageCount} pageSize={pageSize} setPage={setTablePage} setPageSize={setPageSize} onEdit={editCategory} onDelete={(category) => remove(`categories/${category.id}`, "Category deleted.", category.name)} /> : null}{!loading && tab === "subcategories" ? <SubcategoryTable rows={visibleSubcategories} total={filteredSubcategories.length} page={currentPage} pageCount={pageCount} pageSize={pageSize} setPage={setTablePage} setPageSize={setPageSize} onEdit={editSubcategory} onDelete={(subcategory) => remove(`subcategories/${subcategory.id}`, "Subcategory deleted.", subcategory.name)} /> : null}{!loading && tab === "products" ? <ProductTable rows={visibleProducts} total={filteredProducts.length} page={currentPage} pageCount={pageCount} pageSize={pageSize} setPage={setTablePage} setPageSize={setPageSize} onEdit={editProduct} onDelete={(product) => remove(`products/${product.id}`, "Product deleted.", product.name)} /> : null}
      </div>
    </section>
    {formOpen && tab === "categories" ? <Modal title={editingCategory ? "Edit category" : "Create category"} description="Set the structure and visibility of this catalogue category." onClose={closeForm}><form className={styles.form} onSubmit={saveCategory}><FormSection title="Category details" description="These fields define how this category appears across the catalogue."><div className={styles.formGrid}><TextInput label="Category name" value={categoryForm.name} onChange={(value) => setCategoryForm({ ...categoryForm, name: value, slug: editingCategory ? categoryForm.slug : slugify(value) })} placeholder="e.g. Impact Wrenches" required /><TextInput label="URL slug" value={categoryForm.slug} onChange={(value) => setCategoryForm({ ...categoryForm, slug: value })} placeholder="impact-wrenches" required /></div><TextArea label="Description" value={categoryForm.description} onChange={(value) => setCategoryForm({ ...categoryForm, description: value })} placeholder="Short description for this category" /><div className={styles.formGrid}><TextInput label="Image URL" value={categoryForm.imageUrl} onChange={(value) => setCategoryForm({ ...categoryForm, imageUrl: value })} placeholder="/assets/img/categories/example.jpg" /><NumberInput label="Sort order" value={categoryForm.sortOrder} onChange={(value) => setCategoryForm({ ...categoryForm, sortOrder: value })} /></div><Toggle label="Published" description="Make this category visible on the public website." checked={categoryForm.published} onChange={(value) => setCategoryForm({ ...categoryForm, published: value })} /></FormSection><FormActions onCancel={closeForm} submitting={submitting} /></form></Modal> : null}
    {formOpen && tab === "subcategories" ? <Modal title={editingSubcategory ? "Edit subcategory" : "Create subcategory"} description="Place a more specific catalogue group under a parent category." onClose={closeForm}><form className={styles.form} onSubmit={saveSubcategory}><FormSection title="Subcategory details" description="Choose the parent category before publishing this record."><SelectInput label="Parent category" value={subcategoryForm.categoryId} onChange={(value) => setSubcategoryForm({ ...subcategoryForm, categoryId: value })} options={categories.map((category) => [category.id, category.name])} required /><div className={styles.formGrid}><TextInput label="Subcategory name" value={subcategoryForm.name} onChange={(value) => setSubcategoryForm({ ...subcategoryForm, name: value, slug: editingSubcategory ? subcategoryForm.slug : slugify(value) })} placeholder="e.g. Cordless impact wrenches" required /><TextInput label="URL slug" value={subcategoryForm.slug} onChange={(value) => setSubcategoryForm({ ...subcategoryForm, slug: value })} placeholder="cordless-impact-wrenches" required /></div><TextArea label="Description" value={subcategoryForm.description} onChange={(value) => setSubcategoryForm({ ...subcategoryForm, description: value })} placeholder="Short description for this subcategory" /><div className={styles.formGrid}><TextInput label="Image URL" value={subcategoryForm.imageUrl} onChange={(value) => setSubcategoryForm({ ...subcategoryForm, imageUrl: value })} placeholder="/assets/img/categories/example.jpg" /><NumberInput label="Sort order" value={subcategoryForm.sortOrder} onChange={(value) => setSubcategoryForm({ ...subcategoryForm, sortOrder: value })} /></div><Toggle label="Published" description="Make this subcategory visible on the public website." checked={subcategoryForm.published} onChange={(value) => setSubcategoryForm({ ...subcategoryForm, published: value })} /></FormSection><FormActions onCancel={closeForm} submitting={submitting} /></form></Modal> : null}
    {formOpen && tab === "products" ? <Modal title={editingProduct ? "Edit product" : "Create product"} description="Add product information, merchandising content and technical specifications." wide onClose={closeForm}><form className={styles.form} onSubmit={saveProduct}><FormSection title="Product identity" description="Use the same product name and model customers see in your catalogue."><div className={styles.formGrid}><SelectInput label="Category" value={productForm.categoryId} onChange={(value) => setProductForm({ ...productForm, categoryId: value, subcategoryId: "" })} options={categories.map((category) => [category.id, category.name])} required /><SelectInput label="Subcategory" value={productForm.subcategoryId} onChange={(value) => setProductForm({ ...productForm, subcategoryId: value })} options={selectedSubcategories.map((subcategory) => [subcategory.id, subcategory.name])} /></div><div className={styles.formGrid}><TextInput label="Product name" value={productForm.name} onChange={(value) => setProductForm({ ...productForm, name: value, slug: editingProduct ? productForm.slug : slugify(value) })} placeholder="e.g. Industrial impact wrench" required /><TextInput label="Model number" value={productForm.model} onChange={(value) => setProductForm({ ...productForm, model: value })} placeholder="PAT-2000" required /></div><div className={styles.formGrid}><TextInput label="URL slug" value={productForm.slug} onChange={(value) => setProductForm({ ...productForm, slug: value })} placeholder="industrial-impact-wrench" required /><TextInput label="Brand" value={productForm.brand} onChange={(value) => setProductForm({ ...productForm, brand: value })} placeholder="PAT" required /></div><TextArea label="Description" value={productForm.description} onChange={(value) => setProductForm({ ...productForm, description: value })} placeholder="Describe the product and its primary use case." required /></FormSection><FormSection title="Media and technical content" description="Add one image URL per line. Use a pipe to separate a specification label and value."><div className={styles.mediaField}><TextArea label="Image URLs" value={productForm.imageUrls} onChange={(value) => setProductForm({ ...productForm, imageUrls: value })} placeholder="/assets/img/products/example.jpeg" /><div className={styles.imagePreview}>{firstImage ? <img src={firstImage} alt="Product preview" /> : <><Icon name="box" /><span>Image preview</span><small>Paste an image URL to preview it here.</small></>}</div></div><div className={styles.formGrid}><TextArea label="Features (one per line)" value={productForm.features} onChange={(value) => setProductForm({ ...productForm, features: value })} placeholder={"High torque output\nErgonomic grip"} /><TextArea label="Specifications (Label | Value)" value={productForm.specifications} onChange={(value) => setProductForm({ ...productForm, specifications: value })} placeholder={"Voltage | 20 V\nWeight | 2.4 kg"} /></div></FormSection><FormSection title="Search and publishing" description="Control how this product is found and presented on the public website."><div className={styles.formGrid}><TextInput label="SEO title" value={productForm.seoTitle} onChange={(value) => setProductForm({ ...productForm, seoTitle: value })} placeholder="Product title for search engines" /><TextInput label="SEO description" value={productForm.seoDescription} onChange={(value) => setProductForm({ ...productForm, seoDescription: value })} placeholder="Short search result description" /></div><div className={styles.formGrid}><NumberInput label="Sort order" value={productForm.sortOrder} onChange={(value) => setProductForm({ ...productForm, sortOrder: value })} /><div className={styles.toggleStack}><Toggle label="Published" description="Show this product on the public catalogue." checked={productForm.published} onChange={(value) => setProductForm({ ...productForm, published: value })} /><Toggle label="Featured" description="Include this product in featured catalogue placements." checked={productForm.featured} onChange={(value) => setProductForm({ ...productForm, featured: value })} /></div></div></FormSection><FormActions onCancel={closeForm} submitting={submitting} /></form></Modal> : null}
    {deletePrompt ? <ConfirmDialog label={deletePrompt.label} onCancel={() => setDeletePrompt(null)} onConfirm={confirmRemove} deleting={deleting} /> : null}
  </main>;
}

function Overview({ search, categories, subcategories, products, totalRecords, publishedRecords, draftRecords, featuredProducts, categorySummary, onCreate, onNavigate }: { search: string; categories: Category[]; subcategories: Subcategory[]; products: Product[]; totalRecords: number; publishedRecords: number; draftRecords: number; featuredProducts: number; categorySummary: (Category & { productCount: number })[]; onCreate: (tab: Exclude<Tab, "overview">) => void; onNavigate: (tab: Tab) => void }) {
  const query = search.toLowerCase().trim();
  const recentProducts = products.filter((product) => !query || `${product.name} ${product.model} ${product.brand} ${product.categoryName} ${product.subcategoryName ?? ""}`.toLowerCase().includes(query)).slice(0, 5);
  const visibleCategorySummary = categorySummary.filter((category) => !query || `${category.name} ${category.slug}`.toLowerCase().includes(query));
  return <div className={styles.overview}><section className={styles.statGrid}><StatCard label="Total records" value={totalRecords} detail={`${categories.length} categories · ${subcategories.length} subcategories`} icon="layers" tone="indigo" /><StatCard label="Published content" value={publishedRecords} detail="Visible on the public catalogue" icon="check" tone="green" /><StatCard label="Draft records" value={draftRecords} detail="Need review before publishing" icon="clock" tone="amber" /><StatCard label="Featured products" value={featuredProducts} detail={`${products.length} products in catalogue`} icon="star" tone="purple" /></section><section className={styles.overviewGrid}><div className={styles.panel}><PanelHeading eyebrow="Quick actions" title="Keep the catalogue moving" /><div className={styles.quickActions}><QuickAction icon="folder" label="New category" detail="Create a catalogue group" onClick={() => onCreate("categories")} /><QuickAction icon="layers" label="New subcategory" detail="Organise a product line" onClick={() => onCreate("subcategories")} /><QuickAction icon="box" label="New product" detail="Add a product record" onClick={() => onCreate("products")} /></div></div><div className={styles.panel}><PanelHeading eyebrow="Catalogue health" title="Publishing summary" /><div className={styles.healthList}><HealthRow label="Published" value={publishedRecords} total={totalRecords} tone="green" /><HealthRow label="Draft" value={draftRecords} total={totalRecords} tone="amber" /><HealthRow label="Featured products" value={featuredProducts} total={Math.max(products.length, 1)} tone="purple" /></div><button className={styles.textButton} onClick={() => onNavigate("products")}>Review products <Icon name="arrow-up-right" /></button></div></section><section className={styles.overviewGrid}><div className={styles.panel}><PanelHeading eyebrow="Recent entries" title="Product catalogue" action={<button className={styles.textButton} onClick={() => onNavigate("products")}>View all <Icon name="arrow-up-right" /></button>} />{recentProducts.length ? <div className={styles.recentList}>{recentProducts.map((product) => <div className={styles.recentItem} key={product.id}><div className={styles.recentIcon}><Icon name="box" /></div><div><strong>{product.name}</strong><span>{product.model} · {product.categoryName}</span></div><StatusBadge published={product.published} /></div>)}</div> : <EmptyState title={query ? "No matching products" : "No products yet"} description={query ? "Try a different search term." : "Create your first product to start building the catalogue."} action={query ? undefined : "Add product"} onAction={() => onCreate("products")} />}</div><div className={styles.panel}><PanelHeading eyebrow="Data summary" title="Products by category" />{visibleCategorySummary.length ? <div className={styles.categoryBars}>{visibleCategorySummary.map((category) => <div className={styles.categoryBar} key={category.id}><div><span>{category.name}</span><strong>{category.productCount}</strong></div><div className={styles.barTrack}><span style={{ width: `${products.length ? Math.max((category.productCount / products.length) * 100, category.productCount ? 8 : 0) : 0}%` }} /></div></div>)}</div> : <EmptyState title={query ? "No matching categories" : "No categories yet"} description={query ? "Try a different search term." : "Create a category to see catalogue distribution."} action={query ? undefined : "Add category"} onAction={() => onCreate("categories")} />}</div></section></div>;
}

function CategoryTable({ rows, total, page, pageCount, pageSize, setPage, setPageSize, onEdit, onDelete }: { rows: Category[]; total: number; page: number; pageCount: number; pageSize: string; setPage: (page: number) => void; setPageSize: (size: string) => void; onEdit: (item: Category) => void; onDelete: (item: Category) => void }) { return <TablePanel eyebrow="Catalogue structure" title="Categories" description="Organise the top level of your product catalogue." total={total} page={page} pageCount={pageCount} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} emptyTitle="No categories found" emptyDescription="Create a category or adjust your search."><table><thead><tr><th>Category</th><th>URL slug</th><th>Status</th><th className={styles.alignRight}>Actions</th></tr></thead><tbody>{rows.map((category) => <tr key={category.id}><td><div className={styles.tablePrimary}><span className={styles.tableIcon}><Icon name="folder" /></span><div><strong>{category.name}</strong><small>{category.description || "No description added"}</small></div></div></td><td><code>/{category.slug}</code></td><td><StatusBadge published={category.published} /></td><td><RowActions onEdit={() => onEdit(category)} onDelete={() => onDelete(category)} /></td></tr>)}</tbody></table></TablePanel>; }
function SubcategoryTable({ rows, total, page, pageCount, pageSize, setPage, setPageSize, onEdit, onDelete }: { rows: Subcategory[]; total: number; page: number; pageCount: number; pageSize: string; setPage: (page: number) => void; setPageSize: (size: string) => void; onEdit: (item: Subcategory) => void; onDelete: (item: Subcategory) => void }) { return <TablePanel eyebrow="Catalogue structure" title="Subcategories" description="Keep related products easy to find and manage." total={total} page={page} pageCount={pageCount} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} emptyTitle="No subcategories found" emptyDescription="Create a subcategory or adjust your search."><table><thead><tr><th>Subcategory</th><th>Parent category</th><th>Status</th><th className={styles.alignRight}>Actions</th></tr></thead><tbody>{rows.map((subcategory) => <tr key={subcategory.id}><td><div className={styles.tablePrimary}><span className={styles.tableIcon}><Icon name="layers" /></span><div><strong>{subcategory.name}</strong><small>/{subcategory.slug}</small></div></div></td><td>{subcategory.categoryName}</td><td><StatusBadge published={subcategory.published} /></td><td><RowActions onEdit={() => onEdit(subcategory)} onDelete={() => onDelete(subcategory)} /></td></tr>)}</tbody></table></TablePanel>; }
function ProductTable({ rows, total, page, pageCount, pageSize, setPage, setPageSize, onEdit, onDelete }: { rows: Product[]; total: number; page: number; pageCount: number; pageSize: string; setPage: (page: number) => void; setPageSize: (size: string) => void; onEdit: (item: Product) => void; onDelete: (item: Product) => void }) { return <TablePanel eyebrow="Catalogue inventory" title="Products" description="Manage product content, visibility and featured placement." total={total} page={page} pageCount={pageCount} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} emptyTitle="No products found" emptyDescription="Create a product or adjust your search."><table><thead><tr><th>Product</th><th>Category</th><th>Status</th><th>Featured</th><th className={styles.alignRight}>Actions</th></tr></thead><tbody>{rows.map((product) => <tr key={product.id}><td><div className={styles.tablePrimary}><span className={styles.productThumb}>{product.images[0]?.url ? <img src={product.images[0].url} alt="" /> : <Icon name="box" />}</span><div><strong>{product.name}</strong><small>{product.brand} · {product.model}</small></div></div></td><td><span>{product.categoryName}</span>{product.subcategoryName ? <small className={styles.tableSubtext}>{product.subcategoryName}</small> : null}</td><td><StatusBadge published={product.published} /></td><td>{product.featured ? <span className={styles.featuredBadge}><Icon name="star" />Featured</span> : <span className={styles.tableMuted}>—</span>}</td><td><RowActions href={`/catalogue/${product.categorySlug}/${product.slug}`} onEdit={() => onEdit(product)} onDelete={() => onDelete(product)} /></td></tr>)}</tbody></table></TablePanel>; }
function TablePanel({ eyebrow, title, description, total, page, pageCount, pageSize, setPage, setPageSize, emptyTitle, emptyDescription, children }: { eyebrow: string; title: string; description: string; total: number; page: number; pageCount: number; pageSize: string; setPage: (page: number) => void; setPageSize: (size: string) => void; emptyTitle: string; emptyDescription: string; children: React.ReactNode }) { return <section className={styles.tablePanel}><PanelHeading eyebrow={eyebrow} title={title} description={description} /><div className={styles.tableMeta}><span>{total} {total === 1 ? "record" : "records"}</span>{total ? <span className={styles.tableHint}>Use search above to filter results</span> : null}</div>{total ? <div className={styles.tableScroll}>{children}</div> : <EmptyState title={emptyTitle} description={emptyDescription} onAction={() => undefined} />}{total ? <Pagination page={page} pageCount={pageCount} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} /> : null}</section>; }
function Pagination({ page, pageCount, pageSize, setPage, setPageSize }: { page: number; pageCount: number; pageSize: string; setPage: (page: number) => void; setPageSize: (size: string) => void }) { return <div className={styles.pagination}><label>Rows per page <select value={pageSize} onChange={(event) => setPageSize(event.target.value)}><option value="6">6</option><option value="12">12</option><option value="24">24</option></select></label><div className={styles.pageButtons}><button disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Previous page">‹</button><span>Page <strong>{page}</strong> of <strong>{pageCount}</strong></span><button disabled={page >= pageCount} onClick={() => setPage(page + 1)} aria-label="Next page">›</button></div></div>; }
function RowActions({ href, onEdit, onDelete }: { href?: string; onEdit: () => void; onDelete: () => void }) { return <div className={styles.rowActions}>{href ? <a className={styles.actionButton} href={href} target="_blank" rel="noreferrer" title="View on website"><Icon name="external" /></a> : null}<button className={styles.actionButton} onClick={onEdit} title="Edit"><Icon name="edit" /></button><button className={`${styles.actionButton} ${styles.actionDanger}`} onClick={onDelete} title="Delete"><Icon name="trash" /></button></div>; }
function StatCard({ label, value, detail, icon, tone }: { label: string; value: number; detail: string; icon: IconName; tone: string }) { return <article className={styles.statCard}><div className={`${styles.statIcon} ${styles[`tone${tone[0].toUpperCase()}${tone.slice(1)}`]}`}><Icon name={icon} /></div><div className={styles.statValue}>{value}</div><strong>{label}</strong><span>{detail}</span></article>; }
function QuickAction({ icon, label, detail, onClick }: { icon: IconName; label: string; detail: string; onClick: () => void }) { return <button className={styles.quickAction} onClick={onClick}><span className={styles.quickIcon}><Icon name={icon} /></span><span><strong>{label}</strong><small>{detail}</small></span><Icon name="arrow-up-right" /></button>; }
function HealthRow({ label, value, total, tone }: { label: string; value: number; total: number; tone: string }) { const percentage = total ? Math.round((value / total) * 100) : 0; return <div className={styles.healthRow}><div><span>{label}</span><strong>{value} <small>({percentage}%)</small></strong></div><div className={`${styles.healthTrack} ${styles[`health${tone[0].toUpperCase()}${tone.slice(1)}`]}`}><span style={{ width: `${percentage}%` }} /></div></div>; }
function PanelHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) { return <div className={styles.panelHeading}><div><span>{eyebrow}</span><h2>{title}</h2>{description ? <p>{description}</p> : null}</div>{action}</div>; }
function StatusBadge({ published }: { published: boolean }) { return <span className={`${styles.statusBadge} ${published ? styles.statusPublished : styles.statusDraft}`}><i />{published ? "Published" : "Draft"}</span>; }
function EmptyState({ title, description, action, onAction }: { title: string; description: string; action?: string; onAction: () => void }) { return <div className={styles.emptyState}><span className={styles.emptyIcon}><Icon name="box" /></span><strong>{title}</strong><p>{description}</p>{action ? <button className={styles.secondaryButton} onClick={onAction}><Icon name="plus" />{action}</button> : null}</div>; }
function LoadingState() { return <div className={styles.loadingState}><span className={styles.spinner} /><strong>Loading catalogue</strong><span>Fetching the latest records...</span></div>; }
function Modal({ title, description, wide = false, onClose, children }: { title: string; description: string; wide?: boolean; onClose: () => void; children: React.ReactNode }) { return <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className={`${styles.modal} ${wide ? styles.modalWide : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className={styles.modalHeader}><div><span className={styles.modalEyebrow}>Catalogue record</span><h2 id="modal-title">{title}</h2><p>{description}</p></div><button className={styles.iconButton} onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button></div>{children}</section></div>; }
function FormSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) { return <div className={styles.formSection}><div className={styles.formSectionHeading}><h3>{title}</h3><p>{description}</p></div><div className={styles.formSectionBody}>{children}</div></div>; }
function FormActions({ onCancel, submitting }: { onCancel: () => void; submitting: boolean }) { return <div className={styles.formActions}><button className={styles.secondaryButton} type="button" onClick={onCancel}>Cancel</button><button className={styles.primaryButton} type="submit" disabled={submitting}>{submitting ? <><span className={styles.buttonSpinner} />Saving...</> : <><Icon name="check" />Save changes</>}</button></div>; }
function ConfirmDialog({ label, onCancel, onConfirm, deleting }: { label: string; onCancel: () => void; onConfirm: () => void; deleting: boolean }) { return <div className={styles.modalBackdrop}><section className={styles.confirmDialog} role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><div className={`${styles.confirmIcon} ${styles.confirmIconDanger}`}><Icon name="trash" /></div><h2 id="delete-title">Delete this record?</h2><p><strong>{label}</strong> will be permanently removed. This action cannot be undone.</p><div className={styles.formActions}><button className={styles.secondaryButton} onClick={onCancel}>Cancel</button><button className={`${styles.primaryButton} ${styles.dangerButton}`} onClick={onConfirm} disabled={deleting}>{deleting ? "Deleting..." : "Delete record"}</button></div></section></div>; }
function TextInput({ label, value, onChange, required = false, placeholder }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; placeholder?: string }) { return <label className={styles.field}>{label}{required ? <em>*</em> : null}<input value={value} onChange={(event) => onChange(event.target.value)} required={required} placeholder={placeholder} /></label>; }
function NumberInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className={styles.field}>{label}<input type="number" value={value} onChange={(event) => onChange(event.target.value)} /></label>; }
function TextArea({ label, value, onChange, required = false, placeholder }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; placeholder?: string }) { return <label className={styles.field}>{label}{required ? <em>*</em> : null}<textarea value={value} onChange={(event) => onChange(event.target.value)} required={required} placeholder={placeholder} rows={5} /></label>; }
function SelectInput({ label, value, onChange, options, required = false }: { label: string; value: string; onChange: (value: string) => void; options: [string, string][]; required?: boolean }) { return <label className={styles.field}>{label}{required ? <em>*</em> : null}<select value={value} onChange={(event) => onChange(event.target.value)} required={required}><option value="">Select {label.toLowerCase()}</option>{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select></label>; }
function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) { return <label className={styles.toggleRow}><span><strong>{label}</strong><small>{description}</small></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><i /></label>; }

function Icon({ name }: { name: IconName }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    folder: <><path d="M3.5 6.5h6l2 2h9v9.2a1.8 1.8 0 0 1-1.8 1.8H5.3a1.8 1.8 0 0 1-1.8-1.8z" /><path d="M3.5 8.5h17" /></>,
    layers: <><path d="m12 3 8.5 4.5L12 12 3.5 7.5z" /><path d="m3.5 12 8.5 4.5 8.5-4.5" /><path d="m3.5 16.5 8.5 4.5 8.5-4.5" /></>,
    box: <><path d="m4 7 8-4 8 4-8 4z" /><path d="M4 7v10l8 4 8-4V7" /><path d="M12 11v10" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    "chevron-down": <path d="m6 9 6 6 6-6" />,
    "chevron-right": <path d="m9 18 6-6-6-6" />,
    "arrow-up-right": <><path d="M7 17 17 7M7 7h10v10" /></>,
    edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" /></>,
    trash: <><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" /></>,
    external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M21 19V5a2 2 0 0 0-2-2h-5" /></>,
    close: <><path d="M6 6l12 12M18 6 6 18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />,
  };
  return <svg {...common}>{paths[name]}</svg>;
}
