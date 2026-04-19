import React, { useMemo, useRef, useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";

/**
 * Header - Professional Portfolio Navigation (Optimized)
 * 
 * @param {Object} props
 * @param {string} [props.brandName="Yuvitra Labs"] - Brand name
 * @param {string} [props.logoHref="Home"] - Logo destination section ID (without #)
 * @param {Array<string>} [props.sections] - Navigation sections
 * @param {string} [props.primaryColor="#38f5d0"] - Brand primary color
 * @param {string} [props.secondaryColor="#22d3ee"] - Brand secondary color
 * @param {string} [props.audioUrl] - Hover sound URL (null to disable)
 * @param {number} [props.audioVolume=0.4] - Audio volume (0.0-1.0)
 * @param {boolean} [props.enableAudio=true] - Enable hover audio
 * @param {number} [props.headerOffset=80] - Scroll offset for anchor links
 * @param {boolean} [props.enableMagnetic=true] - Enable magnetic hover effect
 * @param {string} [props.whatsappNumber] - WhatsApp number for CTA (e.g., "919876543210")
 * @param {string} [props.className] - Additional CSS classes
 */
const Header = memo(function Header({
  brandName = "Yuvitra Labs",
  logoHref = "Home",
  sections: propSections,
  primaryColor = "#38f5d0",
  secondaryColor = "#22d3ee",
  audioUrl = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_7e046feee4.mp3?filename=click-124467.mp3",
  audioVolume = 0.4,
  enableAudio = true,
  headerOffset = 80,
  enableMagnetic = true,
  whatsappNumber = "",
  className = "",
}) {
  const audioRef = useRef(null);
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [activeSection, setActiveSection] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Default sections
  const sections = useMemo(() => 
    propSections || ["Home", "About", "Projects", "Skills", "Experience", "Services", "Contact"],
    [propSections]
  );

  // Clean section ID (remove # if present)
  const cleanSectionId = useCallback((id) => id.replace(/^#/, ""), []);

  // Initialize audio with user gesture requirement
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
      
      // Mark user interaction for audio unlock
      const unlockAudio = () => {
        setHasUserInteracted(true);
        document.removeEventListener("click", unlockAudio);
        document.removeEventListener("keydown", unlockAudio);
        document.removeEventListener("touchstart", unlockAudio);
      };
      
      document.addEventListener("click", unlockAudio, { once: true, passive: true });
      document.addEventListener("keydown", unlockAudio, { once: true, passive: true });
      document.addEventListener("touchstart", unlockAudio, { once: true, passive: true });
      
      return () => {
        audioRef.current?.removeEventListener("canplaythrough", onCanPlay);
        audioRef.current?.removeEventListener("error", onError);
        document.removeEventListener("click", unlockAudio);
        document.removeEventListener("keydown", unlockAudio);
        document.removeEventListener("touchstart", unlockAudio);
      };
    } catch (e) {
      console.warn("Header: Audio initialization failed", e);
    }
  }, [enableAudio, audioUrl, audioVolume]);

  // Play hover sound (only after user interaction)
  const playHoverSound = useCallback(() => {
    if (!enableAudio || !isAudioReady || !hasUserInteracted || !audioRef.current) return;
    try {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      playPromise?.catch(() => {}); // Silent fail for autoplay restrictions
    } catch (e) {
      // Silent fail
    }
  }, [enableAudio, isAudioReady, hasUserInteracted]);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId) => {
    const id = cleanSectionId(sectionId);
    const element = document.getElementById(id);
    if (!element) return;

    const y = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    history.replaceState(null, null, `#${id}`);
  }, [headerOffset, cleanSectionId]);

  // Track active section on scroll (throttled)
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking) return;
      
      requestAnimationFrame(() => {
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
        
        setIsScrolled(window.scrollY > 10);
        ticking = false;
      });
      
      ticking = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, headerOffset]);

  // Close mobile menu on Escape + click outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        document.querySelector('.header__mobile-toggle')?.focus();
      }
    };
    
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    
    // Focus first nav item when menu opens
    setTimeout(() => {
      mobileMenuRef.current?.querySelector('.mobile-nav-item')?.focus();
    }, 100);
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Keyboard navigation for nav items
  const handleNavKeyDown = useCallback((e, section, index) => {
    const navItems = e.currentTarget.parentElement?.querySelectorAll('.nav-item');
    if (!navItems) return;
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = navItems[(index + 1) % navItems.length];
      next?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = navItems[(index - 1 + navItems.length) % navItems.length];
      prev?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection(section);
    }
  }, [scrollToSection]);

  // Magnetic effect helper (coordinate with NeonCursor)
  const getMagneticProps = () => {
    if (!enableMagnetic) return {};
    return {
      whileHover: { scale: 1.02, y: -1 },
      whileTap: { scale: 0.98 },
      transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.1 }
    };
  };

  // Scroll progress calculation (optimized)
  const scrollProgress = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
  }, [isScrolled]); // Recalculate on scroll state change

  return (
    <>
      {/* ♿ Skip Link for Accessibility */}
     
      
      <motion.header
        ref={headerRef}
        className={`header ${isScrolled ? "header--scrolled" : ""} ${className}`}
        style={{
          '--header-primary': primaryColor,
          '--header-secondary': secondaryColor
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        role="banner"
      >
        {/* Logo */}
        <motion.button
          className="header__logo magnetic"
          onClick={() => scrollToSection(logoHref)}
          onMouseEnter={playHoverSound}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToSection(logoHref);
            }
          }}
          aria-label={`Navigate to ${brandName} home`}
          tabIndex={0}
          {...getMagneticProps()}
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
              transition={{ delay: index * 0.04, duration: 0.3 }}
              onMouseEnter={playHoverSound}
              onClick={() => scrollToSection(section)}
              onKeyDown={(e) => handleNavKeyDown(e, section, index)}
              aria-current={activeSection === section ? "page" : undefined}
              tabIndex={0}
              {...getMagneticProps()}
            >
              <span className="nav-item__text">{section}</span>
              <motion.span
                className="nav-item__underline"
                initial={{ width: 0 }}
                animate={{ width: activeSection === section ? "100%" : 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              />
            </motion.button>
          ))}
        </nav>

        {/* Desktop CTA Button (Conversion Booster!) */}
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi%20Yuvaraj,%20I%20saw%20your%20portfolio%20and%20need%20help%20with%20[website/automation]`}
            target="_blank"
            rel="noopener noreferrer"
            className="header__cta-btn magnetic"
            onMouseEnter={playHoverSound}
            {...getMagneticProps()}
          >
            <span className="cta-icon" aria-hidden="true">💬</span>
            <span className="cta-text">Free Quote</span>
          </a>
        )}

        {/* Mobile Menu Toggle */}
        <motion.button
          className="header__mobile-toggle"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            playHoverSound();
          }}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          tabIndex={0}
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
            ref={mobileMenuRef}
            className="header__mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile navigation"
            role="dialog"
            aria-modal="true"
          >
            {sections.map((section, index) => (
              <motion.button
                key={section}
                className={`mobile-nav-item ${activeSection === section ? "mobile-nav-item--active" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => scrollToSection(section)}
                onMouseEnter={playHoverSound}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToSection(section);
                  }
                }}
                tabIndex={0}
              >
                <span className="mobile-nav-item__text">{section}</span>
                {activeSection === section && (
                  <motion.span
                    className="mobile-nav-item__indicator"
                    layoutId="mobile-active-indicator"
                    transition={{ type: "spring", bounce: 0.2 }}
                    aria-hidden="true"
                  />
                )}
              </motion.button>
            ))}
            
            {/* WhatsApp CTA in Mobile Menu */}
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi%20Yuvaraj,%20I%20saw%20your%20portfolio%20and%20need%20help%20with%20[website/automation]`}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-whatsapp-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="whatsapp-icon" aria-hidden="true">💬</span>
                <span>Get Free Quote on WhatsApp</span>
              </a>
            )}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator - FIXED GRADIENT */}
      <motion.div
        className="header__progress"
        style={{
          scaleX: scrollProgress,
          originX: 0,
          background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`, // ✅ Fixed: use 'background' not 'backgroundColor'
        }}
        aria-hidden="true"
      />
    </>
  );
});

export default Header;