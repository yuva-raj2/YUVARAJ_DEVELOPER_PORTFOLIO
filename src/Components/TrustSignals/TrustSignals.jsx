import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './TrustSignals.css';

/**
 * TrustSignals - Social Proof Component
 * Displays trust badges to build instant credibility with visitors
 * 
 * @param {Object} props
 * @param {Array<{icon: string|ReactNode, label: string, description?: string}>} props.items - Trust items to display
 * @param {string} [props.title="Why Trust Us?"] - Section heading
 * @param {string} [props.subtitle] - Optional subheading below title
 * @param {string} [props.primaryColor="#7c3aed"] - Brand primary color (hex)
 * @param {string} [props.secondaryColor="#38f5d0"] - Brand secondary color (hex)
 * @param {boolean} [props.enableHover=true] - Enable hover animations
 * @param {function} [props.onItemClick] - Optional click tracking callback
 * @param {string} [props.className] - Additional CSS classes
 */
const TrustSignals = ({
  items = [],
  title = "Why Businesses Trust Yuvitra Labs",
  subtitle,
  primaryColor = "#7c3aed",
  secondaryColor = "#38f5d0",
  enableHover = true,
  onItemClick,
  className = "",
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants (optimized for performance)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
        mass: 0.1,
      },
    },
  };

  // Hover variants (only if enabled + not reduced motion)
  const hoverVariants = enableHover && !prefersReducedMotion ? {
    hover: {
      y: -4,
      scale: 1.02,
      boxShadow: `0 12px 40px ${primaryColor}25`,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  } : {};

  // Handle item click with optional tracking
  const handleItemClick = (item, index) => {
    onItemClick?.(item, index);
    // Optional: Add analytics here
    // gtag('event', 'trust_badge_click', { item_label: item.label });
  };

  return (
    <section 
      className={`trust-section ${className}`} 
      aria-label={title}
      style={{
        '--trust-primary': primaryColor,
        '--trust-secondary': secondaryColor,
      }}
    >
      <div className="trust-container">
        {/* Section Header */}
        <header className="trust-header">
          <h3 className="trust-title">{title}</h3>
          {subtitle && <p className="trust-subtitle">{subtitle}</p>}
        </header>

        {/* Trust Items Grid */}
        <motion.div
          className="trust-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          role="list"
          aria-label="Trust indicators"
        >
          {items.map((item, index) => {
            const isInteractive = !!onItemClick;
            
            return (
              <motion.div
                key={item.label || index}
                className={`trust-item ${isInteractive ? 'trust-item--interactive' : ''}`}
                variants={itemVariants}
                whileHover="hover"
                {...hoverVariants}
                onClick={() => isInteractive && handleItemClick(item, index)}
                onKeyDown={(e) => {
                  if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleItemClick(item, index);
                  }
                }}
                role={isInteractive ? "button" : "listitem"}
                tabIndex={isInteractive ? 0 : -1}
                aria-label={item.description || item.label}
                style={{
                  borderColor: `${primaryColor}33`,
                  background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}05)`,
                }}
              >
                {/* Icon: Support SVG or emoji */}
                <span className="trust-icon" aria-hidden="true">
                  {typeof item.icon === 'string' && item.icon.startsWith('<svg') ? (
                    <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                  ) : typeof item.icon === 'object' ? (
                    item.icon
                  ) : (
                    <span className="trust-icon-emoji">{item.icon}</span>
                  )}
                </span>

                {/* Content */}
                <div className="trust-content">
                  <span className="trust-label">{item.label}</span>
                  {item.description && (
                    <span className="trust-description">{item.description}</span>
                  )}
                </div>

                {/* Subtle glow effect on hover */}
                <span 
                  className="trust-glow" 
                  aria-hidden="true"
                  style={{ 
                    background: `radial-gradient(circle, ${primaryColor}40 0%, transparent 70%)` 
                  }} 
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;