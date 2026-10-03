"use client";
import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const brands = [
  { src: "dresser rand.png", alt: "Dresser Rand" },
  { src: "jenbacher.png", alt: "Jenbacher" },
  { src: "cummins.png", alt: "Cummins" },
  { src: "ajax.png", alt: "Ajax" },
  { src: "ariel.png", alt: "Ariel" },
  { src: "mtu.png", alt: "MTU" },
  { src: "perkins.png", alt: "Perkins" },
  { src: "volvo.png", alt: "Volvo" },
  { src: "cooper.png", alt: "Cooper" },
  { src: "cat.png", alt: "Cat" },
  { src: "waukesha.png", alt: "Waukesha" },
];

// Fixed positions (percent of container) around the center title,
// tuned for wide desktop/tablet viewports.
const layout = [
  { top: 18 - 6, left: 15, size: 120, floatDur: 6.5 },
  { top: 62 - 6, left: 10, size: 120, floatDur: 7.5 },

  { top: 24 - 6, left: 30, size: 60, floatDur: 5.5 },
  { top: 78 - 6, left: 24, size: 80, floatDur: 8 },

  { top: 14 - 6, left: 40, size: 120, floatDur: 6 },
  { top: 82 - 6, left: 40, size: 80, floatDur: 6.8 },

  { top: 16 - 6, left: 60, size: 120, floatDur: 7.2 },
  { top: 79 - 6, left: 62, size: 60, floatDur: 5.8 },

  { top: 24 - 6, left: 74, size: 120, floatDur: 7.8 },
  { top: 62 - 6, left: 88, size: 60, floatDur: 6.2 },

  { top: 42 - 6, left: 80, size: 120, floatDur: 7 },
];

const mobileLayout = [
  { top: 29, left: 74, size: 80, floatDur: 7.8 },
  { top: 22, left: 40, size: 80, floatDur: 5.8 },
  { top: 4 + 5, left: 45, size: 40, floatDur: 7.2 },
  { top: 4 + 12, left: 80, size: 60, floatDur: 6 },

  { top: 29, left: 4, size: 80, floatDur: 5.5 },
  { top: 4 + 12, left: 6, size: 40, floatDur: 6.5 },

  { top: 78 - 12, left: 8, size: 80, floatDur: 6.8 },
  { top: 78 - 12, left: 40 + 5, size: 40, floatDur: 5.9 },
  { top: 78 - 12, left: 66 + 10, size: 80, floatDur: 7.4 },

  { top: 91 - 12, left: 24 + 5, size: 40, floatDur: 6.3 },
  { top: 91 - 12, left: 54 + 10, size: 80, floatDur: 7 },
];

const REPEL_RADIUS = 26;
const REPEL_STRENGTH = 46;

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

function FloatingBrand({
  brand,
  pos,
  index,
  mouse,
}: {
  brand: (typeof brands)[number];
  pos: (typeof layout)[number];
  index: number;
  mouse: { x: number; y: number; active: boolean } | null;
}) {
  let offsetX = 0;
  let offsetY = 0;

  if (mouse?.active) {
    const dx = pos.left - mouse.x;
    const dy = pos.top - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < REPEL_RADIUS) {
      const force = (1 - distance / REPEL_RADIUS) * REPEL_STRENGTH;
      const angle = Math.atan2(dy, dx);
      offsetX = Math.cos(angle) * force;
      offsetY = Math.sin(angle) * force;
    }
  }

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: offsetX,
        y: offsetY,
      }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.12 },
        scale: { duration: 0.6, delay: index * 0.12 },
        x: { type: "spring", stiffness: 120, damping: 14, mass: 0.5 },
        y: { type: "spring", stiffness: 120, damping: 14, mass: 0.5 },
      }}
    >
      {/* Continuous idle float, independent of mouse */}
      <motion.img
        src={`../assets/brands/${brand.src}`}
        alt={brand.alt}
        draggable="false"
        className="object-contain brightness-[1.15] grayscale-30 md:grayscale-0 brightness-[1.15] opacity-70 select-none"
        style={{ width: pos.size, height: "auto" }}
        animate={{
          y: [0, -14, 0, 10, 0],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: pos.floatDur,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.15,
        }}
      />
    </motion.div>
  );
}

function BrandsIndustrial() {
  const [mouse, setMouse] = useState<{
    x: number;
    y: number;
    active: boolean;
  } | null>(null);
  const isMobile = useIsMobile();
  const activeLayout = isMobile ? mobileLayout : layout;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y, active: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse((m) => (m ? { ...m, active: false } : m));
  }, []);

  return (
    <section
      id="brands"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-section relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background video (moved here from old Hero) */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/assets/industrial.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-section__video-shade absolute inset-0" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      <div className="absolute inset-0 z-[5] top-16 h-[calc(100%-64px)] md:top-28 md:h-[calc(100%-112px)]">
        {brands.map((brand, i) => (
          <FloatingBrand
            key={brand.src}
            brand={brand}
            pos={activeLayout[i % activeLayout.length]}
            index={i}
            mouse={mouse}
          />
        ))}
      </div>

      {/* Center title — offset down to clear the fixed navbar */}
      <div className="relative z-10 w-full flex flex-col items-center text-center section-padding">
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[45px] md:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white"
        >
          <span className="gradient-text-blue">LMF</span>
          <br />
          <span className="text-white whitespace-nowrap">
            <span className="gradient-text-blue">I</span>ndustrial <span className="gradient-text-blue">S</span>upply
          </span>
          <br />
          <span className="text-[#fc0000]"> LLC</span>
        </motion.h1>
      </div>
    </section>
  );
}

export default BrandsIndustrial;
