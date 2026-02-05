import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function NeonCursor() {
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

  useEffect(() => {
    /* ---------------- Scene ---------------- */
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
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    rendererRef.current = renderer;

    /* ---------------- Cursor Core ---------------- */
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x38f5d0,
        transparent: true,
        opacity: 0.6,
      })
    );
    scene.add(glow);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.15, 16, 100),
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.4,
      })
    );
    scene.add(ring);

    /* ---------------- Particle Trail ---------------- */
    const particles = [];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(0.32 - i * 0.01, 16, 16),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(`hsl(${180 + i * 5},100%,${70 - i * 1.5}%)`),
          transparent: true,
          opacity: 1 - i / particleCount,
        })
      );

      particle.position.z = -i * 0.3;
      scene.add(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    /* ---------------- Mouse / Touch ---------------- */
    const updateTarget = (x, y) => {
      targetRef.current.x = (x / window.innerWidth) * 2 - 1;
      targetRef.current.y = -(y / window.innerHeight) * 2 + 1;
    };

    const handleMouseMove = (e) => updateTarget(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        updateTarget(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);

    /* ---------------- Animation ---------------- */
    let frame = 0;
    let running = true;

    const animate = () => {
      if (!running) return;

      animationIdRef.current = requestAnimationFrame(animate);
      frame++;

      // Smooth follow
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.12;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.12;

      const worldX = mouseRef.current.x * 40;
      const worldY = mouseRef.current.y * 30;

      glow.position.set(worldX, worldY, 0);
      glow.scale.setScalar(1 + Math.sin(frame * 0.05) * 0.12);

      ring.position.set(worldX, worldY, 0);
      ring.rotation.x += 0.01;
      ring.rotation.y += 0.01;

      particles.forEach((p, i) => {
        const speed = Math.max(0.02, 0.18 - i * 0.006);

        p.position.x += (worldX - p.position.x) * speed;
        p.position.y += (worldY - p.position.y) * speed;

        p.rotation.z += 0.01 * (i + 1);

        const pulse = 1 + Math.sin(frame * 0.05 + i * 0.3) * 0.15;
        p.scale.setScalar(pulse);
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    /* ---------------- Magnetic Buttons ---------------- */
    const magneticItems = document.querySelectorAll(".magnetic");

    magneticItems.forEach((item) => {
      const move = (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        item.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      };

      const reset = () => {
        item.style.transform = "translate(0,0)";
      };

      item.addEventListener("mousemove", move);
      item.addEventListener("mouseleave", reset);

      magneticListenersRef.current.push({ item, move, reset });
    });

    /* ---------------- Pause on Tab Blur ---------------- */
    const handleVisibility = () => {
      running = !document.hidden;
      if (running) animate();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    /* ---------------- Cleanup ---------------- */
    return () => {
      running = false;
      cancelAnimationFrame(animationIdRef.current);

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      magneticListenersRef.current.forEach(({ item, move, reset }) => {
        item.removeEventListener("mousemove", move);
        item.removeEventListener("mouseleave", reset);
      });

      particles.forEach((p) => {
        p.geometry.dispose();
        p.material.dispose();
      });

      glow.geometry.dispose();
      glow.material.dispose();
      ring.geometry.dispose();
      ring.material.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    />
  );
}

export default NeonCursor;
