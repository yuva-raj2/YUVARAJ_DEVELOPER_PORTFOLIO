import React, { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";

/**
 * Header - Professional Portfolio Navigation Component
 * 
 * A brandable, accessible, and performant header with smooth animations,
 * audio feedback, mobile-responsive navigation, and professional polish.
 * 
 * @param {Object} props
 * @param {string} [props.brandName="Yuvitra Labs"] - Brand/logo text
 * @param {string} [props.logoHref="#Home"] - Logo click destination
 * @param {Array<string>} [props.sections] - Navigation section labels
 * @param {string} [props.primaryColor="#38f5d0"] - Brand primary color
 * @param {string} [props.secondaryColor="#22d3ee"] - Brand secondary color
 * @param {string} [props.audioUrl] - Hover sound effect URL (set null to disable)
 * @param {number} [props.audioVolume=0.4] - Audio volume (0.0 - 1.0)
 * @param {boolean} [props.enableAudio=true] - Enable hover audio feedback
 * @param {number} [props.headerOffset=80] - Scroll offset for anchor links
 * @param {boolean} [props.enableMagnetic=true] - Enable magnetic button effect
 * @param {string} [props.className] - Additional CSS classes
 */
function Header({
  brandName = "Yuvitra Labs",
  logoHref = "#Home",
  sections: propSections,
  primaryColor = "#38f5d0",
  secondaryColor = "#22d3ee",
  audioUrl = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_7e046feee4.mp3?filename=click-124467.mp3",
  audioVolume = 0.4,
  enableAudio = true,
  headerOffset = 80,
  enableMagnetic = true,
  className = "",
}) {
  const audioRef = useRef(null);
  const headerRef = useRef(null);
  const [activeSection, setActiveSection] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);

  // Default sections if not provided
  const sections = useMemo(() => 
    propSections || ["Home", "About", "Projects", "Skills", "Experience", "Services", "Contact"],
    [propSections]
  );

  // Initialize audio with error handling
  useEffect(() => {
    if (!enableAudio || !audioUrl) return;
    
    try {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.volume = audioVolume;
      audioRef.current.preload = "auto";
      
      const onCanPlay = () => setIsAudioReady(true);
      const onError = () => console.warn("Header: Audio failed to load");
      
      audioRef.current.addEventListener("canplaythrough", onCanPlay);
      audioRef.current.addEventListener("error", onError);
      
      return () => {
        audioRef.current?.removeEventListener("canplaythrough", onCanPlay);
        audioRef.current?.removeEventListener("error", onError);
      };
    } catch (e) {
      console.warn("Header: Audio initialization failed", e);
    }
  }, [enableAudio, audioUrl, audioVolume]);

  // Play hover sound (with user gesture check)
  const playHoverSound = useCallback(() => {
    if (!enableAudio || !isAudioReady || !audioRef.current) return;
    try {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      playPromise?.catch(() => {}); // Silence autoplay errors
    } catch (e) {
      // Silent fail for audio
    }
  }, [enableAudio, isAudioReady]);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const y = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    
    // Update URL hash without jump
    history.replaceState(null, null, `#${sectionId}`);
  }, [headerOffset]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + headerOffset + 100;
      
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
          }
        }
      });
      
      // Header elevation on scroll
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, headerOffset]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Magnetic effect helper
  const getMagneticProps = (isHovered) => {
    if (!enableMagnetic) return {};
    return {
      whileHover: { scale: 1.03 },
      transition: { type: "spring", stiffness: 400, damping: 25 },
    };
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        className={`header ${isScrolled ? "header--scrolled" : ""} ${className}`}
        data-primary={primaryColor}
        data-secondary={secondaryColor}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        role="banner"
      >
        {/* Logo */}
        <motion.button
          className="header__logo"
          onClick={() => scrollToSection(logoHref.replace("#", ""))}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={playHoverSound}
          aria-label={`Navigate to ${brandName} home`}
        >
          <span className="logo__text">{brandName}</span>
          <span className="logo__accent" aria-hidden="true" />
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="header__nav" aria-label="Primary navigation">
          {sections.map((section, index) => (
            <motion.button
              key={section}
              className={`nav-item magnetic ${activeSection === section ? "nav-item--active" : ""}`}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={playHoverSound}
              onClick={() => scrollToSection(section)}
              aria-current={activeSection === section ? "page" : undefined}
              {...getMagneticProps()}
            >
              <span className="nav-item__text">{section}</span>
              <motion.span
                className="nav-item__underline"
                initial={{ width: 0 }}
                animate={{ width: activeSection === section ? "100%" : 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="header__mobile-toggle"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            playHoverSound();
          }}
          whileTap={{ scale: 0.9 }}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className="toggle-icon" aria-hidden="true">
            <span className={`toggle-line ${isMobileMenuOpen ? "toggle-line--open" : ""}`} />
            <span className={`toggle-line ${isMobileMenuOpen ? "toggle-line--open" : ""}`} />
            <span className={`toggle-line ${isMobileMenuOpen ? "toggle-line--open" : ""}`} />
          </span>
        </motion.button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            className="header__mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile navigation"
          >
            {sections.map((section, index) => (
              <motion.button
                key={section}
                className={`mobile-nav-item ${activeSection === section ? "mobile-nav-item--active" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(section)}
                onMouseEnter={playHoverSound}
              >
                <span className="mobile-nav-item__text">{section}</span>
                {activeSection === section && (
                  <motion.span
                    className="mobile-nav-item__indicator"
                    layoutId="mobile-active-indicator"
                    transition={{ type: "spring", bounce: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator (Subtle Brand Touch) */}
      <motion.div
        className="header__progress"
        style={{
          scaleX: useScrollProgress(),
          originX: 0,
          backgroundColor: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
        }}
        aria-hidden="true"
      />
    </>
  );
}

// Helper hook for scroll progress
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return progress;
}

export default Header;