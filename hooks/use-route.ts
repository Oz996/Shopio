import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createQueryString(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (name === "price") {
      params.set(name, value);
    } else {
      params.append(name, value);
    }

    router.push(`${pathname}?${params}`, { scroll: false });
  }

  function deleteQueryString(name: string, value?: string) {
    const params = new URLSearchParams(searchParams.toString());
    const keys = params.getAll(name);

    if (keys.length > 1) {
      params.delete(name, value);
    } else {
      params.delete(name);
    }

    router.push(`${pathname}?${params}`, { scroll: false });
  }

  return {
    createQueryString,
    deleteQueryString,
  };
}
