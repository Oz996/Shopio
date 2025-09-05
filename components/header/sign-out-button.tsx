import { signOut } from "@/auth";

export default function SignOutButton() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
