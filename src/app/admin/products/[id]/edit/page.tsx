import { getProductById } from "@/lib/products";
import EditProductForm from "./EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#47201d] text-sm">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#47201d]">
              Edit product
            </h1>
            <p className="text-xs text-[#a36d63]">
              Make changes and don’t forget to save.
            </p>
          </div>
        </div>

        <EditProductForm product={product} />
      </div>
    </div>
  );
}
