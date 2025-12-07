// src/components/product/ProductReviews.tsx
import { getApprovedReviewsForProduct } from "@/lib/reviews";
import ProductReviewsClient from "./ProductReviewsClient";

type Props = {
  productId: string;
  productName: string;
};

export default async function ProductReviews({
  productId,
  productName,
}: Props) {
  const reviews = await getApprovedReviewsForProduct(productId);

  return (
    <ProductReviewsClient
      productId={productId}
      productName={productName}
      initialReviews={reviews}
    />
  );
}
