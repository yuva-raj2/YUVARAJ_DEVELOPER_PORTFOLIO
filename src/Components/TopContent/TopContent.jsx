import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { Helmet } from "react-helmet-async";
import "./TopContent.css";

/**
 * TopContent - Conversion-Optimized Hero Section
 * For Construction & Photography Business Clients
 */
function TopContent({
  name = "Yuvaraj",
  title = "Founder @ YUVITRA Labs",
  subtitle = "Web Developer for Construction & Photography Businesses",
  description = "I help contractors & photographers get 30% more leads with fast websites, WhatsApp automation, and Google Maps integration.",
  techStack = ["React", "WhatsApp API", "Google Maps", "Tailwind", "Spring Boot"],
  socialLinks = {
    linkedin: "https://www.linkedin.com/in/yuvaraj-r-497908214/",
    github: "https://github.com/yuva-raj2",
    whatsapp: "https://wa.me/918667851286", // ✅ Add your number: "https://wa.me/919876543210"
  },
  resumeUrl = "#",
  primaryColor = "#38f5d0",
  secondaryColor = "#22d3ee",
  accentColor = "#818cf8",
  enableParticles = true,
  particleCount = 120,
  enableMagnetic = true,
  ctaPrimaryText = "💬 WhatsApp Me Now",
  ctaSecondaryText = "🚀 View My Work",
  ctaPrimaryHref = "https://wa.me/918667851286", // ✅ REPLACE WITH YOUR NUMBER
  ctaSecondaryHref = "#Work",
  heroId = "Home",
  trustBadges = ["✓ 5+ Projects", "✓ WhatsApp Expert", "✓ 7-Day Support"], // ✅ New prop
  location = "Tamil Nadu, India", // ✅ For local SEO
}) {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.7]);
  const heroY = useTransform(scrollY, [0, 300], [0, 40]);

  // ✅ Detect mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ Optimized particle count based on device
  const effectiveParticleCount = useMemo(() => {
    if (isReducedMotion) return 0;
    if (isMobile) return Math.floor(particleCount * 0.5); // 50% fewer on mobile
    return particleCount;
  }, [particleCount, isReducedMotion, isMobile]);

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

  // Three.js Particle Background (Optimized)
  useEffect(() => {
    if (!enableParticles || !canvasRef.current || effectiveParticleCount === 0) {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '0';
      }
      return;
    }

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = isMobile ? 40 : 30; // ✅ Further back on mobile for performance

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: isMobile ? "low-power" : "high-performance", // ✅ Battery optimization
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 2)); // ✅ Lower DPR on mobile

    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(effectiveParticleCount * 3);
    const colorAttributes = new Float32Array(effectiveParticleCount * 3);

    for (let i = 0; i < effectiveParticleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * (isMobile ? 80 : 100);
      positions[i + 1] = (Math.random() - 0.5) * (isMobile ? 80 : 100);
      positions[i + 2] = (Math.random() - 0.5) * (isMobile ? 30 : 50);

      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      colorAttributes[i] = color.r;
      colorAttributes[i + 1] = color.g;
      colorAttributes[i + 2] = color.b;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorAttributes, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: isReducedMotion ? 0.2 : (isMobile ? 0.35 : 0.5),
      vertexColors: true,
      transparent: true,
      opacity: isReducedMotion ? 0.3 : (isMobile ? 0.4 : 0.6),
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
    window.addEventListener("resize", handleResize, { passive: true });

    let animationId;
    let frame = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      frame++;

      if (!isReducedMotion) {
        particles.rotation.y = frame * (isMobile ? 0.0004 : 0.0008); // ✅ Slower rotation on mobile
        particles.rotation.x = Math.sin(frame * 0.001) * (isMobile ? 0.05 : 0.1);
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
  }, [enableParticles, effectiveParticleCount, isReducedMotion, isMobile, particleColors]);

  // ✅ Smooth scroll with proper section ID handling
  const scrollToSection = useCallback((sectionId) => {
    const id = sectionId.replace(/^#/, '');
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Section with id "${id}" not found`);
      return;
    }
    const offset = 80;
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
    
    // Update URL hash without jump
    history.replaceState(null, null, `#${id}`);
  }, []);

  // ✅ Magnetic props with reduced motion check
  const getMagneticProps = () => {
    if (!enableMagnetic || isReducedMotion) return {};
    return {
      whileHover: { scale: 1.03, y: -1 },
      whileTap: { scale: 0.97 },
      transition: { type: "spring", stiffness: 450, damping: 20, mass: 0.08 },
    };
  };

  // ✅ Keyboard navigation handler for buttons
  const handleButtonKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // ✅ Format phone number for WhatsApp link
  const getWhatsAppLink = useCallback((number, message) => {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message || "Hi Yuvaraj, I saw your portfolio and need help with [website/automation]");
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  }, []);

  // ✅ Structured data for SEO (LocalBusiness + Person)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": name,
        "jobTitle": title,
        "url": typeof window !== "undefined" ? window.location.href : "",
        "sameAs": [
          socialLinks.linkedin,
          socialLinks.github,
        ].filter(Boolean),
        "worksFor": {
          "@type": "Organization",
          "name": "Yuvitra Labs",
          "url": "https://yuvitralabs.com"
        },
        "knowsAbout": ["Web Development", "React", "WhatsApp Automation", "Google Maps Integration", "Construction Business Websites", "Photography Business Websites"]
      },
      {
        "@type": "LocalBusiness",
        "name": "Yuvitra Labs",
        "image": `${typeof window !== "undefined" ? window.location.origin : ''}/og-image.jpg`,
        "url": "https://yuvitralabs.com",
        "telephone": socialLinks.whatsapp?.replace('https://wa.me/', ''),
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "priceRange": "₹₹",
        "makesOffer": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Business Website Development",
              "description": "Mobile-friendly websites for construction & photography businesses"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "WhatsApp Business Automation",
              "description": "Auto-replies, booking confirmations, quote sending via WhatsApp"
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* ✅ Niche-Optimized SEO Meta Tags */}
        <title>{name} | Web Developer for Construction & Photography Businesses | Yuvitra Labs</title>
        <meta name="description" content={`${name} builds fast, mobile-friendly websites with WhatsApp automation & Google Maps integration for contractors & photographers in India. Get 30% more leads.`} />
        <meta name="keywords" content="web developer, construction website, photography website, WhatsApp automation, Google Maps integration, Tamil Nadu, India, small business website, lead generation" />
        
        {/* ✅ Open Graph / Social Sharing */}
        <meta property="og:title" content={`${name} | Web Developer for Construction & Photography`} />
        <meta property="og:description" content="Get 30% more leads with fast websites + WhatsApp automation + Google Maps integration." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
        <meta property="og:image" content={`${typeof window !== "undefined" ? window.location.origin : ''}/og-image.jpg`} />
        <meta property="og:locale" content="en_IN" />
        
        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${name} | Web Developer for Construction & Photography`} />
        <meta name="twitter:description" content="Fast websites + WhatsApp automation = More leads for your business." />
        <meta name="twitter:image" content={`${typeof window !== "undefined" ? window.location.origin : ''}/og-image.jpg`} />
        
        {/* ✅ Canonical URL */}
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "#"} />
        
        {/* ✅ Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* ✅ Preconnect for Performance */}
        <link rel="preconnect" href="https://wa.me" />
        <link rel="preconnect" href="https://linkedin.com" />
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
        aria-label="Hero section: Yuvaraj - Web Developer for Construction & Photography Businesses"
      >
        {/* Three.js Canvas - Optimized */}
        {enableParticles && effectiveParticleCount > 0 && (
          <canvas
            ref={canvasRef}
            className="hero-canvas"
            style={{
              opacity: isLoaded ? (isReducedMotion ? 0.15 : (isMobile ? 0.3 : 0.45)) : 0,
              transition: "opacity 1s ease",
            }}
            aria-hidden="true"
            role="presentation"
          />
        )}

        {/* Decorative Overlay */}
        <div className="hero-overlay" aria-hidden="true" />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Greeting Badge */}
          <motion.p
            className="hero-greet"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="greet-icon" aria-hidden="true">👋</span>
            <span className="greet-text">Hello, I'm</span>
          </motion.p>

          {/* Name - Gradient Text */}
          <motion.h1
            className="hero-name"
            style={{
              background: textGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {name}
          </motion.h1>

          {/* Title + Subtitle */}
          <motion.h2
            className="hero-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="title-primary">{title}</span>
            <span className="title-secondary">{subtitle}</span>
          </motion.h2>

          {/* Description - Fixed Highlight Logic */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {description}
          </motion.p>

          {/* ✅ Trust Badges - Social Proof in Hero */}
          {trustBadges?.length > 0 && (
            <motion.div
              className="trust-badges"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              role="list"
              aria-label="Why clients trust me"
            >
              {trustBadges.map((badge, index) => (
                <span 
                  key={index} 
                  className="trust-badge"
                  role="listitem"
                  style={{ 
                    borderColor: `${primaryColor}40`,
                    background: `rgba(${parseInt(primaryColor.slice(1,3), 16)}, ${parseInt(primaryColor.slice(3,5), 16)}, ${parseInt(primaryColor.slice(5,7), 16)}, 0.08)`
                  }}
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          )}

          {/* Tech Stack - Niche-Relevant */}
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
                tabIndex={0}
                onKeyDown={(e) => handleButtonKeyDown(e, () => {})}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Social Links - With WhatsApp */}
          <motion.div
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            role="navigation"
            aria-label="Connect with me"
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
                tabIndex={0}
                onKeyDown={(e) => handleButtonKeyDown(e, () => window.open(socialLinks.linkedin, '_blank'))}
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
                tabIndex={0}
                onKeyDown={(e) => handleButtonKeyDown(e, () => window.open(socialLinks.github, '_blank'))}
              >
                <span className="social-icon" aria-hidden="true">💻</span>
                <span className="social-label">GitHub</span>
              </motion.a>
            )}
            {socialLinks.whatsapp && (
              <motion.a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link social-whatsapp magnetic"
                whileHover={{ y: -2, backgroundColor: "rgba(37, 211, 102, 0.2)" }}
                {...getMagneticProps()}
                aria-label="Message on WhatsApp"
                tabIndex={0}
                onKeyDown={(e) => handleButtonKeyDown(e, () => window.open(socialLinks.whatsapp, '_blank'))}
              >
                <span className="social-icon" aria-hidden="true">💬</span>
                <span className="social-label">WhatsApp</span>
              </motion.a>
            )}
          </motion.div>

          {/* CTA Buttons - WhatsApp First! */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            {/* Primary: WhatsApp CTA (Conversion Booster) */}
            <motion.a
              href={ctaPrimaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-whatsapp magnetic"
              {...getMagneticProps()}
              whileHover={{ 
                boxShadow: `0 16px 48px rgba(37, 211, 102, 0.5)`,
                y: -2,
              }}
              aria-label="Start a conversation on WhatsApp"
              tabIndex={0}
              onKeyDown={(e) => handleButtonKeyDown(e, () => window.open(ctaPrimaryHref, '_blank'))}
            >
              <span className="btn-icon" aria-hidden="true">💬</span>
              {ctaPrimaryText}
            </motion.a>
            
            {/* Secondary: View Work */}
            <motion.button
              className="btn btn-secondary magnetic"
              onClick={() => scrollToSection(ctaSecondaryHref)}
              {...getMagneticProps()}
              whileHover={{ 
                borderColor: primaryColor,
                boxShadow: `0 0 24px ${primaryColor}30`,
                y: -2,
              }}
              aria-label="View my projects and solutions"
              tabIndex={0}
              onKeyDown={(e) => handleButtonKeyDown(e, () => scrollToSection(ctaSecondaryHref))}
            >
              {ctaSecondaryText}
            </motion.button>
          </motion.div>

          {/* Location Badge - Local SEO Signal */}
          {location && (
            <motion.p
              className="hero-location"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              aria-label={`Based in ${location}`}
            >
              📍 {location} • Remote-friendly across India
            </motion.p>
          )}

          {/* Scroll Indicator */}
          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            onClick={() => scrollToSection("Services")}
            onKeyDown={(e) => handleButtonKeyDown(e, () => scrollToSection("Services"))}
            role="button"
            tabIndex={0}
            aria-label="Scroll to view services"
            aria-hidden="true"
          >
            <motion.div
              className="scroll-dot"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
            <span className="scroll-text">Explore</span>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}

export default TopContent;