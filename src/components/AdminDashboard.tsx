import React, { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import {
  ArrowLeft,
  Check,
  Edit3,
  Eye,
  EyeOff,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  Package,
  Plus,
  Search,
  Shield,
  ShoppingBag,
  Sun,
  Tag,
  Trash2,
  Upload,
  Users,
  X,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import {
  AdminAllowlistEntry,
  OrderRecord,
  OrderStatus,
  Product,
  ProductColorVariant,
  PromoRule,
  StoreConfig,
} from '../types';
import { ALL_PRODUCTS, DEFAULT_STORE_CONFIG } from '../data/products';
import { auth, googleProvider, PRIMARY_FOUNDER_EMAIL } from '../lib/firebase';
import {
  addPartnerAllowlist,
  deleteProduct,
  removePartnerAllowlist,
  saveProduct,
  saveStoreConfig,
  seedInitialCatalogIfEmpty,
  subscribeAllOrders,
  subscribeAllProducts,
  subscribeAllowlist,
  subscribeStoreConfig,
  updateOrderStatus,
  verifyPartnerAccess,
} from '../lib/storeService';

type AdminTab = 'orders' | 'catalog' | 'promos' | 'team';

interface AdminDashboardProps {
  onBackToStore: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ORDER_STATUSES: { id: 'all' | OrderStatus; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'dispatched', label: 'Dispatched' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'cancelled', label: 'Cancelled' },
];

const STATUS_TEXT_CLASS: Record<OrderStatus, string> = {
  pending: 'text-amber-700 dark:text-amber-400',
  confirmed: 'text-sky-700 dark:text-sky-400',
  dispatched: 'text-[#DB2777] dark:text-pink-400',
  delivered: 'text-emerald-700 dark:text-emerald-400',
  cancelled: 'text-rose-700 dark:text-rose-400',
};

const ALL_UK_SIZES: (number | string)[] = [6, 7, 8, 9, 10, 11];

function slugifyId(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function formatDate(ts: unknown): string {
  if (!ts) return 'Just now';
  try {
    if (typeof (ts as { toDate?: () => Date }).toDate === 'function') {
      return (ts as { toDate: () => Date }).toDate().toLocaleString('en-BD', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  } catch {
    // ignore
  }
  return 'Recent';
}

function formatBDWhatsAppPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.startsWith('880')) return digits;
  if (digits.startsWith('0')) return `88${digits}`;
  return digits;
}

async function compressImageFileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the selected image file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file.'));
      img.onload = () => {
        const maxDim = 820;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas compression unsupported.'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        let quality = 0.8;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        while (dataUrl.length > 350000 && quality > 0.35) {
          quality -= 0.12;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        if (dataUrl.length > 395000) {
          reject(new Error('Compressed image still exceeds 395KB. Please use a smaller image or external URL.'));
          return;
        }
        resolve(dataUrl);
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToStore,
  isDarkMode,
  toggleDarkMode,
}) => {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<'loading' | 'signed_out' | 'unauthorized' | 'authorized'>('loading');
  const [partnerRole, setPartnerRole] = useState<'owner' | 'partner' | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [bannerNotice, setBannerNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Live collections state
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(DEFAULT_STORE_CONFIG);
  const [allowlist, setAllowlist] = useState<AdminAllowlistEntry[]>([]);
  const [seedingDone, setSeedingDone] = useState(false);

  // Orders filter state
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // Catalog Editor state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Config & Promos Draft state
  const [configDraft, setConfigDraft] = useState<StoreConfig>(DEFAULT_STORE_CONFIG);
  const [savingConfig, setSavingConfig] = useState(false);
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoType, setNewPromoType] = useState<'percent' | 'fixed'>('fixed');
  const [newPromoValue, setNewPromoValue] = useState('150');
  const [newPromoCap, setNewPromoCap] = useState('');

  // Team Allowlist form state
  const [partnerEmailInput, setPartnerEmailInput] = useState('');
  const [partnerNameInput, setPartnerNameInput] = useState('');
  const [partnerRoleInput, setPartnerRoleInput] = useState<'partner' | 'owner'>('partner');
  const [savingPartner, setSavingPartner] = useState(false);
  const [confirmRemovePartnerId, setConfirmRemovePartnerId] = useState<string | null>(null);

  const notify = (type: 'success' | 'error', text: string) => {
    setBannerNotice({ type, text });
    setTimeout(() => {
      setBannerNotice((cur) => (cur?.text === text ? null : cur));
    }, 4000);
  };

  // Watch Firebase Auth State
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);

      if (!nextUser) {
        setAuthStatus('signed_out');
        setPartnerRole(null);
        return;
      }

      setAuthStatus('loading');
      try {
        const res = await verifyPartnerAccess(nextUser);
        if (res.authorized) {
          setPartnerRole(res.role);
          setAuthStatus('authorized');
        } else {
          setPartnerRole(null);
          setAuthStatus('unauthorized');
        }
      } catch (err) {
        console.error('Partner verification error:', err);
        setAuthStatus('unauthorized');
      }
    });
    return () => unsub();
  }, []);

  // Seed initial catalog + attach live Firestore subscriptions ONLY after authorization
  useEffect(() => {
    if (authStatus !== 'authorized' || !user?.email) return;

    let active = true;
    seedInitialCatalogIfEmpty(user.email)
      .then(() => {
        if (active) setSeedingDone(true);
      })
      .catch((err) => {
        console.error('Seed failed:', err);
      });

    const unsubOrders = subscribeAllOrders(
      (list) => setOrders(list),
      (err) => console.error(err)
    );
    const unsubProducts = subscribeAllProducts(
      (list) => setProducts(list.length > 0 ? list : ALL_PRODUCTS),
      (err) => console.error(err)
    );
    const unsubConfig = subscribeStoreConfig(
      (cfg) => {
        setStoreConfig(cfg);
        setConfigDraft(cfg);
      },
      (err) => console.error(err)
    );
    const unsubAllowlist = subscribeAllowlist(
      (entries) => setAllowlist(entries),
      (err) => console.error(err)
    );

    return () => {
      active = false;
      unsubOrders();
      unsubProducts();
      unsubConfig();
      unsubAllowlist();
    };
  }, [authStatus, user?.email]);

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Sign-in was cancelled or blocked.';
      setAuthError(msg);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setSeedingDone(false);
    setOrders([]);
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    const q = orderSearch.trim().toLowerCase();
    return orders.filter((order) => {
      const matchStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
      const matchQuery =
        !q ||
        order.orderCode.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.customerPhone.toLowerCase().includes(q) ||
        order.customerAddress.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [orders, orderStatusFilter, orderSearch]);

  const orderCounts = useMemo(() => {
    const counts: Record<'all' | OrderStatus, number> = {
      all: orders.length,
      pending: 0,
      confirmed: 0,
      dispatched: 0,
      delivered: 0,
      cancelled: 0,
    };
    orders.forEach((o) => {
      if (o.status in counts) counts[o.status] += 1;
    });
    return counts;
  }, [orders]);

  const totalOrderValue = useMemo(
    () => orders.filter((o) => o.status !== 'cancelled').reduce((sum, o) => sum + o.totalBDT, 0),
    [orders]
  );

  // Order Status Handler
  const handleStatusChange = async (orderId: string, nextStatus: OrderStatus) => {
    setUpdatingOrderId(orderId);
    try {
      await updateOrderStatus(orderId, nextStatus);
      notify('success', `Order #${orderId} updated to ${nextStatus}.`);
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Could not update order.');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Product Quick Toggles
  const handleTogglePublished = async (product: Product) => {
    try {
      await saveProduct({ ...product, isPublished: product.isPublished === false });
      notify(
        'success',
        `${product.name} ${product.isPublished === false ? 'published to store' : 'hidden from store'}.`
      );
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Failed to update visibility.');
    }
  };

  const handleToggleInStock = async (product: Product) => {
    try {
      await saveProduct({ ...product, inStock: product.inStock === false });
      notify('success', `${product.name} marked ${product.inStock === false ? 'In Stock' : 'Sold Out'}.`);
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Failed to update stock.');
    }
  };

  const handleToggleSizeOut = async (product: Product, size: number | string) => {
    const current = product.outOfStockSizes || [];
    const exists = current.map(String).includes(String(size));
    const next = exists
      ? current.filter((s) => String(s) !== String(size))
      : [...current, size];
    try {
      await saveProduct({ ...product, outOfStockSizes: next });
      notify('success', `${product.name} UK ${size} marked ${exists ? 'available' : 'sold out'}.`);
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Failed to update size stock.');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      setConfirmDeleteId(null);
      notify('success', 'Product removed from catalog.');
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Failed to delete product.');
    }
  };

  const openNewProductEditor = () => {
    setIsNewProduct(true);
    setEditingProduct({
      id: '',
      name: '',
      tagline: '',
      category: 'Pointed Heels',
      priceBDT: 850,
      image: '',
      sizes: [6, 7, 8, 9, 10, 11],
      outOfStockSizes: [],
      oversizeAvailable: false,
      variants: [{ id: `v-${Date.now()}`, name: 'Black', colorHex: '#18181B' }],
      badge: 'New',
      campaignLabel: 'New Drop',
      description: '',
      details: ['Cushioned footbed', 'UK Sizes 6–11 available'],
      inStock: true,
      isPublished: true,
      rating: 4.9,
      reviewsCount: 0,
      sortOrder: products.length,
    });
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;
    try {
      const compressed = await compressImageFileToDataUrl(file);
      setEditingProduct({ ...editingProduct, image: compressed });
      notify('success', 'Image compressed & ready.');
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Failed to process image.');
    }
  };

  const handleSaveEditedProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || savingProduct) return;

    const finalId = isNewProduct
      ? slugifyId(editingProduct.id || editingProduct.name)
      : editingProduct.id;

    if (!finalId) {
      notify('error', 'Please enter a valid shoe name or ID.');
      return;
    }
    if (!editingProduct.image.trim()) {
      notify('error', 'Please upload an image or paste an image URL.');
      return;
    }

    setSavingProduct(true);
    try {
      await saveProduct({
        ...editingProduct,
        id: finalId,
      });
      notify('success', `${editingProduct.name} saved to catalog.`);
      setEditingProduct(null);
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Could not save product.');
    } finally {
      setSavingProduct(false);
    }
  };

  // Config & Promos handlers
  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = newPromoCode.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
    const val = Math.max(1, Math.round(Number(newPromoValue) || 0));
    if (!code) {
      notify('error', 'Enter a valid promo code.');
      return;
    }
    if (configDraft.promoCodes.some((p) => p.code.toUpperCase() === code)) {
      notify('error', `Promo code ${code} already exists.`);
      return;
    }

    const cap = newPromoType === 'percent' && Number(newPromoCap) > 0 ? Math.round(Number(newPromoCap)) : undefined;
    const label =
      newPromoType === 'percent'
        ? `${val}% off${cap ? ` up to ৳${cap}` : ''}`
        : `৳${val} off`;

    const rule: PromoRule = {
      code,
      type: newPromoType,
      value: val,
      ...(cap ? { maxDiscountBDT: cap } : {}),
      label,
      active: true,
    };

    setConfigDraft({
      ...configDraft,
      promoCodes: [...configDraft.promoCodes, rule],
    });
    setNewPromoCode('');
    setNewPromoCap('');
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (savingConfig) return;
    setSavingConfig(true);
    try {
      await saveStoreConfig({
        ...configDraft,
        // Keep primary WhatsApp/orders line directed strictly to 01613-817630
        primaryPhone: '01613-817630',
        whatsappNumber: '8801613817630',
      });
      notify('success', 'Delivery rates, phone config & promo codes saved live.');
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Failed to update store configuration.');
    } finally {
      setSavingConfig(false);
    }
  };

  // Team Allowlist handlers
  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email || savingPartner) return;
    const cleanEmail = partnerEmailInput.trim().toLowerCase();
    const cleanName = partnerNameInput.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanName) {
      notify('error', 'Please enter a valid Google email and partner name.');
      return;
    }
    setSavingPartner(true);
    try {
      await addPartnerAllowlist(cleanEmail, cleanName, partnerRoleInput, user.email);
      setPartnerEmailInput('');
      setPartnerNameInput('');
      notify('success', `Partner ${cleanEmail} granted dashboard access.`);
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Failed to add partner.');
    } finally {
      setSavingPartner(false);
    }
  };

  const handleRemovePartner = async (entry: AdminAllowlistEntry) => {
    if (!entry.id) return;
    if (entry.email.toLowerCase() === PRIMARY_FOUNDER_EMAIL) {
      notify('error', 'Primary founder email cannot be removed.');
      return;
    }
    try {
      await removePartnerAllowlist(entry.id);
      setConfirmRemovePartnerId(null);
      notify('success', `${entry.email} removed from team access.`);
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Failed to remove partner.');
    }
  };

  // --- GATE 1: Loading ---
  if (!authReady || authStatus === 'loading') {
    return (
      <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#0E0E12] text-[#18181B] dark:text-zinc-100 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#DB2777] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-medium text-[#18181B]/70 dark:text-zinc-400">
            Verifying partner access...
          </p>
        </div>
      </div>
    );
  }

  // --- GATE 2: Sign In ---
  if (authStatus === 'signed_out') {
    return (
      <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#0E0E12] text-[#18181B] dark:text-zinc-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 rounded-3xl p-8 space-y-6 text-center">
          <div className="flex justify-center">
            <BrandLogo size="md" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif-display text-2xl font-bold text-[#18181B] dark:text-zinc-50">
              Partner Operations Console
            </h1>
            <p className="text-xs text-[#18181B]/70 dark:text-zinc-400 leading-relaxed">
              Sign in with an allowlisted Google partner account to manage live orders, shoe prices, size availability, and promos.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
              {authError}
            </div>
          )}

          <div className="space-y-3 pt-1">
            <button
              id="admin-google-signin-btn"
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full h-11 px-5 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] dark:hover:bg-pink-500 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Sign in with Google</span>
            </button>

            <button
              type="button"
              onClick={onBackToStore}
              className="w-full h-10 px-5 rounded-full border border-pink-200 dark:border-zinc-800 text-xs font-semibold text-[#18181B]/75 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-800 transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Storefront</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- GATE 3: Unauthorized Google Email ---
  if (authStatus === 'unauthorized') {
    return (
      <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#0E0E12] text-[#18181B] dark:text-zinc-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 rounded-3xl p-8 space-y-5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h1 className="font-serif-display text-2xl font-bold text-[#18181B] dark:text-zinc-50">
              Access Restricted
            </h1>
            <p className="text-xs text-[#18181B]/75 dark:text-zinc-400 leading-relaxed">
              <strong>{user?.email}</strong> is not in the Aesthé Steps partner allowlist. Ask a founder to add this email under Team Access.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex-1 h-10 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
            <button
              type="button"
              onClick={onBackToStore}
              className="flex-1 h-10 rounded-full border border-pink-200 dark:border-zinc-800 text-xs font-semibold text-[#18181B]/75 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- AUTHORIZED DASHBOARD ---
  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" />, count: orders.length },
    { id: 'catalog', label: 'Catalog & Stock', icon: <Package className="w-4 h-4" />, count: products.length },
    { id: 'promos', label: 'Promos & Delivery', icon: <Tag className="w-4 h-4" /> },
    { id: 'team', label: 'Team Access', icon: <Users className="w-4 h-4" /> },
  ];

  const SidebarBody = (
    <div className="flex flex-col h-full justify-between p-5">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <BrandLogo size="sm" />
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-[#18181B]/60 dark:text-zinc-400"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-1" aria-label="Admin Sections">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileNavOpen(false);
                }}
                className={`w-full h-10 px-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  active
                    ? 'bg-[#18181B] dark:bg-pink-600 text-white'
                    : 'text-[#18181B]/75 dark:text-zinc-300 hover:bg-pink-100/60 dark:hover:bg-zinc-800/80'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                {typeof item.count === 'number' && (
                  <span
                    className={`text-[11px] font-bold tabular-nums ${
                      active ? 'text-white/90' : 'text-[#18181B]/50 dark:text-zinc-500'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2.5 pt-4 border-t border-pink-200/70 dark:border-zinc-800">
        <div className="px-2 py-1.5">
          <p className="text-[11px] font-bold text-[#18181B] dark:text-zinc-100 truncate">
            {user?.displayName || 'Partner'}
          </p>
          <p className="text-[10px] text-[#18181B]/60 dark:text-zinc-400 truncate">
            {user?.email} · {partnerRole === 'owner' ? 'Founder' : 'Partner'}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleDarkMode}
          className="w-full h-9 px-3 rounded-xl border border-pink-200/80 dark:border-zinc-800 text-xs font-medium text-[#18181B]/80 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors"
        >
          {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          <span>{isDarkMode ? 'Light Appearance' : 'Dark Appearance'}</span>
        </button>

        <button
          type="button"
          onClick={onBackToStore}
          className="w-full h-9 px-3 rounded-xl border border-pink-200/80 dark:border-zinc-800 text-xs font-medium text-[#18181B]/80 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-800 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>View Storefront</span>
        </button>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full h-9 px-3 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#0E0E12] text-[#18181B] dark:text-zinc-100 flex">
      {/* Desktop Fixed 240px Sidebar */}
      <aside className="hidden lg:block w-60 shrink-0 border-r border-pink-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 h-screen">
        {SidebarBody}
      </aside>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileNavOpen(false)} />
          <div className="relative w-64 max-w-[80vw] bg-white dark:bg-zinc-950 border-r border-pink-200 dark:border-zinc-800 h-full z-10">
            {SidebarBody}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Mobile / Header Bar */}
        <header className="h-16 border-b border-pink-200/70 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl border border-pink-200 dark:border-zinc-800 flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <h1 className="font-serif-display text-xl font-bold text-[#18181B] dark:text-zinc-50 leading-none">
                {navItems.find((i) => i.id === activeTab)?.label}
              </h1>
              <p className="text-[11px] text-[#18181B]/60 dark:text-zinc-400 mt-1">
                WhatsApp orders routed to {storeConfig.primaryPhone} {!seedingDone ? '· Syncing catalog...' : ''}
              </p>
            </div>
          </div>

          {activeTab === 'catalog' && (
            <button
              type="button"
              onClick={openNewProductEditor}
              className="h-10 px-4 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Shoe</span>
            </button>
          )}
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto space-y-6">
          {bannerNotice && (
            <div
              className={`p-3.5 rounded-2xl border text-xs font-medium flex items-center justify-between gap-3 ${
                bannerNotice.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                {bannerNotice.text}
              </span>
              <button type="button" onClick={() => setBannerNotice(null)} aria-label="Dismiss">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ================= TAB 1: ORDERS ================= */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Summary Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 tabular-nums">
                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/60 dark:text-zinc-400">
                    Pending Confirmation
                  </p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                    {orderCounts.pending}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/60 dark:text-zinc-400">
                    In Dispatch
                  </p>
                  <p className="text-2xl font-bold text-[#DB2777] dark:text-pink-400 mt-1">
                    {orderCounts.confirmed + orderCounts.dispatched}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/60 dark:text-zinc-400">
                    Recorded COD Volume
                  </p>
                  <p className="text-2xl font-bold text-[#18181B] dark:text-zinc-50 mt-1">
                    ৳ {totalOrderValue.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Filter Tabs & Search */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {ORDER_STATUSES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setOrderStatusFilter(s.id)}
                      className={`h-9 px-3.5 rounded-xl text-xs font-semibold transition-colors tabular-nums ${
                        orderStatusFilter === s.id
                          ? 'bg-[#18181B] dark:bg-pink-600 text-white'
                          : 'bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 text-[#18181B]/75 dark:text-zinc-300'
                      }`}
                    >
                      {s.label} ({orderCounts[s.id]})
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[#18181B]/40 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search order #, phone, name..."
                    className="w-full h-10 pl-9 pr-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 text-xs focus:outline-none focus:border-[#DB2777]"
                  />
                </div>
              </div>

              {/* Orders Table / List */}
              {filteredOrders.length === 0 ? (
                <div className="p-12 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 text-center space-y-2">
                  <p className="text-sm font-semibold text-[#18181B] dark:text-zinc-100">
                    No matching COD orders yet
                  </p>
                  <p className="text-xs text-[#18181B]/60 dark:text-zinc-400">
                    Orders appear here automatically when shoppers submit the checkout form before opening WhatsApp.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs tabular-nums">
                      <thead>
                        <tr className="border-b border-pink-200/70 dark:border-zinc-800 bg-[#FDF2F4]/60 dark:bg-zinc-950/60 text-[11px] uppercase tracking-wider text-[#18181B]/65 dark:text-zinc-400">
                          <th className="py-3 px-4 font-bold">Order Ref</th>
                          <th className="py-3 px-4 font-bold">Customer</th>
                          <th className="py-3 px-4 font-bold">Items</th>
                          <th className="py-3 px-4 font-bold">Total</th>
                          <th className="py-3 px-4 font-bold">Status</th>
                          <th className="py-3 px-4 font-bold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-pink-100 dark:divide-zinc-800">
                        {filteredOrders.map((order) => {
                          const docId = order.id || order.orderCode;
                          const isExpanded = expandedOrderId === docId;
                          return (
                            <React.Fragment key={docId}>
                              <tr className="hover:bg-[#FFF9FA] dark:hover:bg-zinc-800/40 transition-colors">
                                <td className="py-3.5 px-4 align-top">
                                  <button
                                    type="button"
                                    onClick={() => setExpandedOrderId(isExpanded ? null : docId)}
                                    className="font-mono font-bold text-[#DB2777] dark:text-pink-400 hover:underline text-left"
                                  >
                                    #{order.orderCode}
                                  </button>
                                  <div className="text-[10px] text-[#18181B]/55 dark:text-zinc-500 mt-0.5">
                                    {formatDate(order.createdAt)}
                                  </div>
                                </td>
                                <td className="py-3.5 px-4 align-top">
                                  <div className="font-bold text-[#18181B] dark:text-zinc-100">
                                    {order.customerName}
                                  </div>
                                  <div className="text-[11px] text-[#18181B]/70 dark:text-zinc-400">
                                    {order.customerPhone}
                                  </div>
                                  <div className="text-[11px] text-[#18181B]/55 dark:text-zinc-500 max-w-[220px] truncate">
                                    {order.customerAddress}
                                  </div>
                                </td>
                                <td className="py-3.5 px-4 align-top">
                                  {order.items.map((it, idx) => (
                                    <div key={idx} className="text-[11px] text-[#18181B]/80 dark:text-zinc-300">
                                      {it.quantity}× {it.productName} (UK {it.size}
                                      {it.variantName ? `, ${it.variantName}` : ''})
                                    </div>
                                  ))}
                                </td>
                                <td className="py-3.5 px-4 align-top font-bold text-[#18181B] dark:text-zinc-100">
                                  ৳ {order.totalBDT.toLocaleString()}
                                  {order.promoCode && (
                                    <div className="text-[10px] font-normal text-emerald-600 dark:text-emerald-400">
                                      {order.promoCode} (-৳{order.discountBDT})
                                    </div>
                                  )}
                                </td>
                                <td className="py-3.5 px-4 align-top">
                                  <select
                                    value={order.status}
                                    disabled={updatingOrderId === docId}
                                    onChange={(e) => handleStatusChange(docId, e.target.value as OrderStatus)}
                                    aria-label={`Order status for ${order.orderCode}`}
                                    className={`h-8 px-2.5 rounded-lg border border-pink-200 dark:border-zinc-700 bg-[#FAF6F0] dark:bg-zinc-950 font-bold text-[11px] uppercase cursor-pointer ${STATUS_TEXT_CLASS[order.status]}`}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="dispatched">Dispatched</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                </td>
                                <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                                  <div className="inline-flex items-center gap-1.5">
                                    <a
                                      href={`https://wa.me/${formatBDWhatsAppPhone(order.customerPhone)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="h-8 px-2.5 rounded-lg border border-pink-200 dark:border-zinc-700 hover:border-[#DB2777] text-[11px] font-semibold inline-flex items-center gap-1 text-[#18181B] dark:text-zinc-200"
                                      title="Message customer on WhatsApp"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                                      <span>Chat</span>
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() => setExpandedOrderId(isExpanded ? null : docId)}
                                      className="h-8 px-2.5 rounded-lg border border-pink-200 dark:border-zinc-700 text-[11px] font-semibold text-[#18181B]/75 dark:text-zinc-300"
                                    >
                                      {isExpanded ? 'Hide' : 'Details'}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr className="bg-[#FAF6F0]/60 dark:bg-zinc-950/60">
                                  <td colSpan={6} className="px-4 py-3 text-xs">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                      <div>
                                        <span className="font-bold text-[#18181B]/60 dark:text-zinc-400 block">
                                          Full Address
                                        </span>
                                        <span>{order.customerAddress}</span>
                                        {order.customerNote && (
                                          <p className="text-[11px] text-[#DB2777] dark:text-pink-400 mt-1">
                                            Note: {order.customerNote}
                                          </p>
                                        )}
                                      </div>
                                      <div>
                                        <span className="font-bold text-[#18181B]/60 dark:text-zinc-400 block">
                                          Delivery Breakdown
                                        </span>
                                        <span>
                                          {order.deliveryArea === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'} · ৳
                                          {order.deliveryFee}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="font-bold text-[#18181B]/60 dark:text-zinc-400 block">
                                          Subtotal / Discount
                                        </span>
                                        <span>
                                          ৳{order.subtotalBDT.toLocaleString()} subtotal · -৳
                                          {order.discountBDT.toLocaleString()} discount
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 2: CATALOG & STOCK ================= */}
          {activeTab === 'catalog' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => {
                  const outSet = new Set((product.outOfStockSizes || []).map(String));
                  const published = product.isPublished !== false;
                  const inStock = product.inStock !== false;

                  return (
                    <div
                      key={product.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start sm:items-center gap-4 min-w-0">
                        <div className="w-20 h-16 rounded-xl overflow-hidden bg-[#FFF5F7] dark:bg-zinc-800 border border-pink-100 dark:border-zinc-700 shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className={`w-full h-full object-cover ${!published || !inStock ? 'opacity-50' : ''}`}
                          />
                        </div>
                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-serif-display text-lg font-bold text-[#18181B] dark:text-zinc-50">
                              {product.name}
                            </h3>
                            <span className="text-xs font-bold text-[#DB2777] dark:text-pink-400 tabular-nums">
                              ৳ {product.priceBDT.toLocaleString()}
                            </span>
                            {!published && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#18181B]/60 dark:text-zinc-400">
                                · Hidden
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#18181B]/65 dark:text-zinc-400 truncate max-w-md">
                            {product.category} · {product.tagline}
                          </p>

                          {/* Per-Size Quick Toggles */}
                          <div className="flex flex-wrap items-center gap-1 pt-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#18181B]/50 dark:text-zinc-500 mr-1">
                              Sizes:
                            </span>
                            {product.sizes.map((sz) => {
                              const isOut = outSet.has(String(sz));
                              return (
                                <button
                                  key={sz}
                                  type="button"
                                  onClick={() => handleToggleSizeOut(product, sz)}
                                  title={isOut ? `Click to mark UK ${sz} in stock` : `Click to mark UK ${sz} sold out`}
                                  className={`h-7 min-w-[30px] px-2 rounded-lg text-[11px] font-bold tabular-nums border transition-colors ${
                                    isOut
                                      ? 'border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 text-rose-500 line-through'
                                      : 'border-pink-200 dark:border-zinc-700 bg-[#FAF6F0] dark:bg-zinc-950 text-[#18181B] dark:text-zinc-200 hover:border-[#DB2777]'
                                  }`}
                                >
                                  {sz}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Row Actions */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleToggleInStock(product)}
                          className={`h-9 px-3 rounded-xl border text-xs font-semibold transition-colors ${
                            inStock
                              ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                              : 'border-rose-200 dark:border-rose-900 bg-rose-50/70 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400'
                          }`}
                        >
                          {inStock ? 'In Stock' : 'Sold Out'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleTogglePublished(product)}
                          className="h-9 px-3 rounded-xl border border-pink-200 dark:border-zinc-700 text-xs font-semibold text-[#18181B]/80 dark:text-zinc-200 hover:border-[#DB2777] inline-flex items-center gap-1.5"
                          title={published ? 'Hide from storefront' : 'Publish to storefront'}
                        >
                          {published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span>{published ? 'Visible' : 'Hidden'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsNewProduct(false);
                            setEditingProduct({ ...product });
                          }}
                          className="h-9 px-3 rounded-xl bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] text-white text-xs font-semibold inline-flex items-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        {confirmDeleteId === product.id ? (
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="h-9 px-3 rounded-xl bg-rose-600 text-white text-xs font-bold"
                            >
                              Confirm Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="h-9 px-2.5 rounded-xl border border-pink-200 dark:border-zinc-700 text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(product.id)}
                            className="w-9 h-9 rounded-xl border border-pink-200 dark:border-zinc-800 text-[#18181B]/50 dark:text-zinc-400 hover:text-rose-600 flex items-center justify-center"
                            aria-label={`Delete ${product.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= TAB 3: PROMOS & DELIVERY ================= */}
          {activeTab === 'promos' && (
            <form onSubmit={handleSaveConfig} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Delivery & Contact Card */}
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 space-y-4">
                  <h2 className="font-serif-display text-lg font-bold text-[#18181B] dark:text-zinc-50">
                    Delivery Fees &amp; Dispatch Contacts
                  </h2>

                  <div className="grid grid-cols-2 gap-4 tabular-nums">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-400 block">
                        Inside Dhaka (৳)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={5000}
                        value={configDraft.insideDhakaFee}
                        onChange={(e) =>
                          setConfigDraft({ ...configDraft, insideDhakaFee: Number(e.target.value) })
                        }
                        className="w-full h-10 px-3.5 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200 dark:border-zinc-800 text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-400 block">
                        Outside Dhaka (৳)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={5000}
                        value={configDraft.outsideDhakaFee}
                        onChange={(e) =>
                          setConfigDraft({ ...configDraft, outsideDhakaFee: Number(e.target.value) })
                        }
                        className="w-full h-10 px-3.5 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200 dark:border-zinc-800 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-400 block">
                      WhatsApp &amp; Orders Number (Locked Primary)
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="01613-817630 (+8801613817630)"
                      className="w-full h-10 px-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-950/60 border border-pink-200/70 dark:border-zinc-800 text-xs font-semibold text-[#18181B]/70 dark:text-zinc-400 cursor-not-allowed tabular-nums"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-400 block">
                      Secondary Helpline
                    </label>
                    <input
                      type="text"
                      maxLength={30}
                      value={configDraft.secondaryPhone}
                      onChange={(e) => setConfigDraft({ ...configDraft, secondaryPhone: e.target.value })}
                      className="w-full h-10 px-3.5 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200 dark:border-zinc-800 text-xs font-semibold tabular-nums"
                    />
                  </div>
                </div>

                {/* Promo Codes Card */}
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 space-y-4">
                  <h2 className="font-serif-display text-lg font-bold text-[#18181B] dark:text-zinc-50">
                    Active Promo Codes
                  </h2>

                  <div className="space-y-2">
                    {configDraft.promoCodes.map((promo, idx) => (
                      <div
                        key={promo.code}
                        className="p-3 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200/70 dark:border-zinc-800 flex items-center justify-between gap-2"
                      >
                        <div>
                          <span className="font-mono font-bold text-xs text-[#DB2777] dark:text-pink-400">
                            {promo.code}
                          </span>
                          <span className="text-[11px] text-[#18181B]/70 dark:text-zinc-400 ml-2">
                            {promo.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...configDraft.promoCodes];
                              next[idx] = { ...promo, active: !promo.active };
                              setConfigDraft({ ...configDraft, promoCodes: next });
                            }}
                            className={`h-7 px-2.5 rounded-lg text-[11px] font-bold border ${
                              promo.active
                                ? 'border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400'
                                : 'border-zinc-300 dark:border-zinc-700 text-zinc-500'
                            }`}
                          >
                            {promo.active ? 'Active' : 'Paused'}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setConfigDraft({
                                ...configDraft,
                                promoCodes: configDraft.promoCodes.filter((p) => p.code !== promo.code),
                              })
                            }
                            className="p-1.5 text-[#18181B]/50 dark:text-zinc-400 hover:text-rose-600"
                            aria-label={`Remove ${promo.code}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Add Promo Subform */}
                  <div className="pt-3 border-t border-pink-100 dark:border-zinc-800 space-y-2.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/65 dark:text-zinc-400">
                      Add New Promo Code
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <input
                        type="text"
                        value={newPromoCode}
                        onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                        placeholder="CODE"
                        className="h-9 px-3 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200 dark:border-zinc-800 text-xs font-mono uppercase"
                      />
                      <select
                        value={newPromoType}
                        onChange={(e) => setNewPromoType(e.target.value as 'percent' | 'fixed')}
                        className="h-9 px-2.5 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200 dark:border-zinc-800 text-xs"
                      >
                        <option value="fixed">Flat ৳ Off</option>
                        <option value="percent">% Off</option>
                      </select>
                      <input
                        type="number"
                        min={1}
                        value={newPromoValue}
                        onChange={(e) => setNewPromoValue(e.target.value)}
                        placeholder={newPromoType === 'percent' ? '%' : '৳'}
                        className="h-9 px-3 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200 dark:border-zinc-800 text-xs tabular-nums"
                      />
                      <button
                        type="button"
                        onClick={handleAddPromo}
                        className="h-9 px-3 rounded-xl bg-[#18181B] dark:bg-zinc-800 hover:bg-[#DB2777] text-white text-xs font-bold"
                      >
                        Add Code
                      </button>
                    </div>
                    {newPromoType === 'percent' && (
                      <input
                        type="number"
                        min={0}
                        value={newPromoCap}
                        onChange={(e) => setNewPromoCap(e.target.value)}
                        placeholder="Optional max discount cap (৳)"
                        className="w-full h-9 px-3 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200 dark:border-zinc-800 text-xs tabular-nums"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingConfig}
                  className="h-11 px-7 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] text-white text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-60"
                >
                  {savingConfig ? 'Saving Changes...' : 'Publish Delivery & Promo Settings'}
                </button>
              </div>
            </form>
          )}

          {/* ================= TAB 4: TEAM ACCESS ================= */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 space-y-4">
                <h2 className="font-serif-display text-lg font-bold text-[#18181B] dark:text-zinc-50">
                  Authorized Partner Emails
                </h2>
                <div className="space-y-2.5">
                  {allowlist.map((entry) => {
                    const isPrimary = entry.email.toLowerCase() === PRIMARY_FOUNDER_EMAIL;
                    return (
                      <div
                        key={entry.id || entry.email}
                        className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200/70 dark:border-zinc-800 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#18181B] dark:text-zinc-100 truncate">
                            {entry.displayName}{' '}
                            <span className="text-[11px] font-medium text-[#DB2777] dark:text-pink-400">
                              ({isPrimary ? 'Primary Founder' : entry.role})
                            </span>
                          </div>
                          <div className="text-[11px] text-[#18181B]/65 dark:text-zinc-400 truncate">
                            {entry.email}
                          </div>
                        </div>

                        {!isPrimary && (
                          confirmRemovePartnerId === entry.id ? (
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleRemovePartner(entry)}
                                className="h-8 px-2.5 rounded-lg bg-rose-600 text-white text-[11px] font-bold"
                              >
                                Remove
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmRemovePartnerId(null)}
                                className="h-8 px-2.5 rounded-lg border border-pink-200 dark:border-zinc-700 text-[11px]"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmRemovePartnerId(entry.id || null)}
                              className="w-8 h-8 rounded-lg border border-pink-200 dark:border-zinc-800 text-[#18181B]/50 hover:text-rose-600 flex items-center justify-center shrink-0"
                              aria-label={`Remove ${entry.email}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <form
                onSubmit={handleAddPartner}
                className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 space-y-4 h-fit"
              >
                <h2 className="font-serif-display text-lg font-bold text-[#18181B] dark:text-zinc-50">
                  Add Partner (Mahin / Mahadi)
                </h2>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-400 block">
                      Partner Name
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={partnerNameInput}
                      onChange={(e) => setPartnerNameInput(e.target.value)}
                      placeholder="e.g. Mahin"
                      className="w-full h-10 px-3.5 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200 dark:border-zinc-800 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-400 block">
                      Google Account Email
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={120}
                      value={partnerEmailInput}
                      onChange={(e) => setPartnerEmailInput(e.target.value)}
                      placeholder="partner@gmail.com"
                      className="w-full h-10 px-3.5 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200 dark:border-zinc-800 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-400 block">
                      Role
                    </label>
                    <select
                      value={partnerRoleInput}
                      onChange={(e) => setPartnerRoleInput(e.target.value as 'partner' | 'owner')}
                      className="w-full h-10 px-3.5 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200 dark:border-zinc-800 text-xs"
                    >
                      <option value="partner">Partner</option>
                      <option value="owner">Co-Founder</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={savingPartner}
                  className="w-full h-10 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  {savingPartner ? 'Granting Access...' : 'Authorize Partner Email'}
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* ================= PRODUCT EDITOR MODAL ================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60" onClick={() => setEditingProduct(null)} />
          <form
            onSubmit={handleSaveEditedProduct}
            className="relative z-10 w-full max-w-2xl bg-[#FAF6F0] dark:bg-[#121217] border border-pink-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 my-auto max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-pink-200/70 dark:border-zinc-800 pb-3">
              <h2 className="font-serif-display text-xl font-bold text-[#18181B] dark:text-zinc-50">
                {isNewProduct ? 'Add New Silhouette' : `Edit ${editingProduct.name}`}
              </h2>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-pink-100/60 dark:hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider block">Shoe Name *</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider block">Price (BDT) *</label>
                <input
                  type="number"
                  required
                  min={0}
                  max={500000}
                  value={editingProduct.priceBDT}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, priceBDT: Number(e.target.value) })
                  }
                  className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 tabular-nums font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider block">Category *</label>
                <input
                  type="text"
                  required
                  maxLength={60}
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  placeholder="Pointed Heels, Block Slides, Mules"
                  className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider block">Badge</label>
                <select
                  value={editingProduct.badge || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value || undefined })}
                  className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800"
                >
                  <option value="">None</option>
                  <option value="Popular Pick">Popular Pick</option>
                  <option value="New">New</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-[11px] font-bold uppercase tracking-wider block">Tagline *</label>
              <input
                type="text"
                required
                maxLength={180}
                value={editingProduct.tagline}
                onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-[11px] font-bold uppercase tracking-wider block">Description *</label>
              <textarea
                required
                rows={2}
                maxLength={1000}
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full p-3 rounded-xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 resize-none"
              />
            </div>

            {/* Image Upload / URL */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 space-y-2.5 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider">Product Image *</label>
                <label className="h-8 px-3 rounded-lg bg-[#18181B] dark:bg-pink-600 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProductImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex items-center gap-3">
                {editingProduct.image && (
                  <img
                    src={editingProduct.image}
                    alt="Preview"
                    className="w-16 h-12 rounded-xl object-cover border border-pink-200 dark:border-zinc-700 shrink-0"
                  />
                )}
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  placeholder="Or paste HTTPS image URL..."
                  className="flex-1 h-9 px-3 rounded-xl bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200 dark:border-zinc-800 text-xs"
                />
              </div>
            </div>

            {/* Sizes & Sold Out Size Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider block">
                  Tap Sizes to Mark Sold Out
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_UK_SIZES.map((sz) => {
                    const outArr = editingProduct.outOfStockSizes || [];
                    const isOut = outArr.map(String).includes(String(sz));
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          const next = isOut
                            ? outArr.filter((s) => String(s) !== String(sz))
                            : [...outArr, sz];
                          setEditingProduct({ ...editingProduct, outOfStockSizes: next });
                        }}
                        className={`h-8 px-2.5 rounded-lg font-bold border tabular-nums ${
                          isOut
                            ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-600 line-through'
                            : 'border-pink-200 dark:border-zinc-700 bg-white dark:bg-zinc-900'
                        }`}
                      >
                        UK {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider block">
                  Craft Details (1 per line)
                </span>
                <textarea
                  rows={3}
                  value={editingProduct.details.join('\n')}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      details: e.target.value
                        .split('\n')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 text-xs"
                />
              </div>
            </div>

            {/* Color Variants Editor */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider">Shade Swatches</span>
                <button
                  type="button"
                  onClick={() => {
                    const next: ProductColorVariant = {
                      id: `var-${Date.now()}`,
                      name: 'New Shade',
                      colorHex: '#DB2777',
                    };
                    setEditingProduct({
                      ...editingProduct,
                      variants: [...(editingProduct.variants || []), next],
                    });
                  }}
                  className="text-[11px] font-bold text-[#DB2777] dark:text-pink-400 hover:underline"
                >
                  + Add Shade
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(editingProduct.variants || []).map((v, i) => (
                  <div
                    key={v.id}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800"
                  >
                    <input
                      type="color"
                      value={v.colorHex}
                      onChange={(e) => {
                        const list = [...(editingProduct.variants || [])];
                        list[i] = { ...v, colorHex: e.target.value };
                        setEditingProduct({ ...editingProduct, variants: list });
                      }}
                      className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={v.name}
                      onChange={(e) => {
                        const list = [...(editingProduct.variants || [])];
                        list[i] = { ...v, name: e.target.value };
                        setEditingProduct({ ...editingProduct, variants: list });
                      }}
                      className="flex-1 h-8 px-2 rounded-lg bg-[#FAF6F0] dark:bg-zinc-950 border border-pink-200/70 dark:border-zinc-800 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const list = (editingProduct.variants || []).filter((_, idx) => idx !== i);
                        setEditingProduct({ ...editingProduct, variants: list });
                      }}
                      className="p-1 text-[#18181B]/45 hover:text-rose-600"
                      aria-label="Remove shade"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-pink-200/70 dark:border-zinc-800">
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProduct.isPublished !== false}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, isPublished: e.target.checked })
                  }
                  className="accent-[#DB2777]"
                />
                <span>Published on storefront</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="h-10 px-4 rounded-full border border-pink-200 dark:border-zinc-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProduct}
                  className="h-10 px-6 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] text-white text-xs font-bold uppercase tracking-wider"
                >
                  {savingProduct ? 'Saving...' : 'Save Shoe'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
