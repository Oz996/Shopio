import { Product } from "@prisma/client";
import styles from "./product-details.module.scss";
import ProductOptions from "../product-options/product-options";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductReviews from "../product-reviews/product-reviews";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className={styles.details}>
      <h1>{`${product.brand} ${product.name}`}</h1>
      <p className={styles.details_text}>{product.details}</p>

      <ProductReviews product={product} />

      {listDescription(product.description)}
      <span className={styles.price}>€ {product.price}</span>

      <ProductOptions product={product} />

      <div className={styles.links}>
        <Link href={`/products/${product.brand}`}>
          Browse more from <span>{product.brand}</span>
          <ChevronRight size={15} />
        </Link>

        <Link href={`/products/${product.category}`}>
          {`Browse all ${product.category}`}
          <ChevronRight size={15} />
        </Link>
      </div>
    </div>
  );
}

function listDescription(description: string) {
  return (
    <ul className={styles.list}>
      {description.split("-").map((text, index) => (
        <li key={index}>{text}</li>
      ))}
    </ul>
  );
}
