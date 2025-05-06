import styles from "./submit-button.module.scss";
import { Loader } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean;
}

export default function SubmitButton({
  isPending,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <button {...props} disabled={isPending}>
      {isPending ? <Loader size={20} className={styles.spinner} /> : children}
    </button>
  );
}
