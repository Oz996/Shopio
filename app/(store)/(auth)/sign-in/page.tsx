"use client";

import Link from "next/link";
import React, { useActionState } from "react";
import { authenticate } from "../actions";

export default function SignIn() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} noValidate>
      <h2>Sign in</h2>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      {errorMessage && <p>{errorMessage}</p>}

      <div>
        <span>
          Not a member yet? <Link href="/sign-up">Sign up</Link>
        </span>
      </div>

      <div>
        <button disabled={isPending}>Sign in</button>
        <button type="button">Enter as guest</button>
      </div>
    </form>
  );
}
