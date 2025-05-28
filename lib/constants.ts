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
  { label: "1000 to 2000", from: 1000, to: 2000 },
  { label: "2000 to 5000", from: 2000, to: 5000 },
  { label: "5000 and above", from: 5000, to: 100_000_000_000 },
] as const;

export const sortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "Popularity", value: "popularity" },
  { label: "Price asc", value: "price_asc" },
  { label: "Price desc", value: "price_desc" },
  { label: "Name asc", value: "name_asc" },
  { label: "Name desc", value: "name_desc" },
] as const;
