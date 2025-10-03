import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

/* ----- images ----- */
const images = [
  "https://cdn.thisiswhyimbroke.com/thumb/exploding-kittens-card-game_400x333.jpg",
  "https://i.ytimg.com/vi/-bfj3-wHhB0/maxresdefault.jpg",
  "https://i.ytimg.com/vi/0_sE0N2Wm64/maxresdefault.jpg",
  "https://normanshallmark.com/cdn/shop/files/EKORG1-image1_500_1080x.png?v=1698261182",
];

/* ----- reusable gallery (big on top + thumbs below + arrows + keyboard) ----- */
function Gallery({ images, altBase }: { images: string[]; altBase: string }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = images?.length ?? 0;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const scrollThumbs = (dx: number) => {
    trackRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  // keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  if (!images?.length) {
    return (
      <div
        className="w-[397px] h-[275px] shrink-0"
        style={{ background: "#262626" }}
      />
    );
  }

  /* sizes */
  const BIG_W = 397;
  const BIG_H = 275;
  const THUMB_W = 112; // tweak if you want
  const THUMB_H = 76;
  const GAP = 12;
  const STEP = THUMB_W + GAP;

  return (
    <div>
      {/* BIG image — solid rectangle (no radius), no arrows here */}
      <div
        className="relative shrink-0 flex justify-end items-center"
        style={{
          width: BIG_W,
          height: BIG_H,
          background: "#262626",
        }}
      >
        <img
          src={images[index]}
          alt={`${altBase} image ${index + 1}`}
          className="h-full w-full select-none object-cover"
        />
      </div>

      {/* THUMBS with overlay arrows on top of the strip */}
      <div className="relative mt-3" style={{ width: BIG_W }}>
        {/* thumbnails track */}
        <div
          ref={trackRef}
          className="flex w-full gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                className="relative shrink-0"
                style={{
                  width: THUMB_W,
                  height: THUMB_H,
                  outline: active ? "2px solid hsl(var(--bb-orange))" : "none",
                }}
              >
                <img
                  src={src}
                  alt={`${altBase} thumbnail ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>

        {/* left overlay arrow (on top of thumbs) */}
        <button
          type="button"
          onClick={() => {
            prev();
            scrollThumbs(-STEP);
          }}
          aria-label="Previous image"
          className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center gap-[10px] p-[10px]"
          style={{ background: "rgba(0,0,0,.5)" }}
        >
          {/* same SVG you provided, flipped horizontally */}
          <svg
            width="7"
            height="14"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "scaleX(-1)" }}
          >
            <path
              d="M1 1L8 8L1 15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* right overlay arrow (on top of thumbs) */}
        <button
          type="button"
          onClick={() => {
            next();
            scrollThumbs(STEP);
          }}
          aria-label="Next image"
          className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center gap-[10px] p-[10px]"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <svg width="7" height="14" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1L8 8L1 15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}



/* ----- page ----- */
export default function DetailPage() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
        {/* LEFT: use the Gallery (replaces your old manual image block) */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="w-full max-w-[397px]">
            <Gallery images={images} altBase="Exploding Kittens" />
          </div>
        </div>

        {/* RIGHT: keep your existing content */}
        <div className="flex flex-col">
          <div className="mb-4 flex flex-wrap items-baseline gap-3">
            <h1 className="font-noto text-4xl font-bold text-bb-orange md:text-5xl">Exploding Kittens</h1>
            <span className="font-noto text-2xl font-bold md:text-3xl">(2015)</span>
          </div>

          <p className="font-noto text-xl font-semibold text-white">
            Ask for favors, attack friends, see the future- whatever it takes to avoid exploding!
          </p>

          <div className="mt-8 flex items-center gap-2 font-noto">
            <span className="text-xl font-semibold text-bb-orange">Ratings:</span>
            <div className="flex items-center gap-2">
              <svg width="23" height="22" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.18857 9.97184C0.821979 9.63179 1.02111 9.01703 1.51696 8.95806L8.54286 8.12216C8.74495 8.09812 8.92048 7.97083 9.00572 7.78547L11.9691 1.34114C12.1783 0.886343 12.8229 0.886256 13.032 1.34106L15.9954 7.78534C16.0807 7.97069 16.2551 8.09833 16.4572 8.12237L23.4834 8.95806C23.9793 9.01703 24.1779 9.63197 23.8113 9.97202L18.6174 14.7908C18.468 14.9293 18.4015 15.1356 18.4412 15.3359L19.8196 22.2966C19.9169 22.7878 19.3957 23.1684 18.96 22.9238L12.7863 19.4566C12.6088 19.3569 12.393 19.3573 12.2154 19.457L6.04114 22.9229C5.60543 23.1676 5.08326 22.7878 5.18057 22.2965L6.55923 15.3363C6.59889 15.1361 6.53254 14.9293 6.38313 14.7907L1.18857 9.97184Z"
                  fill="#F97316"
                  stroke="#F97316"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xl font-semibold">6.1</span>
            </div>
          </div>

          <div className="mt-6 space-y-3 font-noto text-xl">
            <div className="flex flex-wrap gap-2">
              <span className="font-semibold text-bb-orange">Alternate Names:</span>
              <span>Eksplodujące Kotki: Frywolne Kotki, Eksplozivni mačići: Gologuzi mačići, Výbušná koťátka: Strakatá koťátka</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="font-semibold text-bb-orange">Designer:</span>
              <span>Eksplodujące Kotki: Frywolne Kotki, Eksplozivni mačići: Gologuzi mačići, Výbušná koťátka: Strakatá koťátka</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="font-semibold text-bb-orange">Artist:</span>
              <span>Matthew Inman, Elan Lee, Shane Small</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="font-semibold text-bb-orange">Publisher:</span>
              <span>(Self-Published), Ad Magic, Inc. (AdMagic Games)</span>
              <a href="#" className="underline transition-colors hover:text-bb-orange">+ 5 more</a>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="mb-6 space-y-4">
          <h2 className="font-noto text-4xl font-bold">Description</h2>
          <div className="accent-line bg-bb-orange w-full" />
        </div>
        <p className="font-noto text-xl leading-relaxed text-white">
          Exploding Kittens is a kitty-powered version of Russian Roulette. Players take turns drawing cards until
          someone draws an exploding kitten and loses the game. The deck is made up of cards that let you avoid
          exploding by peeking at cards before you draw, forcing your opponent to draw multiple cards, or shuffling the
          deck.
          <br /><br />
          The game gets more and more intense with each card you draw because fewer cards left in the deck means a
          greater chance of drawing the kitten and exploding in a fiery ball of feline hyperbole.
        </p>
      </section>

      <section>
        <div className="mb-6 space-y-4">
          <h2 className="font-noto text-4xl font-bold">Official Links</h2>
          <div className="accent-line bg-bb-orange w-full" />
        </div>
        <div className="flex items-start gap-3">
          <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="mt-1 h-5 w-5"
          >
        <path
          d="M6.62198 13.3785L13.3785 6.62237M4.08873 9.15565L2.3996 10.8447C0.533829 12.7103 0.533288 15.7354 2.39905 17.601C4.26482 19.4667 7.29073 19.4661 9.15649 17.6005L10.8438 15.9116M9.15541 4.08811L10.8445 2.39907C12.7103 0.53342 15.735 0.533753 17.6007 2.39941C19.4665 4.26506 19.4664 7.28991 17.6006 9.15556L15.9124 10.8445"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
          </svg>
          <a
        href="https://www.explodingkittens.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-noto text-xl font-semibold underline transition-colors hover:text-bb-orange"
          >
        Exploding Kittens: Streaking Kittens Expansion - Exploding Kittens Inc.(www.explodingkittens.com)
          </a>
        </div>
      </section>
    </div>
  );
}
