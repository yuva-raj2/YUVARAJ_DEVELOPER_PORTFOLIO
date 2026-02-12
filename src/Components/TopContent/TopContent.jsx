import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Helmet } from "react-helmet-async";

function TopContent() {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const socialStyle = {
    padding: "10px 18px",
    fontSize: "0.9rem",
    borderRadius: "999px",
    border: "1px solid rgba(56,245,208,0.5)",
    color: "#38f5d0",
    background: "rgba(56,245,208,0.08)",
    fontWeight: 600,
    textDecoration: "none"
  };

  const Resume = ""; // add resume later

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /* ---------- Particles ---------- */
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 120;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      const color = new THREE.Color();
      color.setHSL(0.5 + Math.random() * 0.1, 1, 0.6);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particles);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame++;

      particles.rotation.y = frame * 0.001;
      particles.rotation.x = Math.sin(frame * 0.001) * 0.15;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      window.removeEventListener("resize", handleResize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
    <Helmet>
      <title>Yuvaraj - Java Full Stack Engineer | Founder @ YUVITRA Labs</title> 
      <meta name="description" content="Yuvaraj is a Java Full Stack Developer and founder of Yuvitra Labs, building scalable web applications for startups and businesses." />
    </Helmet>
    <section
      id="Home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "4rem 2rem",
      }}
    >
      {/* Three.js Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: isLoaded ? 0.45 : 0,
          transition: "opacity 1s ease",
          pointerEvents: "none",
        }}
      />

      {/* HERO CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "820px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <p
          style={{
            fontSize: "0.95rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#38f5d0",
            fontWeight: 600,
            marginBottom: "0.8rem",
          }}
        >
          👋 Hello, I’m
        </p>

        <h1
          style={{
            fontSize: "3.8rem",
            fontWeight: 800,
            background:
              "linear-gradient(120deg, #ffffff 0%, #38f5d0 50%, #22d3ee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.6rem",
            lineHeight: 1.2,
          }}
        >
          Yuvaraj
        </h1>

        <h2
          style={{
            fontSize: "1.6rem",
            color: "#94a3b8",
            marginBottom: "1.4rem",
            fontWeight: 600,
          }}
        >
          Founder @ YUVITRA Labs <br />
          Java Full Stack Engineer
        </h2>

        <p
          style={{
            fontSize: "1.15rem",
            color: "#cbd5e1",
            lineHeight: 1.8,
            marginBottom: "2.4rem",
          }}
        >
          I build{" "}
          <span style={{ color: "#38f5d0", fontWeight: 600 }}>
            scalable web applications
          </span>
          , internal automation tools and modern UI systems for
          startups and businesses.
        </p>

        {/* TECH STACK */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.8rem",
            marginBottom: "2.4rem",
          }}
        >
          {["React", "Java", "Spring Boot", "Three.js"].map((tech) => (
            <span
              key={tech}
              className="magnetic"
              style={{
                padding: "8px 16px",
                fontSize: "0.85rem",
                borderRadius: "999px",
                border: "1px solid rgba(56,245,208,0.5)",
                color: "#38f5d0",
                background: "rgba(56,245,208,0.06)",
                fontWeight: 600,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        {/* Social Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.2rem",
            marginBottom: "2.2rem",
            flexWrap: "wrap"
          }}
        >
          <a
            href="https://www.linkedin.com/in/yuvaraj-r-497908214/"
            target="_blank"
            rel="noreferrer"
            className="magnetic"
            style={socialStyle}
          >
            🔗 LinkedIn
          </a>

          <a
            href="https://github.com/yuva-raj2"
            target="_blank"
            rel="noreferrer"
            className="magnetic"
            style={socialStyle}
          >
            💻 GitHub
          </a>
        </div>

        {/* CTA BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <a href={Resume} target="_blank" rel="noreferrer">
            <button
              className="magnetic"
              style={{
                padding: "14px 34px",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#0f172a",
                background:
                  "linear-gradient(135deg, #38f5d0 0%, #22d3ee 100%)",
                border: "none",
                borderRadius: "14px",
                cursor: "pointer",
                boxShadow: "0 12px 36px rgba(56,245,208,0.45)",
              }}
            >
              📄 Download CV
            </button>
          </a>

          <button
            className="magnetic"
            onClick={() =>
              document
                .getElementById("Projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "14px 34px",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#38f5d0",
              background: "rgba(56,245,208,0.12)",
              border: "2px solid #38f5d0",
              borderRadius: "14px",
              cursor: "pointer",
            }}
          >
            🚀 View Solutions
          </button>
        </div>
      </motion.div>
    </section>
    </>
  );
}

export default TopContent;
