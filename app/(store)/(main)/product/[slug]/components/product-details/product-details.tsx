import { Product } from "@prisma/client";
import styles from "./product-details.module.scss";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className={styles.details}>
      <div></div>
    </div>
  );
}
