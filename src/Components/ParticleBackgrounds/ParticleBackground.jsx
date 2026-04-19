import { useEffect, useRef } from "react";
import "./Particles.css";

/**
 * ParticleBackground - Optimized for Portfolio Performance
 * Props:
 * - primaryColor: string (hex) - Main particle color (default: '#38f5d0')
 * - secondaryColor: string (hex) - Connection line color (default: '#7c3aed')
 * - density: number - Particles per 100px width (default: 12, range: 5-20)
 * - maxParticles: number - Absolute cap (default: 150)
 * - enableConnections: boolean - Draw lines between particles (default: true)
 * - connectionDistance: number - Max distance for connections (default: 100)
 * - enableMouseInteraction: boolean - Particles react to mouse (default: true)
 * - blendMode: string - CSS blend mode (default: 'screen')
 */
function ParticleBackground({
  primaryColor = "#38f5d0",
  secondaryColor = "#7c3aed",
  density = 12,
  maxParticles = 150,
  enableConnections = true,
  connectionDistance = 100,
  enableMouseInteraction = true,
  blendMode = "screen"
} = {}) {
  
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 120 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    
    // 🚫 Disable animations if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    
    // Adjust settings for mobile/performance
    const effectiveDensity = isMobile ? Math.max(5, density * 0.6) : density;
    const effectiveMax = isMobile ? Math.min(80, maxParticles * 0.6) : maxParticles;
    const PARTICLE_COUNT = Math.min(
      effectiveMax, 
      Math.floor((window.innerWidth / 100) * effectiveDensity)
    );

    /* ---------- Resize Handler ---------- */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // ⚡ Limit DPR for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ---------- Mouse/Touch Tracking ---------- */
    const handleMouseMove = (e) => {
      if (!enableMouseInteraction) return;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (!enableMouseInteraction || !e.touches?.[0]) return;
      mouseRef.current.x = e.touches[0].clientX;
      mouseRef.current.y = e.touches[0].clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    /* ---------- Parse Colors for Canvas ---------- */
    const parseColor = (hex, alpha = 1) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    /* ---------- Particle Class ---------- */
    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = initial ? Math.random() * window.innerWidth : (Math.random() < 0.5 ? -10 : window.innerWidth + 10);
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.6);
        this.speedY = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.6);
        this.opacity = Math.random() * 0.4 + 0.3;
        this.hueOffset = Math.random() * 20; // For subtle color variation
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // 🎯 Soft mouse attraction (only if enabled)
        if (enableMouseInteraction && mouseRef.current.x !== null && !prefersReducedMotion) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            this.x -= dx * force * 0.015;
            this.y -= dy * force * 0.015;
          }
        }

        // Reset if off-screen
        if (
          this.x < -20 ||
          this.x > window.innerWidth + 20 ||
          this.y < -20 ||
          this.y > window.innerHeight + 20
        ) {
          this.reset();
        }
      }

      draw() {
        // Subtle color variation based on position
        const colorVar = (this.x + this.y) / (window.innerWidth + window.innerHeight);
        const r = parseInt(primaryColor.slice(1, 3), 16);
        const g = parseInt(primaryColor.slice(3, 5), 16);
        const b = parseInt(primaryColor.slice(5, 7), 16);
        const r2 = parseInt(secondaryColor.slice(1, 3), 16);
        const g2 = parseInt(secondaryColor.slice(3, 5), 16);
        const b2 = parseInt(secondaryColor.slice(5, 7), 16);
        
        const mixedR = Math.floor(r + (r2 - r) * colorVar);
        const mixedG = Math.floor(g + (g2 - g) * colorVar);
        const mixedB = Math.floor(b + (b2 - b) * colorVar);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${mixedR}, ${mixedG}, ${mixedB}, ${this.opacity})`;
        
        if (!prefersReducedMotion) {
          ctx.shadowColor = primaryColor;
          ctx.shadowBlur = 8;
        }
        ctx.fill();
      }
    }

    /* ---------- Init Particles ---------- */
    particlesRef.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlesRef.current.push(new Particle());
    }

    /* ---------- Draw Connection Lines ---------- */
    const drawConnections = () => {
      if (!enableConnections || prefersReducedMotion) return;
      
      particlesRef.current.forEach((p1, i) => {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = parseColor(secondaryColor, opacity);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
    };

    /* ---------- Animation Loop ---------- */
    let lastTime = 0;
    const animate = (timestamp) => {
      // Throttle to ~30fps on mobile for battery savings
      if (isMobile && timestamp - lastTime < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = timestamp;
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particlesRef.current.forEach((p) => {
        p.update();
        p.draw();
      });
      
      drawConnections();

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation only if not reduced motion preference
    if (!prefersReducedMotion) {
      animate(0);
    }

    /* ---------- Cleanup ---------- */
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      
      // Clear references to prevent memory leaks
      particlesRef.current = [];
    };
  }, [
    primaryColor, 
    secondaryColor, 
    density, 
    maxParticles, 
    enableConnections, 
    connectionDistance, 
    enableMouseInteraction,
    blendMode
  ]);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      aria-hidden="true" // ♿ Hide decorative element from screen readers
      style={{ mixBlendMode: blendMode }}
    />
  );
}

export default ParticleBackground;