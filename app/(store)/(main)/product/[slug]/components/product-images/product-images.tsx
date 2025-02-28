"use client";
import { Product } from "@prisma/client";
import styles from "./product-images.module.scss";
import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  product: Product;
}

export default function ProductImages({ product }: ProductImagesProps) {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  function handleDisplayImage(index: number) {
    setDisplayImage(product.images[index]);
  }

  return (
    <div className={styles.images}>
      <div className={styles.display}>
        <Image src={displayImage} alt="" fill />
      </div>

      <div className={styles.thumbnails}>
        {product?.thumbnails.map((image, index) => (
          <div key={index} onClick={() => handleDisplayImage(index)}>
            <Image src={image} alt="" width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
