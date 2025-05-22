import Image from "next/image";
import React from "react";
import styles from "./product-card.module.scss";
import Link from "next/link";
import { ProductCardType } from "@/lib/types";
import ProductRating from "./product-rating";

interface ProductCardProps {
  product: ProductCardType;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <Link href={`/product/${product.slug}`}>
        <div className={styles.image_wrapper}>
          <Image
            className={styles.image}
            src={product.thumbnails[0]}
            alt=""
            fill
          />
        </div>

        <div className={styles.content}>
          <h3>{`${product.brand} ${product.name}`}</h3>
          <p>{product.description}</p>
        </div>

        <div className={styles.footer}>
          <ProductRating rating={product.rating} small />
          <p className={styles.price}>€ {product.price}</p>
        </div>
      </Link>
    </article>
  );
}
