"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadLinksPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = {
    preset: "links",
    background: {
      color: {
        value: "transparent", // شفاف باشد تا رنگ زمینه صفحه دیده شود
      },
    },
    particles: {
      color: {
        value: "#6366f1", // رنگ ایندیگو (سرمه‌ای روشن) برای دیده شدن روی سفید
      },
      links: {
        color: "#6366f1", // رنگ خطوط اتصال
        opacity: 0.3,     // شفافیت ملایم
        distance: 150,
        enable: true,
      },
      number: {
        value: 60, // تعداد مناسب برای تم روشن
      },
      move: {
        enable: true,
        speed: 1, // سرعت ملایم‌تر
      },
      size: {
        value: { min: 1, max: 2 },
      },
      opacity: {
          value: 0.6
      }
    },
    detectRetina: true,
  };

  if (!init) return null;

  return (
    <div className="absolute inset-0 -z-0 h-full w-full pointer-events-none">
      <Particles
        id="tsparticles"
        options={options}
        className="h-full w-full"
      />
    </div>
  );
}