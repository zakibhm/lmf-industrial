"use client";

import { useEffect, useRef } from "react";

export default function CursorParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    const createParticle = () => {
      if (!containerRef.current) return;

      // Only create particles when the cursor is actually moving
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0.5) {
        // MANY particles
        for (let i = 0; i < 5; i++) {
          const particle = document.createElement("div");

          const size = Math.random() * 2.5 + 0.5;

          particle.style.position = "fixed";
          particle.style.left = `${mouse.current.x}px`;
          particle.style.top = `${mouse.current.y}px`;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.borderRadius = "50%";
          particle.style.background = "rgba(249, 134, 57, 0.7)";
          particle.style.pointerEvents = "none";
          particle.style.zIndex = "100000";
          particle.style.boxShadow = "0 0 6px rgba(249, 134, 57, 0.5)";

          containerRef.current.appendChild(particle);

          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 35 + 5;

          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;

          particle.animate(
            [
              {
                transform: "translate(-50%, -50%) scale(1)",
                opacity: "0.7",
              },
              {
                transform: `translate(
                  calc(-50% + ${x}px),
                  calc(-50% + ${y}px)
                ) scale(0)`,
                opacity: "0",
              },
            ],
            {
              duration: 700 + Math.random() * 500,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
          ).onfinish = () => {
            particle.remove();
          };
        }

        lastMouse.current.x = mouse.current.x;
        lastMouse.current.y = mouse.current.y;
      }

      animationFrame.current = requestAnimationFrame(createParticle);
    };

    animationFrame.current = requestAnimationFrame(createParticle);

    return () => {
      window.removeEventListener("mousemove", move);

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[100000]"
    />
  );
}
