import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-serif text-4xl">Page not found</h1>
      <p className="mt-4 text-muted">That address is not in this shop.</p>
      <Link href="/" className="btn btn-solid mt-8">
        Back to the house
      </Link>
    </div>
  );
}
