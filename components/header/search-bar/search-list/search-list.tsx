import { Product } from "@prisma/client";
import styles from "./search-list.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import SearchListSkeleton from "./search-list-skeleton/search-list-skeleton";

interface SearchListProps {
  products: Product[] | undefined;
  isLoading: boolean;
}

export default function SearchList({ products, isLoading }: SearchListProps) {
  if (isLoading)
    return (
      <SearchListDiv>
        <SearchListSkeleton />
      </SearchListDiv>
    );

  if (products?.length === 0)
    return (
      <SearchListDiv>
        <div className={styles.no_results}>
          <span>No Results</span>
        </div>
      </SearchListDiv>
    );

  return (
    <SearchListDiv>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <Link href={`http://localhost:3000/product/${product.slug}`}>
              <div className={styles.image_wrapper}>
                <Image src={product.thumbnails[0]} alt="" fill />
              </div>

              <div className={styles.content}>
                <span
                  className={styles.title}
                >{`${product.brand} ${product.name}`}</span>
                <span className={styles.description}>
                  {product.description}
                </span>
              </div>

              <span className={styles.price}>€{product.price}</span>
            </Link>
          </li>
        ))}
      </ul>
    </SearchListDiv>
  );
}

function SearchListDiv({ children }: { children: ReactNode }) {
  return <div className={styles.search_results}>{children}</div>;
}
