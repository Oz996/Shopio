"use client";
import { Search } from "lucide-react";
import styles from "./header.module.scss";
import Link from "next/link";
import ProductsNavbar from "./products-navbar";
import HeaderMobile from "./header-mobile";
import SignOutButton from "./sign-out-button";
import { Session } from "next-auth";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { searchProducts } from "./client-api";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

interface HeaderProps {
  authorized: Session | null;
}
const queryClient = new QueryClient();

export default function Header({ authorized }: HeaderProps) {
  const [value, setValue] = useState("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["search"],
    queryFn: searchProducts,
    enabled: !!value,
  });

  console.log(products);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <header className={styles.header}>
          <div className={styles.header_wrapper}>
            <div className={styles.logo}>
              <Link href="/home">
                <h2>Shopio</h2>
              </Link>
            </div>
            <nav className={styles.nav}>
              <div className={styles.input_div}>
                <input
                  type="text"
                  value={value}
                  onChange={handleSearch}
                  placeholder="Search for products"
                  className={styles.input}
                />
                <Search className={styles.icon_search} size={20} />

                <div className={styles.search_results}>
                  <ul>
                    {products?.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`http://localhost:3000/product/${product.slug}`}
                        >
                          <div className={styles.image_wrapper}>
                            <Image src={product.thumbnails[0]} alt="" fill />
                          </div>
                          <div className={styles.content}>
                            <span>{product.name}</span>
                            <span className={styles.description}>
                              {product.description}
                            </span>
                          </div>
                          <span className={styles.price}>€{product.price}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <ProductsNavbar />

              <div className={styles.nav_item}>
                {authorized ? (
                  <SignOutButton />
                ) : (
                  <Link href="/sign-in">Sign Up / Login</Link>
                )}
              </div>
            </nav>
          </div>
        </header>

        <HeaderMobile authorized={authorized} />
      </QueryClientProvider>
    </>
  );
}
