export const productCategories = [
  "Monitors",
  "Headphones",
  "Laptops",
  "Tablets",
] as const;

export const priceOptions = [
  { label: "Under 200", from: 0, to: 200 },
  { label: "200 to 500", from: 200, to: 500 },
  { label: "500 to 1000", from: 500, to: 1000 },
  { label: "2000 to 5000", from: 1000, to: 2000 },
] as const;
