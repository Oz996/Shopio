"use client";

import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./styles.scss";
import Link from "next/link";
import { carouselContent } from "./carousel-content";

export default function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 15,
      origin: "center",
    },
    drag: false,
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    // breakpoints: {
    //   "(max-width: 1024px)": {
    //     slides: {
    //       perView: 1,
    //     },
    //   },
    // },
  });

  // useEffect(() => {
  //   const slider = instanceRef.current;
  //   if (!slider) return;

  //   const interval = setInterval(() => {
  //     slider.next();
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, [instanceRef]);

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {carouselContent.map((content, index) => (
            <div
              key={index}
              className={`keen-slider__slide number-slide${index + 1}`}
              style={{ backgroundImage: `url("${content.image}")` }}
            >
              <div>
                <h2>{content.title}</h2>
                <p>{content.description}</p>
                <Link href={`/products/${content.link}`}>Start Browsing</Link>
              </div>
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
    </>
  );
}

function Arrow(props: any) {
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left" : "arrow--right"}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
