"use client";

import { useEffect, useRef } from "react";

/**
 * The drawing behind the home hero.
 *
 * The client renders this with three.js: a transparent WebGL canvas with seven
 * horizontal sine lines and fourteen drifting spheres, in violet, coral and
 * amber, at very low opacity (design-spec 3.23). Three.js for seven lines is
 * half a megabyte for a decoration, so this is the same picture in a 2D canvas:
 * the client's own camera, world coordinates, amplitudes, frequencies and
 * phases, rebuilt with `Math.sin` and `ctx.stroke`.
 *
 * The rules it keeps:
 *  - nothing moves under `prefers-reduced-motion`: one frame at t = 0, and no
 *    loop is ever started;
 *  - nothing is computed while the hero is off screen (IntersectionObserver);
 *  - the backing store is capped at 2x, so a 3x telephone does not paint nine
 *    times the pixels for a picture at 16% opacity;
 *  - it mounts after the page, carries `aria-hidden` and takes no pointer, so
 *    it is never the largest paint and never in the way.
 */

/** The client's three colours, cycled per line and per dot. */
const COLOURS = ["#6d4aff", "#ff6b4a", "#ffc94d"] as const;

const LINE_COUNT = 7;
const POINTS_PER_LINE = 61;
const DOT_COUNT = 14;

/**
 * The camera of the client's scene: fov 50 at z = 12, so the visible half
 * height at the front plane is `tan(25 degrees) * 12 = 5.6` world units. Every
 * number below is in those units, exactly as the client wrote them.
 */
const HALF_HEIGHT = 5.6;
const WAVE_NUMBER = 0.45;

type Dot = {
  colour: string;
  /** World radius, 0.07 to 0.13: about 3 to 6 pixels at a 560px hero. */
  radius: number;
  /** Where on its crossing the dot starts, 0 to 1. */
  offset: number;
  /** 0.3 to 0.7: one crossing every 40 to 90 seconds. */
  speed: number;
  y0: number;
  phase: number;
};

/**
 * The client seeds the dots with `Math.random()`, so the field changes on every
 * reload. A small linear congruential generator gives the same field every
 * time instead, which makes the hero identical in two screenshots and keeps a
 * visual diff honest.
 */
function makeDots(): Dot[] {
  let seed = 20260820;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  return Array.from({ length: DOT_COUNT }, (_, i) => ({
    colour: COLOURS[i % COLOURS.length],
    radius: 0.07 + random() * 0.06,
    offset: random(),
    speed: 0.3 + random() * 0.4,
    y0: -4.5 + random() * 9,
    phase: random() * Math.PI * 2,
  }));
}

export function HeroLines() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = makeDots();
    let width = 0;
    let height = 0;

    const draw = (seconds: number) => {
      if (width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);

      // The world is 11.2 units tall and maps onto the hero box; the width
      // follows the aspect ratio, so a wave keeps its length on every screen.
      const unit = height / (HALF_HEIGHT * 2);
      const halfWidth = HALF_HEIGHT * (width / height);

      // The client only ever drew this scene wide. On a telephone the hero is
      // taller than it is broad, so a dot sized off the height alone becomes a
      // ten pixel blob sitting on the h1. The dots therefore measure against
      // the narrower of the two, which leaves them a fine sprinkle on a
      // telephone and changes nothing at all on a laptop.
      const dotUnit = Math.min(height, width * 0.75) / (HALF_HEIGHT * 2);
      const toX = (x: number) => ((x + halfWidth) / (halfWidth * 2)) * width;
      const toY = (y: number) => height / 2 - y * unit;

      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.16;

      for (let i = 0; i < LINE_COUNT; i += 1) {
        const y0 = -4.5 + i * 1.5;
        const amplitude = 0.5 + (i % 3) * 0.3;
        const frequency = 0.25 + (i % 4) * 0.1;
        const phase = i * 1.1;

        ctx.beginPath();
        ctx.strokeStyle = COLOURS[i % COLOURS.length];

        for (let p = 0; p < POINTS_PER_LINE; p += 1) {
          const x = -halfWidth + (halfWidth * 2 * p) / (POINTS_PER_LINE - 1);
          const y =
            y0 +
            Math.sin(x * WAVE_NUMBER + seconds * frequency + phase) * amplitude;
          if (p === 0) ctx.moveTo(toX(x), toY(y));
          else ctx.lineTo(toX(x), toY(y));
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 0.5;

      for (const dot of dots) {
        const progress = (dot.offset + seconds * 0.036 * dot.speed) % 1;
        const x = -halfWidth + halfWidth * 2 * ((progress + 1) % 1);
        const y =
          dot.y0 +
          Math.sin(x * WAVE_NUMBER + seconds * dot.speed + dot.phase) * 0.8;

        ctx.beginPath();
        ctx.fillStyle = dot.colour;
        ctx.arc(toX(x), toY(y), dot.radius * dotUnit, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.round(box.width);
      height = Math.round(box.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();

    // One frame and no loop: the picture is there, and it holds still.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(0);
      const still = new ResizeObserver(() => {
        resize();
        draw(0);
      });
      still.observe(canvas);
      return () => still.disconnect();
    }

    let frame = 0;
    let last = 0;
    let visible = true;
    const start = performance.now();

    // 30fps is enough for a wave that takes eleven seconds to travel once.
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (now - last < 33) return;
      last = now;
      draw((now - start) / 1000);
    };

    const run = () => {
      if (frame === 0) frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      frame = 0;
    };

    const onScreen = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible) run();
        else stop();
      },
      { threshold: 0 },
    );
    onScreen.observe(canvas);

    const sized = new ResizeObserver(() => {
      resize();
      if (!visible) draw(0);
    });
    sized.observe(canvas);

    run();

    return () => {
      stop();
      onScreen.disconnect();
      sized.disconnect();
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      ref={ref}
    />
  );
}
