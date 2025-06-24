import styles from "./cart.module.scss";
import SubmitButton from "@/app/(store)/(main)/home/components/submit-button/submit-button";
import { submitOrderAction } from "@/app/actions/order-actions";
import { useCart } from "@/hooks/use-cart";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

interface ConfirmPurchaseProps {
  closeCart: () => void;
}

export default function ConfirmPurchase({ closeCart }: ConfirmPurchaseProps) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const { cart, clearCart } = useCart();

  function handleOrderSubmit() {
    startTransition(async () => {
      const res = await submitOrderAction(undefined, cart);

      if (res.error) {
        setError(res.error);
      } else {
        toast.success("Order has been placed");
        closeCart();
        clearCart();
      }
    });
  }

  return (
    <>
      <SubmitButton isPending={isPending} onClick={handleOrderSubmit}>
        Confirm purchase
      </SubmitButton>
      {error && (
        <div className={styles.error}>
          <span>{error}</span>
        </div>
      )}
    </>
  );
}
