import { formatGBP } from "@/lib/format";

export function Price({
  price,
  compareAt,
}: {
  price: number;
  compareAt?: number;
}) {
  return (
    <p className="flex items-baseline gap-2 text-[15px] tracking-wide">
      {compareAt && compareAt > price ? (
        <>
          <span className="text-olive">{formatGBP(price)}</span>
          <span className="text-muted line-through">{formatGBP(compareAt)}</span>
        </>
      ) : (
        <span>{formatGBP(price)}</span>
      )}
    </p>
  );
}
