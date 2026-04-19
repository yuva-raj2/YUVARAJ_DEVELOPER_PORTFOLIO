import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * NeonCursor - Optimized for Portfolio Conversion
 * Props:
 * - primaryColor: string (hex) - Main glow color (default: '#38f5d0')
 * - secondaryColor: string (hex) - Ring color (default: '#7c3aed')
 * - particleCount: number - Trail particles (default: 20, max: 30)
 * - enableMagnetic: boolean - Magnetic buttons (default: true)
 * - magneticSelector: string - CSS selector for magnetic elements
 */
function NeonCursor({
  primaryColor = "#38f5d0",
  secondaryColor = "#7c3aed",
  particleCount = 20,
  enableMagnetic = true,
  magneticSelector = ".magnetic, .btn, a[href], button"
} = {}) {
  
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef(null);
  const magneticListenersRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // 🚫 Disable on mobile/touch devices (better UX + battery)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // 🚫 Disable if user prefers reduced motion (accessibility)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isTouchDevice || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    /* ---------------- Scene Setup ---------------- */
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "low-power" // 🔋 Better battery life
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // ⚡ Performance optimization
    rendererRef.current = renderer;

    /* ---------------- Parse Colors ---------------- */
    const primaryHex = new THREE.Color(primaryColor);
    const secondaryHex = new THREE.Color(secondaryColor);

    /* ---------------- Cursor Core (Glow) ---------------- */
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.MeshBasicMaterial({
        color: primaryHex,
        transparent: true,
        opacity: 0.7,
      })
    );
    scene.add(glow);

    /* ---------------- Outer Ring ---------------- */
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.12, 16, 100),
      new THREE.MeshBasicMaterial({
        color: secondaryHex,
        transparent: true,
        opacity: 0.5,
      })
    );
    scene.add(ring);

    /* ---------------- Particle Trail ---------------- */
    const particles = [];
    const safeParticleCount = Math.min(particleCount, 30); // Cap for performance

    for (let i = 0; i < safeParticleCount; i++) {
      const size = 0.35 - i * 0.012;
      const hue = 180 + i * 4; // Cyan to purple gradient
      const lightness = 75 - i * 1.2;
      
      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(Math.max(size, 0.1), 16, 16),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(`hsl(${hue}, 90%, ${lightness}%)`),
          transparent: true,
          opacity: 1 - i / safeParticleCount,
        })
      );

      particle.position.z = -i * 0.35;
      scene.add(particle);
      particles.push(particle);
    }
    particlesRef.current = particles;

    /* ---------------- Mouse / Touch Tracking ---------------- */
    const updateTarget = (x, y) => {
      targetRef.current.x = (x / window.innerWidth) * 2 - 1;
      targetRef.current.y = -(y / window.innerHeight) * 2 + 1;
    };

    const handleMouseMove = (e) => updateTarget(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches?.[0]) {
        updateTarget(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    /* ---------------- Animation Loop ---------------- */
    let frame = 0;
    let running = true;

    const animate = () => {
      if (!running) return;
      animationIdRef.current = requestAnimationFrame(animate);
      frame++;

      // Smooth easing (adjust 0.1 for faster/slower follow)
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.1;

      const worldX = mouseRef.current.x * 40;
      const worldY = mouseRef.current.y * 30;

      // Animate glow
      glow.position.set(worldX, worldY, 0);
      const pulseScale = 1 + Math.sin(frame * 0.04) * 0.15;
      glow.scale.setScalar(pulseScale);

      // Animate ring
      ring.position.set(worldX, worldY, 0);
      ring.rotation.x += 0.008;
      ring.rotation.y += 0.012;

      // Animate particles (trail effect)
      particles.forEach((p, i) => {
        const followSpeed = Math.max(0.03, 0.15 - i * 0.005);
        p.position.x += (worldX - p.position.x) * followSpeed;
        p.position.y += (worldY - p.position.y) * followSpeed;
        p.rotation.z += 0.015 * (i % 2 === 0 ? 1 : -1);
        
        const wavePulse = 1 + Math.sin(frame * 0.06 + i * 0.4) * 0.12;
        p.scale.setScalar(Math.max(wavePulse, 0.3));
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    /* ---------------- Magnetic Effect for Buttons ---------------- */
    if (enableMagnetic) {
      const magneticItems = document.querySelectorAll(magneticSelector);
      
      magneticItems.forEach((item) => {
        // Skip if already has listener
        if (item.dataset.magneticAttached) return;
        item.dataset.magneticAttached = "true";

        const strength = 0.15; // Adjust magnetic pull strength
        
        const move = (e) => {
          const rect = item.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * strength;
          const deltaY = (e.clientY - centerY) * strength;
          
          item.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.03)`;
          item.style.transition = "transform 0.1s ease-out";
        };

        const reset = () => {
          item.style.transform = "translate3d(0,0,0) scale(1)";
          item.style.transition = "transform 0.3s ease";
        };

        item.addEventListener("mousemove", move, { passive: true });
        item.addEventListener("mouseleave", reset, { passive: true });
        item.addEventListener("touchstart", reset, { passive: true }); // Reset on touch

        magneticListenersRef.current.push({ item, move, reset });
      });
    }

    /* ---------------- Pause Animation on Tab Blur ---------------- */
    const handleVisibility = () => {
      running = !document.hidden;
      if (running && isLoaded) animate();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    /* ---------------- Cleanup Function ---------------- */
    return () => {
      running = false;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // Remove event listeners
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      // Remove magnetic listeners
      magneticListenersRef.current.forEach(({ item, move, reset }) => {
        item.removeEventListener("mousemove", move);
        item.removeEventListener("mouseleave", reset);
        item.removeEventListener("touchstart", reset);
        delete item.dataset.magneticAttached;
      });
      magneticListenersRef.current = [];

      // Dispose Three.js resources (prevent memory leaks)
      particles.forEach((p) => {
        p.geometry?.dispose();
        p.material?.dispose();
      });
      glow.geometry?.dispose();
      glow.material?.dispose();
      ring.geometry?.dispose();
      ring.material?.dispose();
      renderer.dispose();
    };
  }, [primaryColor, secondaryColor, particleCount, enableMagnetic, magneticSelector]);

  // 🚫 Return null if disabled (mobile / reduced motion)
  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true" // ♿ Accessibility: hide decorative element from screen readers
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none", // ✅ Don't block clicks on underlying elements
        zIndex: 9999,
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.4s ease",
        mixBlendMode: "screen", // ✨ Better visual blend with your dark background
      }}
    />
  );
}

export default NeonCursor;