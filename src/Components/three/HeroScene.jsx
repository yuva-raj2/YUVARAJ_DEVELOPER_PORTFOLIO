// src/components/three/HeroScene.jsx

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    container.appendChild(renderer.domElement);

    // Main geometric object
    const geometry = new THREE.IcosahedronGeometry(1.35, 2);

    const material = new THREE.MeshStandardMaterial({
      color: 0x6d5dfc,
      metalness: 0.65,
      roughness: 0.25,
      wireframe: false
    });

    const core = new THREE.Mesh(geometry, material);
    scene.add(core);

    // Outer wireframe
    const wireGeometry = new THREE.IcosahedronGeometry(1.65, 2);

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x20d9d2,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });

    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    scene.add(wire);

    // Small particles
    const particleCount = 90;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 1) {
      particlePositions[i] = (Math.random() - 0.5) * 9;
    }

    const particleGeometry = new THREE.BufferGeometry();

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x7cf7ef,
      size: 0.025,
      transparent: true,
      opacity: 0.7
    });

    const particles = new THREE.Points(
      particleGeometry,
      particleMaterial
    );

    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x7c6cff, 8, 15);
    keyLight.position.set(3, 3, 4);

    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x25ddd2, 5, 12);
    fillLight.position.set(-4, -2, 2);

    scene.add(fillLight);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      core.rotation.x = elapsed * 0.18;
      core.rotation.y = elapsed * 0.32;

      wire.rotation.x = -elapsed * 0.08;
      wire.rotation.y = elapsed * 0.15;

      particles.rotation.y = elapsed * 0.025;

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    const handleResize = () => {
      if (!container) {
        return;
      }

      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      renderer.setAnimationLoop(null);

      geometry.dispose();
      material.dispose();

      wireGeometry.dispose();
      wireMaterial.dispose();

      particleGeometry.dispose();
      particleMaterial.dispose();

      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="hero-scene" aria-hidden="true" />;
}