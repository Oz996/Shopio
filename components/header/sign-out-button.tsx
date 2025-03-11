"use client";

import { signOut } from "@/auth";

export default function SignOutButton() {
  return (
    <span role="button" onClick={() => signOut()}>
      Sign Out
    </span>
  );
}
