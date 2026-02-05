import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import "./Header.css";

function Header() {
  const audioRef = useRef(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_7e046feee4.mp3?filename=click-124467.mp3"
    );
    audioRef.current.volume = 0.4;
  }

  const playHover = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = 80;
    const y =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const sections = useMemo(
    () => ["Home", "About", "Projects", "Skills", "Experience", "Services", "Contact"],
    []
  );

  return (
    <motion.header
      className="header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo */}
      <motion.h1
        className="logo"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={() => scrollToSection("Home")}
      >
        Yuvitra Labs
      </motion.h1>
      <nav className="nav">
        {sections.map((section, index) => (
          <motion.button
            key={section}
            className="nav-item magnetic"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={playHover}
            onClick={() => scrollToSection(section)}
          >
            <span>{section}</span>
            <motion.div
              className="underline"
              whileHover={{ width: "100%" }}
            />
          </motion.button>
        ))}
      </nav>
    </motion.header>
  );
}

export default Header;
