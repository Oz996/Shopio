"use client";

import { RefObject, SetStateAction, useEffect } from "react";

export default function useClickOutside(
  elementRef: RefObject<any>,
  reset: () => void
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(e.target as Node)
      ) {
        reset();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}
