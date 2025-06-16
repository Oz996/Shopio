"use client";

import useClickOutside from "@/hooks/use-click-outside";
import styles from "./cart.module.scss";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBasket } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartRef = useRef<HTMLDivElement>(null);

  useClickOutside(cartRef, () => setIsOpen(false));

  const { cart, removeFromCart } = useCart();

  return (
    <div className={styles.container}>
      <button onClick={() => setIsOpen(true)}>
        {isMounted && cart.length > 0 && (
          <div className={styles.amount}>
            <span>{cart.length}</span>
          </div>
        )}

        <ShoppingBasket strokeWidth={1.6} />
      </button>

      {isOpen && (
        <div className={styles.cart} ref={cartRef}>
          {cart.map((product) => (
            <div key={product.id} className={styles.cart_item}>
              <div className={styles.image_wrapper}>
                <Image src={product.thumbnails[0]} alt="" fill />
              </div>

              <span>
                {product.brand} {product.name}
              </span>

              <div className={styles.cart_end}>
                <div className={styles.product_amount}>
                  <button>-</button>
                  <input type="text" defaultValue={product.quantity} />
                  <button>+</button>
                </div>

                <div>
                  <button
                    onClick={() => removeFromCart(product)}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
