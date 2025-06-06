export const productCategories = [
  "Monitors",
  "Headphones",
  "Laptops",
  "Tablets",
] as const;

export const sortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "Popularity", value: "popularity" },
  { label: "Price asc", value: "price_asc" },
  { label: "Price desc", value: "price_desc" },
  { label: "Name asc", value: "name_asc" },
  { label: "Name desc", value: "name_desc" },
] as const;
