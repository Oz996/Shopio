import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createQueryString(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.push(`${pathname}?${params}`, { scroll: false });
  }

  function deleteQueryString(name: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);
    router.push(`${pathname}?${params}`, { scroll: false });
  }

  return {
    createQueryString,
    deleteQueryString,
  };
}
