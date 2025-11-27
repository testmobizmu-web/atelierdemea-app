// src/app/admin/products/[id]/edit/page.tsx
import { getProductById } from "@/lib/products";
import EditProductForm from "./EditProductForm";

type PageParams = {
  id: string;
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  // ✅ Next 16: params is a Promise
  const { id } = await params;

  // id is a string in your DB, so no Number() here
  const product = await getProductById(id);

  if (!product) {
    return (
      <div>
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
    <div>
      <h1 className="text-xl font-semibold text-[#3B2A24] mb-1">
        Edit product
      </h1>
      <p className="text-xs text-[#7A6058] mb-4">
        Update details for <strong>{product.name}</strong>.
      </p>

      {/* Your existing form component that handles the actual editing */}
      <EditProductForm initialProduct={product} />
    </div>
  );
}
