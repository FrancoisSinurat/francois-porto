"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageLightboxProps = {
  images: string[];
  currentIndex: number;
  alt: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function ImageLightbox({
  images,
  currentIndex,
  alt,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const hasMultiple = images.length > 1;

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasMultiple) goPrev();
      if (e.key === "ArrowRight" && hasMultiple) goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, goPrev, goNext, hasMultiple]);

  const content = (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-[hsl(var(--hero-bg))]"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      {/* Backdrop click */}
      <button
        type="button"
        className="absolute inset-0 z-0"
        onClick={onClose}
        aria-label="Close preview"
      />

      {/* Top bar — overlay, tidak makan ruang vertikal */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-3 sm:px-5 py-3 bg-gradient-to-b from-[hsl(var(--hero-bg)/0.9)] to-transparent pointer-events-none">
        <p className="text-sm font-medium text-[hsl(var(--hero-muted))] pointer-events-auto">
          {hasMultiple ? `${currentIndex + 1} of ${images.length}` : "Preview"}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto flex items-center gap-2 rounded-lg bg-[hsl(222_20%_18%)] border border-[hsl(222_20%_26%)] px-3 py-2 text-sm text-[hsl(var(--hero-fg))] hover:bg-[hsl(222_20%_22%)] transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </div>

      {/* Gambar — full area */}
      <div
        className={cn(
          "relative z-10 flex-1 w-full min-h-0",
          hasMultiple ? "pb-[7.5rem] sm:pb-[8.5rem]" : "pb-4"
        )}
      >
        {hasMultiple && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[hsl(222_20%_16%)]/90 border border-[hsl(222_20%_26%)] text-[hsl(var(--hero-fg))] hover:bg-[hsl(222_20%_24%)] transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}

        <div className="absolute inset-0 px-11 sm:px-16">
          <Image
            src={images[currentIndex]}
            alt={`${alt} ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
            unoptimized={images[currentIndex].endsWith(".svg")}
          />
        </div>

        {hasMultiple && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[hsl(222_20%_16%)]/90 border border-[hsl(222_20%_26%)] text-[hsl(var(--hero-fg))] hover:bg-[hsl(222_20%_24%)] transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}
      </div>

      {/* Thumbnails — fixed bottom */}
      {hasMultiple && (
        <div className="absolute bottom-0 inset-x-0 z-30 px-3 sm:px-5 pb-4 pt-6 bg-gradient-to-t from-[hsl(var(--hero-bg))] via-[hsl(var(--hero-bg)/0.95)] to-transparent">
          <div className="flex justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-thin">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onNavigate(i)}
                aria-label={`View screenshot ${i + 1}`}
                className={cn(
                  "relative shrink-0 w-24 h-[4.5rem] sm:w-32 sm:h-20 rounded-lg overflow-hidden border-2 transition-all",
                  i === currentIndex
                    ? "border-[hsl(var(--accent))] opacity-100 ring-2 ring-[hsl(var(--accent)/0.3)]"
                    : "border-[hsl(222_20%_26%)] opacity-60 hover:opacity-90"
                )}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover object-top"
                  unoptimized={img.endsWith(".svg")}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-[11px] text-[hsl(var(--hero-muted))] mt-2 hidden sm:block">
            Arrow keys or tap thumbnails to navigate
          </p>
        </div>
      )}
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}
