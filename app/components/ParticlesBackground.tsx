'use client';

export default function ParticlesBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-80"
      style={{
        background: `
          radial-gradient(circle at 16% 18%, rgba(56, 189, 248, 0.16), transparent 18%),
          radial-gradient(circle at 84% 12%, rgba(192, 132, 252, 0.12), transparent 20%),
          radial-gradient(circle at 72% 72%, rgba(45, 212, 191, 0.12), transparent 18%)
        `,
      }}
    />
  );
}
