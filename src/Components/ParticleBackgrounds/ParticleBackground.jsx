import { useEffect, useRef } from "react";
import "./Particles.css";

function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    /* ---------- Resize ---------- */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ---------- Mouse Tracking (subtle attraction) ---------- */
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    /* ---------- Particle Class ---------- */
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.5 + 0.4;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Soft mouse attraction
        if (mouseRef.current.x !== null) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            this.x -= dx * 0.002;
            this.y -= dy * 0.002;
          }
        }

        if (
          this.x < -50 ||
          this.x > canvas.width + 50 ||
          this.y < -50 ||
          this.y > canvas.height + 50
        ) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 245, 208, ${this.opacity})`;
        ctx.shadowColor = "#38f5d0";
        ctx.shadowBlur = 12;
        ctx.fill();
      }
    }

    /* ---------- Init Particles ---------- */
    const PARTICLE_COUNT = Math.min(150, Math.floor(window.innerWidth / 10));
    particlesRef.current = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlesRef.current.push(new Particle());
    }

    /* ---------- Animation Loop ---------- */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.update();
        p.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    /* ---------- Cleanup ---------- */
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}

export default ParticleBackground;
