import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff1f7] via-white to-[#ffe4f3] flex items-center">
      <div className="max-w-3xl mx-auto px-4 py-12 text-center text-[#47201d]">
        <div className="inline-flex items-center justify-center rounded-full bg-[#fff7fb] border border-[#fde7f1] px-4 py-1 text-[11px] uppercase tracking-[0.18em] text-[#e11d70] mb-4">
          404 · Page not found
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold mb-3">
          Oups… cette page n’existe pas.
        </h1>
        <p className="text-sm sm:text-base text-[#a36d63] max-w-xl mx-auto mb-6">
          Peut-être que le lien a changé ou que le produit n’est plus en ligne.
          Retournez à la boutique ou à l’accueil Atelier de Méa.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-[#ec4899] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] transition"
          >
            Retour à l’accueil
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center rounded-full border border-[#f9a8d4] px-5 py-2.5 text-xs sm:text-sm font-medium text-[#47201d] hover:bg-white/70 transition"
          >
            Voir la boutique
          </Link>
        </div>
      </div>
    </main>
  );
}
