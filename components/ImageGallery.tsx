"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  name: string;
}

export default function ImageGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="relative h-72 md:h-96 bg-gray-100">
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 p-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                active === i ? "border-primary" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`${name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
