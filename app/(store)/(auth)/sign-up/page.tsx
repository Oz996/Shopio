"use client";

import styles from "../auth.module.scss";
import Link from "next/link";
import { useActionState } from "react";
import { signUp } from "../actions";
import SubmitButton from "../../(main)/home/components/submit-button/submit-button";

export default function SignUp() {
  const [state, formAction, isPending] = useActionState(signUp, undefined);

  return (
    <form action={formAction} noValidate>
      <h2>Sign up</h2>

      <div>
        <label htmlFor="name">Username (optional)</label>
        <input type="text" name="name" id="name" />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <div>
        <label htmlFor="cPassword">Confirm password</label>
        <input type="password" name="cPassword" id="cPassword" />
      </div>

      {state?.errors && (
        <div className={styles.error}>
          {state.errors.map((error, index) => (
            <span key={index}>{error.message}</span>
          ))}
        </div>
      )}

      <div>
        <span>
          Already a member? <Link href="/sign-in">Sign in</Link>
        </span>
      </div>

      <div>
        <SubmitButton isPending={isPending}>Sign up</SubmitButton>
      </div>
    </form>
  );
}
