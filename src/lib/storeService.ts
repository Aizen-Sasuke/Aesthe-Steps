import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
  where,
  orderBy,
  serverTimestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import {
  AdminAllowlistEntry,
  OrderRecord,
  OrderStatus,
  Product,
  StoreConfig,
} from '../types';
import { ALL_PRODUCTS, DEFAULT_STORE_CONFIG, STORE_CONTACT } from '../data/products';
import {
  db,
  handleFirestoreError,
  OperationType,
  PRIMARY_FOUNDER_EMAIL,
  toEmailDocId,
} from './firebase';

const DEFAULT_COLOR_SCHEME = {
  primary: '#DB2777',
  accent: '#18181B',
  glow: '#FDF2F4',
  ringColor: 'from-pink-600 to-zinc-800',
};

const BUNDLED_MAP = new Map<string, Product>(ALL_PRODUCTS.map((p) => [p.id, p]));

function hydrateProduct(raw: Record<string, unknown>, id: string): Product {
  const bundled = BUNDLED_MAP.get(id);
  const rawImage = typeof raw.image === 'string' && raw.image.trim() ? raw.image : bundled?.image || '';
  const rawVariants = Array.isArray(raw.variants)
    ? raw.variants.map((v: Record<string, unknown>) => ({
        id: String(v.id || ''),
        name: String(v.name || ''),
        colorHex: String(v.colorHex || '#18181B'),
        ...(typeof v.secondaryHex === 'string' ? { secondaryHex: v.secondaryHex } : {}),
        image: typeof v.image === 'string' && v.image.trim() ? v.image : rawImage,
      }))
    : bundled?.variants;

  return {
    id,
    name: String(raw.name || bundled?.name || 'Untitled Style'),
    tagline: String(raw.tagline || ''),
    category: String(raw.category || 'Pointed Heels'),
    priceBDT: Number(raw.priceBDT ?? 0),
    image: rawImage,
    colorScheme: bundled?.colorScheme || DEFAULT_COLOR_SCHEME,
    sizes: Array.isArray(raw.sizes) && raw.sizes.length > 0 ? (raw.sizes as (number | string)[]) : [6, 7, 8, 9, 10, 11],
    outOfStockSizes: Array.isArray(raw.outOfStockSizes) ? (raw.outOfStockSizes as (number | string)[]) : [],
    oversizeAvailable: Boolean(raw.oversizeAvailable),
    variants: rawVariants,
    badge: typeof raw.badge === 'string' && raw.badge ? raw.badge : undefined,
    campaignLabel: typeof raw.campaignLabel === 'string' && raw.campaignLabel ? raw.campaignLabel : undefined,
    description: String(raw.description || ''),
    details: Array.isArray(raw.details) ? (raw.details as string[]) : [],
    inStock: raw.inStock !== false,
    isPublished: raw.isPublished !== false,
    rating: Number(raw.rating ?? 4.9),
    reviewsCount: Number(raw.reviewsCount ?? 0),
    sortOrder: Number(raw.sortOrder ?? 0),
    updatedAt: raw.updatedAt,
  };
}

function serializeProduct(product: Product): Record<string, unknown> {
  const cleanId = product.id.trim().replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 80);
  const baseImage = product.image.trim().slice(0, 399900);

  // Strip duplicate base64 variant images equal to baseImage to stay far under Firestore 1MB limit
  const variants = (product.variants || [])
    .slice(0, 12)
    .map((v) => {
      const entry: Record<string, string> = {
        id: String(v.id || '').slice(0, 80),
        name: String(v.name || '').slice(0, 80),
        colorHex: String(v.colorHex || '#18181B').slice(0, 20),
      };
      if (v.secondaryHex) entry.secondaryHex = String(v.secondaryHex).slice(0, 20);
      if (v.image && v.image !== baseImage && v.image.length < 150000) {
        entry.image = v.image;
      }
      return entry;
    });

  const payload: Record<string, unknown> = {
    id: cleanId,
    name: product.name.trim().slice(0, 100),
    tagline: product.tagline.trim().slice(0, 180),
    category: product.category.trim().slice(0, 60),
    priceBDT: Math.max(0, Math.min(500000, Math.round(Number(product.priceBDT) || 0))),
    image: baseImage,
    sizes: (product.sizes.length > 0 ? product.sizes : [6, 7, 8, 9, 10, 11]).slice(0, 12),
    outOfStockSizes: (product.outOfStockSizes || []).slice(0, 12),
    oversizeAvailable: Boolean(product.oversizeAvailable || product.sizes.includes('Oversize')),
    variants,
    description: product.description.trim().slice(0, 1000),
    details: (product.details.length > 0 ? product.details : ['UK Sizes 6–11 available']).slice(0, 12),
    inStock: Boolean(product.inStock),
    isPublished: product.isPublished !== false,
    rating: Math.max(0, Math.min(5, Number(product.rating ?? 4.9))),
    reviewsCount: Math.max(0, Math.min(1000000, Math.round(Number(product.reviewsCount ?? 0)))),
    sortOrder: Math.max(0, Math.min(100000, Math.round(Number(product.sortOrder ?? 0)))),
    updatedAt: serverTimestamp(),
  };

  if (product.badge && product.badge.trim()) {
    payload.badge = product.badge.trim().slice(0, 40);
  }
  if (product.campaignLabel && product.campaignLabel.trim()) {
    payload.campaignLabel = product.campaignLabel.trim().slice(0, 80);
  }

  return payload;
}

export function subscribePublishedProducts(
  onData: (products: Product[]) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const path = 'products';
  const q = query(collection(db, path), where('isPublished', '==', true));
  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onData(ALL_PRODUCTS);
        return;
      }
      const list = snapshot.docs
        .map((d) => hydrateProduct(d.data() as Record<string, unknown>, d.id))
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      onData(list);
    },
    (error) => {
      if (onError) onError(error);
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (wrapped) {
        console.warn('Using bundled catalog fallback after Firestore read notice:', wrapped);
      }
    }
  );
}

export function subscribeAllProducts(
  onData: (products: Product[]) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const path = 'products';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const list = snapshot.docs
        .map((d) => hydrateProduct(d.data() as Record<string, unknown>, d.id))
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      onData(list);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export function subscribeStoreConfig(
  onData: (config: StoreConfig) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const path = 'storeConfig/main';
  return onSnapshot(
    doc(db, 'storeConfig', 'main'),
    (snap) => {
      if (!snap.exists()) {
        onData(DEFAULT_STORE_CONFIG);
        return;
      }
      const data = snap.data() as Record<string, unknown>;
      onData({
        insideDhakaFee: Number(data.insideDhakaFee ?? DEFAULT_STORE_CONFIG.insideDhakaFee),
        outsideDhakaFee: Number(data.outsideDhakaFee ?? DEFAULT_STORE_CONFIG.outsideDhakaFee),
        primaryPhone: String(data.primaryPhone || STORE_CONTACT.primaryPhone),
        secondaryPhone: String(data.secondaryPhone || STORE_CONTACT.secondaryPhone),
        whatsappNumber: String(data.whatsappNumber || STORE_CONTACT.whatsappNumber),
        email: String(data.email || STORE_CONTACT.email),
        location: String(data.location || STORE_CONTACT.location),
        partners: String(data.partners || STORE_CONTACT.partners),
        promoCodes: Array.isArray(data.promoCodes)
          ? (data.promoCodes as StoreConfig['promoCodes'])
          : DEFAULT_STORE_CONFIG.promoCodes,
        updatedAt: data.updatedAt,
      });
    },
    (error) => {
      if (onError) onError(error);
      try {
        handleFirestoreError(error, OperationType.GET, path);
      } catch (wrapped) {
        console.warn('Using bundled config fallback after Firestore notice:', wrapped);
      }
    }
  );
}

export async function verifyPartnerAccess(user: User | null): Promise<{
  authorized: boolean;
  role: 'owner' | 'partner' | null;
}> {
  if (!user || !user.email || !user.emailVerified) {
    return { authorized: false, role: null };
  }
  const normalized = user.email.trim().toLowerCase();
  if (normalized === PRIMARY_FOUNDER_EMAIL) {
    return { authorized: true, role: 'owner' };
  }

  const emailKey = toEmailDocId(normalized);
  const path = `adminAllowlist/${emailKey}`;
  try {
    const snap = await getDoc(doc(db, 'adminAllowlist', emailKey));
    if (!snap.exists()) {
      return { authorized: false, role: null };
    }
    const role = (snap.data()?.role as 'owner' | 'partner') || 'partner';
    return { authorized: true, role };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function seedInitialCatalogIfEmpty(adminEmail: string): Promise<void> {
  // 1. Ensure primary founder is recorded in adminAllowlist
  const founderId = toEmailDocId(PRIMARY_FOUNDER_EMAIL);
  try {
    const founderRef = doc(db, 'adminAllowlist', founderId);
    const founderSnap = await getDoc(founderRef);
    if (!founderSnap.exists()) {
      await setDoc(founderRef, {
        email: PRIMARY_FOUNDER_EMAIL,
        displayName: 'Hax (Founder)',
        role: 'owner',
        addedAt: serverTimestamp(),
        addedBy: adminEmail.trim().toLowerCase(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `adminAllowlist/${founderId}`);
  }

  // 2. Ensure storeConfig/main exists
  try {
    const configRef = doc(db, 'storeConfig', 'main');
    const configSnap = await getDoc(configRef);
    if (!configSnap.exists()) {
      await setDoc(configRef, {
        insideDhakaFee: DEFAULT_STORE_CONFIG.insideDhakaFee,
        outsideDhakaFee: DEFAULT_STORE_CONFIG.outsideDhakaFee,
        primaryPhone: STORE_CONTACT.primaryPhone,
        secondaryPhone: STORE_CONTACT.secondaryPhone,
        whatsappNumber: STORE_CONTACT.whatsappNumber,
        email: STORE_CONTACT.email,
        location: STORE_CONTACT.location,
        partners: STORE_CONTACT.partners,
        promoCodes: DEFAULT_STORE_CONFIG.promoCodes,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'storeConfig/main');
  }

  // 3. Seed published products if collection is currently empty
  try {
    const snap = await getDocs(collection(db, 'products'));
    if (snap.empty) {
      for (let i = 0; i < ALL_PRODUCTS.length; i += 1) {
        const product = { ...ALL_PRODUCTS[i], sortOrder: i, isPublished: true };
        await setDoc(doc(db, 'products', product.id), serializeProduct(product));
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'products');
  }
}

export async function saveProduct(product: Product): Promise<void> {
  const payload = serializeProduct(product);
  const path = `products/${String(payload.id)}`;
  try {
    await setDoc(doc(db, 'products', String(payload.id)), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  const path = `products/${productId}`;
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function saveStoreConfig(config: StoreConfig): Promise<void> {
  const path = 'storeConfig/main';
  const payload = {
    insideDhakaFee: Math.max(0, Math.min(5000, Math.round(Number(config.insideDhakaFee) || 0))),
    outsideDhakaFee: Math.max(0, Math.min(5000, Math.round(Number(config.outsideDhakaFee) || 0))),
    primaryPhone: (config.primaryPhone || STORE_CONTACT.primaryPhone).trim().slice(0, 30),
    secondaryPhone: (config.secondaryPhone || STORE_CONTACT.secondaryPhone).trim().slice(0, 30),
    whatsappNumber: (config.whatsappNumber || STORE_CONTACT.whatsappNumber).trim().slice(0, 25),
    email: (config.email || STORE_CONTACT.email).trim().slice(0, 120),
    location: (config.location || STORE_CONTACT.location).trim().slice(0, 120),
    partners: (config.partners || STORE_CONTACT.partners).trim().slice(0, 120),
    promoCodes: (config.promoCodes || []).slice(0, 20).map((p) => ({
      code: p.code.trim().toUpperCase().slice(0, 32),
      type: p.type === 'fixed' ? 'fixed' : 'percent',
      value: Math.max(0, Math.round(Number(p.value) || 0)),
      ...(p.maxDiscountBDT ? { maxDiscountBDT: Math.max(0, Math.round(Number(p.maxDiscountBDT))) } : {}),
      label: p.label.trim().slice(0, 80),
      active: Boolean(p.active),
    })),
    updatedAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, 'storeConfig', 'main'), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function generateOrderCode(): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  const suffix = Date.now().toString().slice(-3);
  return `AS-${rand}${suffix}`;
}

export async function createGuestOrder(
  order: Omit<OrderRecord, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<string> {
  const orderCode = order.orderCode.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 24) || generateOrderCode();
  const path = `orders/${orderCode}`;

  const payload: Record<string, unknown> = {
    orderCode,
    customerName: order.customerName.trim().slice(0, 100),
    customerPhone: order.customerPhone.trim().slice(0, 30),
    customerAddress: order.customerAddress.trim().slice(0, 400),
    deliveryArea: order.deliveryArea === 'outside_dhaka' ? 'outside_dhaka' : 'inside_dhaka',
    deliveryFee: Math.max(0, Math.min(5000, Math.round(Number(order.deliveryFee) || 0))),
    discountBDT: Math.max(0, Math.min(500000, Math.round(Number(order.discountBDT) || 0))),
    subtotalBDT: Math.max(0, Math.min(5000000, Math.round(Number(order.subtotalBDT) || 0))),
    totalBDT: Math.max(0, Math.min(5000000, Math.round(Number(order.totalBDT) || 0))),
    items: order.items.slice(0, 50).map((item) => ({
      productId: item.productId,
      productName: item.productName,
      ...(item.variantName ? { variantName: item.variantName } : {}),
      size: item.size,
      quantity: item.quantity,
      unitPriceBDT: item.unitPriceBDT,
      lineTotalBDT: item.lineTotalBDT,
    })),
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (order.customerNote && order.customerNote.trim()) {
    payload.customerNote = order.customerNote.trim().slice(0, 400);
  }
  if (order.promoCode && order.promoCode.trim()) {
    payload.promoCode = order.promoCode.trim().toUpperCase().slice(0, 40);
  }

  try {
    await setDoc(doc(db, 'orders', orderCode), payload);
    return orderCode;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeAllOrders(
  onData: (orders: OrderRecord[]) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const path = 'orders';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const orders: OrderRecord[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<OrderRecord, 'id'>),
      }));
      onData(orders);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  customerNote?: string
): Promise<void> {
  const path = `orders/${orderId}`;
  const updatePayload: Record<string, unknown> = {
    status,
    updatedAt: serverTimestamp(),
  };
  if (typeof customerNote === 'string') {
    updatePayload.customerNote = customerNote.trim().slice(0, 400);
  }

  try {
    await updateDoc(doc(db, 'orders', orderId), updatePayload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export function subscribeAllowlist(
  onData: (entries: AdminAllowlistEntry[]) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const path = 'adminAllowlist';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const list: AdminAllowlistEntry[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<AdminAllowlistEntry, 'id'>),
      }));
      onData(list);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export async function addPartnerAllowlist(
  email: string,
  displayName: string,
  role: 'partner' | 'owner',
  addedByEmail: string
): Promise<void> {
  const cleanEmail = email.trim().toLowerCase();
  const docId = toEmailDocId(cleanEmail);
  const path = `adminAllowlist/${docId}`;
  try {
    await setDoc(doc(db, 'adminAllowlist', docId), {
      email: cleanEmail.slice(0, 120),
      displayName: displayName.trim().slice(0, 80),
      role,
      addedAt: serverTimestamp(),
      addedBy: addedByEmail.trim().toLowerCase().slice(0, 120),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function removePartnerAllowlist(docId: string): Promise<void> {
  const path = `adminAllowlist/${docId}`;
  try {
    await deleteDoc(doc(db, 'adminAllowlist', docId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
