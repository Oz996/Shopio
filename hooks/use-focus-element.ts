import { usePathname } from "next/navigation";
import { RefObject, useEffect } from "react";

export default function useFocusElement(elementRef: RefObject<any>) {
  const pathname = usePathname();

  useEffect(() => {
    elementRef.current?.focus();
  }, [pathname]);
}
