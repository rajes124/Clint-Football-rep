import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate star/gold particles
    const list: Particle[] = [];
    const colors = ["#fcd116", "#00933b", "#002776", "#ffffff"];
    for (let i = 0; i < 30; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 10 + 5,
      });
    }
    setParticles(list);

    // Track mouse coordinates for the mouse glow effect
    const trackMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", trackMouse);
    return () => window.removeEventListener("mousemove", trackMouse);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Mouse Glow Effect */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 filter blur-[120px] transition-transform duration-100 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: "radial-gradient(circle, rgba(252,209,22,0.4) 0%, rgba(0,147,59,0.2) 50%, rgba(5,22,11,0) 100%)",
        }}
      />

      {/* Floating Stadium Lights Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-brazil-green/10 rounded-full filter blur-[150px] animate-stadium-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-brazil-yellow/5 rounded-full filter blur-[150px] animate-stadium-glow" style={{ animationDelay: "3s" }} />

      {/* Scattered Floating Micro-Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{
            y: ["0px", "-40px", "0px"],
            x: ["0px", "30px", "0px"],
            opacity: [0.1, 0.7, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
