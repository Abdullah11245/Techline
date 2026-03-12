'use client';

import { useEffect, useRef } from "react";

type Ripple = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
};

export default function PixelCanvasBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // ✅ prevent null crash

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // ✅ Resize canvas properly
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ✅ Add ripple on click
    const handleClick = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        alpha: 0.5, // initial opacity
      });
    };
    canvas.addEventListener("click", handleClick);

    // ✅ Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripplesRef.current.forEach((ripple, index) => {
        ripple.radius += 2;             // speed of ripple expansion
        ripple.alpha -= 0.003;          // slower fade for smoothness

        if (ripple.alpha <= 0) {
          ripplesRef.current.splice(index, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);

        // ✅ Soft light-blue ripple
        ctx.strokeStyle = `rgba(120, 180, 255, ${ripple.alpha * 0.6})`;
        ctx.lineWidth = 1.5;

        // ✅ Glow effect
        ctx.shadowColor = "rgba(120, 180, 255, 0.4)";
        ctx.shadowBlur = 12;

        ctx.stroke();

        // Reset shadow for next draw
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // ✅ Cleanup (VERY IMPORTANT)
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0" // ✅ ensure canvas is behind content but visible
    />
  );
}