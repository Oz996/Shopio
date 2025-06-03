import { Product } from "@prisma/client";

export async function searchProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
