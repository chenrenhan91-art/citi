type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function CoverImage({ src, alt, className = "", priority }: Props) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const url = src.startsWith("http") || src.startsWith(base + "/") ? src : `${base}${src}`;

  return (
    // Native img so GitHub Pages basePath is applied. next/image left local /images paths unprefixed.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
