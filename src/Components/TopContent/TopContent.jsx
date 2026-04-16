import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { Helmet } from "react-helmet-async";
import "./TopContent.css";

function TopContent({
  name = "Yuvaraj",
  title = "Founder @ YUVITRA Labs",
  subtitle = "Java Full Stack Engineer in India",
  description = "I build scalable web applications, internal automation tools and modern UI systems for startups and businesses.",
  techStack = ["React", "Java", "Spring Boot", "Three.js"],
  socialLinks = {
    linkedin: "https://www.linkedin.com/in/yuvaraj-r-497908214/",
    github: "https://github.com/yuva-raj2",
  },
  resumeUrl = "#",
  primaryColor = "#38f5d0",
  secondaryColor = "#22d3ee",
  accentColor = "#818cf8",
  enableParticles = true,
  particleCount = 120,
  enableMagnetic = true,
  ctaPrimaryText = "📄 Download CV",
  ctaSecondaryText = "🚀 View Solutions",
  heroId = "Home",
}) {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.7]);
  const heroY = useTransform(scrollY, [0, 300], [0, 40]);

  // ✅ FIX: Move useMemo OUTSIDE useEffect - at component top level
  const particleColors = useMemo(() => [
    new THREE.Color(primaryColor),
    new THREE.Color(secondaryColor),
    new THREE.Color(accentColor),
  ], [primaryColor, secondaryColor, accentColor]);

  const textGradient = useMemo(() => 
    `linear-gradient(120deg, #ffffff 0%, ${primaryColor} 50%, ${secondaryColor} 100%)`,
    [primaryColor, secondaryColor]
  );

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener?.("change", handleChange);
    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, []);

  // Three.js Particle Background
  useEffect(() => {
    if (!enableParticles || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ✅ FIX: Use the useMemo value from outside (particleColors)
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colorAttributes = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      colorAttributes[i] = color.r;
      colorAttributes[i + 1] = color.g;
      colorAttributes[i + 2] = color.b;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorAttributes, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: isReducedMotion ? 0.3 : 0.5,
      vertexColors: true,
      transparent: true,
      opacity: isReducedMotion ? 0.4 : 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    let animationId;
    let frame = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      frame++;

      if (!isReducedMotion) {
        particles.rotation.y = frame * 0.0008;
        particles.rotation.x = Math.sin(frame * 0.001) * 0.1;
      }

      renderer.render(scene, camera);
    };
    animate();
    setIsLoaded(true);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      scene.remove(particles);
    };
  }, [enableParticles, particleCount, isReducedMotion, particleColors]); // ✅ Add particleColors to deps

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const offset = 80;
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const getMagneticProps = () => {
    if (!enableMagnetic || isReducedMotion) return {};
    return {
      whileHover: { scale: 1.04 },
      whileTap: { scale: 0.96 },
      transition: { type: "spring", stiffness: 400, damping: 17 },
    };
  };

  return (
    <>
      <Helmet>
        <title>{name} - Java Full Stack Engineer | Founder @ YUVITRA Labs</title>
        <meta name="description" content={`${name} is a Java Full Stack Developer and founder of Yuvitra Labs, building scalable web applications for startups and businesses.`} />
        <meta name="keywords" content="Java, Spring Boot, React, Full Stack, Web Development, Yuvitra Labs" />
        <meta property="og:title" content={`${name} - Full Stack Engineer`} />
        <meta property="og:description" content="Building scalable web applications & modern UI systems" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "#"} />
      </Helmet>

      <motion.section
        ref={heroRef}
        id={heroId}
        className="hero-section"
        style={{
          "--brand-primary": primaryColor,
          "--brand-secondary": secondaryColor,
          "--brand-accent": accentColor,
          opacity: heroOpacity,
          y: heroY,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        aria-label="Hero section introducing Yuvaraj"
      >
        {enableParticles && (
          <canvas
            ref={canvasRef}
            className="hero-canvas"
            style={{
              opacity: isLoaded ? (isReducedMotion ? 0.25 : 0.45) : 0,
              transition: "opacity 1s ease",
            }}
            aria-hidden="true"
            role="presentation"
          />
        )}

        <div className="hero-overlay" aria-hidden="true" />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.p
            className="hero-greet"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="greet-icon" aria-hidden="true">👋</span>
            <span className="greet-text">Hello, I'm</span>
          </motion.p>

          <motion.h1
            className="hero-name"
            style={{
              background: textGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {name}
          </motion.h1>

          <motion.h2
            className="hero-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="title-primary">{title}</span>
            <span className="title-secondary">{subtitle}</span>
          </motion.h2>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {description.split("scalable web applications").map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="highlight">scalable web applications</span>
                )}
              </React.Fragment>
            ))}
          </motion.p>

          <motion.div
            className="tech-stack"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            role="list"
            aria-label="Technical expertise"
          >
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                className="tech-badge magnetic"
                role="listitem"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85 + index * 0.05 }}
                {...getMagneticProps()}
                whileHover={{ 
                  borderColor: primaryColor,
                  boxShadow: `0 0 20px ${primaryColor}40`,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            role="navigation"
            aria-label="Social media profiles"
          >
            {socialLinks.linkedin && (
              <motion.a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link magnetic"
                whileHover={{ y: -2 }}
                {...getMagneticProps()}
                aria-label="Connect on LinkedIn"
              >
                <span className="social-icon" aria-hidden="true">🔗</span>
                <span className="social-label">LinkedIn</span>
              </motion.a>
            )}
            {socialLinks.github && (
              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link magnetic"
                whileHover={{ y: -2 }}
                {...getMagneticProps()}
                aria-label="View GitHub profile"
              >
                <span className="social-icon" aria-hidden="true">💻</span>
                <span className="social-label">GitHub</span>
              </motion.a>
            )}
          </motion.div>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            {resumeUrl && resumeUrl !== "#" && (
              <motion.a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary magnetic"
                {...getMagneticProps()}
                whileHover={{ 
                  boxShadow: `0 16px 48px ${primaryColor}60`,
                  y: -2,
                }}
              >
                {ctaPrimaryText}
              </motion.a>
            )}
            <motion.button
              className="btn btn-secondary magnetic"
              onClick={() => scrollToSection("Projects")}
              {...getMagneticProps()}
              whileHover={{ 
                borderColor: primaryColor,
                boxShadow: `0 0 24px ${primaryColor}30`,
                y: -2,
              }}
              aria-label="View my projects and solutions"
            >
              {ctaSecondaryText}
            </motion.button>
          </motion.div>

          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            aria-hidden="true"
          >
            <motion.div
              className="scroll-dot"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
            <span className="scroll-text"></span>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}

export default TopContent;