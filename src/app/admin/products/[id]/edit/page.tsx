// src/app/admin/products/[id]/edit/page.tsx
import { getProductById } from "@/lib/products";
import EditProductForm from "./EditProductForm";

type PageParams = {
  id: string; // DB id from the URL
};

export default async function EditProductPage({
  params,
}: {
  params: PageParams;
}) {
  const { id } = params;

  // ✅ Fetch by ID on the server
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-10">
        <h1 className="text-xl font-semibold text-[#3B2A24]">
          Product not found
        </h1>
        <p className="text-xs text-[#7A6058] mt-1">
          We couldn&apos;t find any product with ID:{" "}
          <span className="font-mono">{id}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-10">
      <h1 className="text-xl font-semibold text-[#3B2A24] mb-1">
        Edit product
      </h1>
      <p className="text-xs text-[#7A6058] mb-4">
        Update details for <strong>{product.name}</strong>.
      </p>

      <EditProductForm product={product} />
    </div>
  );
}


