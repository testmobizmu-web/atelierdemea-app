// src/components/home/HeroVisualGrid.tsx
import Image from "next/image";

const HERO_IMAGES = [
  "/hero/hero1.jpg",
  "/hero/hero2.jpg",
  "/hero/hero3.jpg",
  "/hero/hero4.jpg",
];

export default function HeroVisualGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="relative h-[190px] sm:h-[220px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#fb7185] to-[#ec4899]"
        >
          <Image
            src={src}
            alt={`Atelier de Méa hero visual ${i + 1}`}
            fill
            priority={i === 0}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
