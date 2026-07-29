import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";

const IMAGES = [
  { src: g1, alt: "Bridal makeup" },
  { src: g2, alt: "Bridal hairstyle" },
  { src: g3, alt: "Mehndi design" },
  { src: g4, alt: "Parlour interior" },
  { src: g5, alt: "Party makeup" },
  { src: g6, alt: "Saree draping" },
];

export function AutoCarousel() {
  const loop = [...IMAGES, ...IMAGES];
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex gap-6 animate-marquee w-max">
        {loop.map((img, i) => (
          <figure
            key={i}
            className="relative h-72 w-[22rem] shrink-0 overflow-hidden rounded-lg border border-[color:var(--gold-soft)] shadow-sm"
          >
            <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--gold)]/20" />
          </figure>
        ))}
      </div>
    </div>
  );
}