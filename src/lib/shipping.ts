import { formatGBP } from "./format";
import { isRestrictedCountry } from "./embargo";
import type { ShipClass } from "./types";

export const UK_STANDARD_FEE = 950;
export const UK_OVERSIZED_FEE = 4950;
export const UK_FREE_STANDARD_THRESHOLD = 25000;
export const INTL_BEDDING_FEE = 1999;
export const INTL_STANDARD_FEE = 2499;
export const INTL_OVERSIZED_FEE = 9900;
export const INTL_FREE_STANDARD_THRESHOLD = 40000;
export const RETURN_WINDOW_DAYS = 30;
export const UK_RETURN_LABEL_FEE = 499;

export type ShippingQuote =
  | {
      ok: true;
      pence: number;
      label: string;
      detail: string;
      band: ShipClass | "mixed";
    }
  | {
      ok: false;
      reason: "empty" | "restricted";
      message: string;
    };

function highestClass(classes: ShipClass[]): ShipClass {
  if (classes.includes("oversized")) return "oversized";
  if (classes.includes("standard")) return "standard";
  return "bedding";
}

export function quoteShipping(
  lines: { shipClass: ShipClass; lineTotal: number }[],
  countryCode: string,
): ShippingQuote {
  if (lines.length === 0) {
    return {
      ok: false,
      reason: "empty",
      message: "Add an item to see delivery charges.",
    };
  }

  if (isRestrictedCountry(countryCode)) {
    return {
      ok: false,
      reason: "restricted",
      message:
        "We cannot ship to this destination under UK export and sanctions rules. Please choose another delivery country.",
    };
  }

  const merch = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const band = highestClass(lines.map((line) => line.shipClass));
  const uk = countryCode === "GB";

  if (uk) {
    if (band === "oversized") {
      return {
        ok: true,
        pence: UK_OVERSIZED_FEE,
        label: "UK oversized delivery",
        detail: `Two-person delivery ${formatGBP(UK_OVERSIZED_FEE)}. The £250 free-shipping threshold does not apply to rugs, chairs, or benches.`,
        band,
      };
    }
    if (band === "bedding") {
      return {
        ok: true,
        pence: 0,
        label: "Free UK shipping",
        detail:
          "Bedding and bath textiles ship free within the United Kingdom.",
        band,
      };
    }
    if (merch >= UK_FREE_STANDARD_THRESHOLD) {
      return {
        ok: true,
        pence: 0,
        label: "Free UK standard shipping",
        detail: `Standard UK delivery is free on merchandise totals of ${formatGBP(UK_FREE_STANDARD_THRESHOLD)} or more.`,
        band,
      };
    }
    return {
      ok: true,
      pence: UK_STANDARD_FEE,
      label: "UK standard delivery",
      detail: `${formatGBP(UK_STANDARD_FEE)}. Free when your merchandise total reaches ${formatGBP(UK_FREE_STANDARD_THRESHOLD)}.`,
      band,
    };
  }

  if (band === "oversized") {
    return {
      ok: true,
      pence: INTL_OVERSIZED_FEE,
      label: "International oversized delivery",
      detail: `${formatGBP(INTL_OVERSIZED_FEE)}. The £400 international threshold does not waive oversized delivery.`,
      band,
    };
  }
  if (band === "bedding") {
    return {
      ok: true,
      pence: INTL_BEDDING_FEE,
      label: "International bedding delivery",
      detail: `${formatGBP(INTL_BEDDING_FEE)} to eligible destinations outside the United Kingdom.`,
      band,
    };
  }
  if (merch >= INTL_FREE_STANDARD_THRESHOLD) {
    return {
      ok: true,
      pence: 0,
      label: "Free international standard shipping",
      detail: `Standard international delivery is free on merchandise totals of ${formatGBP(INTL_FREE_STANDARD_THRESHOLD)} or more.`,
      band,
    };
  }
  return {
    ok: true,
    pence: INTL_STANDARD_FEE,
    label: "International standard delivery",
    detail: `${formatGBP(INTL_STANDARD_FEE)}. Free when your merchandise total reaches ${formatGBP(INTL_FREE_STANDARD_THRESHOLD)}.`,
    band,
  };
}

export function shippingNoteForProduct(
  shipClass: ShipClass,
  countryCode = "GB",
): string {
  if (isRestrictedCountry(countryCode)) {
    return "We cannot ship this item to the selected destination.";
  }
  if (countryCode === "GB") {
    if (shipClass === "bedding") {
      return "Free UK shipping on bedding and bath. In stock items leave our warehouse within 2-4 working days.";
    }
    if (shipClass === "oversized") {
      return `UK oversized delivery ${formatGBP(UK_OVERSIZED_FEE)}, shown in the bag and at checkout. The £250 threshold does not waive this charge.`;
    }
    return `UK standard delivery ${formatGBP(UK_STANDARD_FEE)}, or free on merchandise totals of ${formatGBP(UK_FREE_STANDARD_THRESHOLD)} or more.`;
  }
  if (shipClass === "bedding") {
    return `International bedding delivery ${formatGBP(INTL_BEDDING_FEE)} to eligible countries.`;
  }
  if (shipClass === "oversized") {
    return `International oversized delivery ${formatGBP(INTL_OVERSIZED_FEE)} to eligible countries.`;
  }
  return `International standard delivery ${formatGBP(INTL_STANDARD_FEE)}, or free from ${formatGBP(INTL_FREE_STANDARD_THRESHOLD)}.`;
}
