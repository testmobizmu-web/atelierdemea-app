import { getAllProducts } from "@/lib/products";

export default async function TestProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-lg font-semibold">Test products</h1>
      <pre className="mt-4 text-xs whitespace-pre-wrap">
        {JSON.stringify(products, null, 2)}
      </pre>
    </main>
  );
}

