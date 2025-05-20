import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useRoute() {
  const [url, setUrl] = useState<URL>();

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      setUrl(currentUrl);
    }
  }, []);

  function handleRoute() {
    return router.push(url?.toString() as string, { scroll: false });
  }

  return {
    url,
    setUrl,
    handleRoute,
  };
}
