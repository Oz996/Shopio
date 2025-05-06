"use client";

import styles from "../auth.module.scss";
import Link from "next/link";
import { useActionState, useState } from "react";
import { authenticate } from "../actions";
import SubmitButton from "../../(main)/home/components/submit-button/submit-button";
import { signIn } from "@/auth";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const router = useRouter();

  async function guestSignIn() {
    try {
      setIsLoading(true);
      await signIn("credentials", {
        email: "guest@mail.com",
        password: "test123",
        redirect: false,
      });
      router.push("/home");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <form action={formAction} noValidate>
      <h2>Sign in</h2>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={state?.data}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      {state?.error && (
        <div className={`${styles.error} ${styles.center}`}>
          <span>{state?.error}</span>
        </div>
      )}

      <div>
        <span>
          Not a member yet? <Link href="/sign-up">Sign up</Link>
        </span>
      </div>

      <div>
        <SubmitButton isPending={isPending}>Sign in</SubmitButton>
        <SubmitButton isPending={isLoading} onClick={guestSignIn} type="button">
          Enter as guest
        </SubmitButton>
      </div>
    </form>
  );
}
