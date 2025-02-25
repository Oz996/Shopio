import { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
import styles from "./product-card.module.scss";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.wrapper}>
      <Link href={`/product/${product.slug}`}>
        <div>
          <Image src={product.images[0]} alt="" width="160" height="160" />
        </div>

        <div className={styles.content}>
          <h3>{`${product.brand} ${product.name}`}</h3>
          <p>{product.description}</p>
        </div>

        <div className={styles.content_second}>
          <p>text</p>
          <p className={styles.price}>€ {product.price}</p>
        </div>
      </Link>
    </article>
  );
}
