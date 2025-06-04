"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadLinksPreset } from "tsparticles-preset-links";

// Your brand colors
const BRAND_COLORS = ["#0b253f", "#05c8fb", "#d9d9d9"]; // navy, blue, light gray

export default function ParticlesBackground() {
  // Use callback to initialize with the links preset
  const particlesInit = useCallback(async (engine) => {
    await loadLinksPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "links",
        background: { color: { value: "transparent" } },
        fullScreen: { enable: true, zIndex: 0 }, // under content
        particles: {
          color: { value: BRAND_COLORS },
          links: {
            color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
            distance: 130,
            enable: true,
            opacity: 0.38,
            width: 1.5,
          },
          move: {
            enable: true,
            speed: 1.1,
            direction: "none",
            random: false,
            straight: false,
            outModes: "out",
            attract: { enable: false }
          },
          number: {
            value: 42,
            density: { enable: true, area: 900 }
          },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 2, max: 5 } },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: false }
          },
          modes: {
            repulse: { distance: 120, duration: 0.7 }
          }
        },
        detectRetina: true,
      }}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
      }}
    />
  );
}
