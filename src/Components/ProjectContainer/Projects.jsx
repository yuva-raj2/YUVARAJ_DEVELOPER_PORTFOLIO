import React from "react";
import { motion } from "framer-motion";
import "./Projects.css";

/**
 * Projects - Individual Project Card Component
 * Optimized for conversion + accessibility
 */
function Projects({
  title,
  subtitle,
  desc,
  problem,
  solution,
  result,
  img,
  tech,
  niche,
  link,
  featured = false,
  caseStudy = false,
  whatsappLink,
  primaryColor = "#7c3aed",
  secondaryColor = "#38f5d0",
  onViewCaseStudy,
  onClick,
}) {
  // Generate hover glow color
  const glowColor = `${primaryColor}40`;
  
  return (
    <motion.article
      className={`project-card ${featured ? 'project-card--featured' : ''}`}
      whileHover={{ y: -6, boxShadow: `0 20px 60px ${glowColor}` }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      role="listitem"
      aria-labelledby={`project-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{
        '--card-primary': primaryColor,
        '--card-secondary': secondaryColor,
        borderColor: featured ? `${primaryColor}60` : undefined,
      }}
    >
      {/* Featured Badge */}
      {featured && (
        <span className="featured-badge" aria-label="Most relevant for your business">
          🎯 Perfect for {niche}
        </span>
      )}

      {/* Project Image */}
      <div className="project-img">
        <img 
          src={img} 
          alt={title} 
          loading="lazy"
          width="400"
          height="220"
        />
        {/* Overlay gradient */}
        <div className="img-overlay" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="project-content">
        <header className="project-header">
          <h3 
            id={`project-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="project-title"
          >
            {title}
          </h3>
          {subtitle && <span className="project-subtitle">{subtitle}</span>}
        </header>

        <p className="project-desc">{desc}</p>

        {/* Tech Badges */}
        {tech?.length > 0 && (
          <div className="tech-badges" aria-label="Technologies used">
            {tech.map((t, i) => (
              <span key={i} className="tech-badge">{t}</span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="project-actions">
          {caseStudy && onViewCaseStudy && (
            <button
              className="btn-case-study"
              onClick={(e) => {
                e.stopPropagation();
                onViewCaseStudy();
              }}
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              📖 View Case Study
            </button>
          )}
          
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: '#25D366' }}
            >
              💬 Ask About This
            </a>
          )}
          
          {link !== "#" && !caseStudy && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-view"
              onClick={(e) => e.stopPropagation()}
            >
              🔗 View Live
            </a>
          )}
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div 
        className="project-accent" 
        style={{ 
          background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` 
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

export default Projects;