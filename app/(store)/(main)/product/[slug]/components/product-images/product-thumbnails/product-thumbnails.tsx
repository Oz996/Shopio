import { useState, useRef, useEffect } from "react";
import styles from "./product-thumbnails.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ProductThumbnailsProps {
  thumbnails: string[];
  handleDisplayImage: (index: number) => void;
}

export default function ProductThumbnails({
  thumbnails,
  handleDisplayImage,
}: ProductThumbnailsProps) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const { scrollWidth, clientWidth } = listRef.current;
      setIsAtEnd(scrollWidth <= clientWidth);
    }
  }, []);

  function handleScroll({ currentTarget }: React.UIEvent<HTMLUListElement>) {
    const { scrollWidth, scrollLeft, clientWidth } = currentTarget;

    setIsAtEnd(scrollWidth - scrollLeft < clientWidth + 10);
    setIsAtStart(scrollLeft < 10);
  }

  function scroll(direction: number) {
    listRef.current?.scrollBy({
      left: direction * (listRef.current.clientWidth - 120),
      behavior: "smooth",
    });
  }

  return (
    <div className={styles.thumbnail_wrapper}>
      {!isAtStart && (
        <>
          <div className={styles.shadow_left} />
          <button
            className={styles.arrow_left}
            disabled={isAtStart}
            onClick={() => scroll(-1)}
          >
            <ChevronLeft />
          </button>
        </>
      )}

      <ul className={styles.thumbnails} ref={listRef} onScroll={handleScroll}>
        {thumbnails.map((image, index) => (
          <li key={index} onClick={() => handleDisplayImage(index)}>
            <Image src={image} alt="" width={100} height={100} />
          </li>
        ))}
      </ul>

      {!isAtEnd && (
        <>
          <div
            className={`${styles.shadow_right} ${isAtEnd && styles.hidden}`}
          />
          <button
            className={styles.arrow_right}
            disabled={isAtEnd}
            onClick={() => scroll(1)}
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
}
