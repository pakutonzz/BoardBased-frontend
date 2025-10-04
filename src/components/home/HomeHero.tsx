import React from 'react'

type Slide = { src: string; alt?: string }

const slides: Slide[] = [
  { src: '/home/hero/1.png', alt: 'Hero 1' },
  { src: '/home/hero/2.png', alt: 'Hero 2' },
  { src: '/home/hero/3.png', alt: 'Hero 3' },
  { src: '/home/hero/4.png', alt: 'Hero 4' },
  { src: '/home/hero/5.png', alt: 'Hero 5' },
]

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[420px] md:h-[500px] lg:h-[631px] rounded-lg overflow-hidden">
      {/* Images */}
      {slides.map((img, idx) => (
        <img
          key={idx}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            idx === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentSlide ? "bg-white/40" : "bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
