"use client";

import useClickOutside from "@/hooks/use-click-outside";
import styles from "./cart.module.scss";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBasket, Truck, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Product } from "@prisma/client";
import Link from "next/link";
import ConfirmPurchase from "./confirm-purchase";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartRef = useRef<HTMLDivElement>(null);

  useClickOutside(cartRef, () => setIsOpen(false));

  const {
    cart,
    clearCart,
    setQuantity,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  const [amounts, setAmounts] = useState([{ id: "", amount: 0 }]);

  useEffect(() => {
    setAmounts(
      cart.map((product) => ({ id: product.id, amount: product.quantity }))
    );
  }, [cart]);

  const total = cart.reduce((a, b) => b.price * b.quantity + a, 0);

  return (
    <div className={styles.container}>
      <button onClick={() => setIsOpen(true)} aria-label="Open cart">
        {isMounted && cart.length > 0 && (
          <div className={styles.amount}>
            <span>{cart.length}</span>
          </div>
        )}

        <ShoppingBasket strokeWidth={1.6} />
      </button>

      {isOpen && cart.length > 0 && (
        <>
          <div className={styles.overlay} />

          <div className={styles.cart} ref={cartRef}>
            <div className={styles.header}>
              <h2>Cart</h2>
              <button onClick={closeCart} aria-label="Close cart">
                <X size={22} />
              </button>
            </div>

            {cart.map((product) => (
              <div key={product.id} className={styles.cart_item}>
                <div className={styles.image_wrapper}>
                  <Image src={product.thumbnails[0]} alt="" fill />
                </div>

                <Link
                  href={`http://localhost:3000/product/${product.slug}`}
                  onClick={closeCart}
                >
                  {product.brand} {product.name}
                </Link>

                <div className={styles.item_end}>
                  <div>
                    <span>€ {product.price}</span>
                  </div>

                  <div className={styles.item_end_div}>
                    <div className={styles.product_amount}>
                      <button onClick={() => decrementQuantity(product)}>
                        -
                      </button>

                      <input
                        type="number"
                        value={displayAmount(product)}
                        onChange={(e) => setAmount(e, product)}
                      />

                      <button onClick={() => incrementQuantity(product)}>
                        +
                      </button>
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
              </div>
            ))}

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>{`Total: € ${total}`}</span>

                {total > 500 && (
                  <div>
                    <Truck size={18} />
                    <span> Free delivery available</span>
                  </div>
                )}
              </div>

              <div className={styles.confirm}>
                <ConfirmPurchase closeCart={closeCart} />
              </div>

              <button onClick={clearCart}>Clear cart</button>
            </div>
          </div>
        </>
      )}

      {isOpen && cart.length === 0 && (
        <>
          <div className={styles.overlay} />

          <div className={styles.cart} ref={cartRef}>
            <div className={styles.header}>
              <h2>Cart</h2>
              <button onClick={() => setIsOpen(false)} aria-label="Close cart">
                <X />
              </button>
            </div>

            <span>Cart is empty</span>
          </div>
        </>
      )}
    </div>
  );

  function displayAmount(product: Product) {
    const prod = amounts.find((item) => item.id === product.id);
    if (prod) return prod.amount;
  }

  function setAmount(e: ChangeEvent<HTMLInputElement>, product: Product) {
    const value = Number(e.target.value);

    if (value <= 0) {
      return removeFromCart(product);
    }

    setQuantity(product, value);
  }

  function closeCart() {
    setIsOpen(false);
  }
}
