// src/components/Hero.jsx

import { motion } from "framer-motion";
import HeroScene from "./three/HeroScene";
import { portfolioData } from "../Components/data/portfolioData";

export default function Hero() {
  const {
    name,
    roles,
    hero
  } = portfolioData;

  const scrollToWork = () => {
    document
      .getElementById("work")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const openLabs = () => {
    window.open(
      "https://yuvitra-labs.vercel.app",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="hero section" id="home">
      <div className="hero-background">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
      </div>

      <div className="container hero-layout">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">
            {hero.eyebrow}
          </span>

          <h1>
            {hero.title}
          </h1>

          <p className="hero-description">
            {hero.description}
          </p>

          <div className="hero-role-list">
            {roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>

          <div className="hero-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={scrollToWork}
            >
              {hero.primaryCta}
            </button>

            <button
              type="button"
              className="button button-secondary"
              onClick={openLabs}
            >
              {hero.secondaryCta}
            </button>
          </div>

          <div className="hero-meta">
            <span>Coimbatore, India</span>
            <span>Available for selected opportunities</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <HeroScene />

          <div className="hero-orbit-card">
            <strong>{name}</strong>
            <span>Software • Teaching • Building</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}