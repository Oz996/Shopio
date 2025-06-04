import { Product } from "@prisma/client";

export async function searchProducts(value: string): Promise<Product[]> {
  const res = await fetch("/api/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
