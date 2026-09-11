export type ShipClass = "bedding" | "standard" | "oversized";

export type ProductVariant = {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  origin: string;
  originSlug: string;
  collections: string[];
  blurb: string;
  description: string;
  details: string[];
  materials: string;
  madeIn: string;
  care: string;
  shipClass: ShipClass;
  images: string[];
  variants: ProductVariant[];
  bestseller?: boolean;
  archive?: boolean;
  finalSale?: boolean;
  inStock: boolean;
  reviewScore: number;
  reviewCount: number;
};
