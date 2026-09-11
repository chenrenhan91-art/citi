export type PlacedOrderLine = {
  name: string;
  variant: string;
  quantity: number;
  lineTotal: number;
};

export type PlacedOrder = {
  id: string;
  placedAt: string;
  email: string;
  shipTo: string;
  countryName: string;
  lines: PlacedOrderLine[];
  subtotal: number;
  shippingLabel: string;
  shippingPence: number;
  total: number;
  last4: string;
};

const STORAGE_KEY = "dye-last-order-v1";

export function newOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const salt = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DYE-${stamp}-${salt}`;
}

export function saveOrder(order: PlacedOrder): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function readOrder(): PlacedOrder | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PlacedOrder;
  } catch {
    return null;
  }
}
