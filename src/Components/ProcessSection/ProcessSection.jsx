import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import './ProcessSection.css';

/**
 * ProcessSection - Conversion-Optimized Workflow Display
 * Builds trust by showing transparency + managing expectations
 * 
 * @param {Object} props
 * @param {Array<Object>} props.steps - Process steps: { step, title, desc, deliverables?, duration? }
 * @param {string} [props.title="How I Work – Simple & Transparent"] - Section heading
 * @param {string} [props.subtitle] - Optional subheading
 * @param {string} [props.primaryColor="#7c3aed"] - Brand primary color
 * @param {string} [props.secondaryColor="#38f5d0"] - Brand secondary color
 * @param {string} [props.whatsappNumber] - WhatsApp number for CTA (e.g., "919876543210")
 * @param {boolean} [props.showTimeline=true] - Show animated connector line
 * @param {boolean} [props.enableHover=true] - Enable hover animations
 * @param {function} [props.onStepClick] - Optional click tracking callback
 * @param {string} [props.className] - Additional CSS classes
 */
const ProcessSection = ({
  steps = [],
  title = "📋 How I Work – Simple & Transparent",
  subtitle = "No guesswork. No surprises. Just clear steps to get your project done.",
  primaryColor = "#7c3aed",
  secondaryColor = "#38f5d0",
  whatsappNumber = "918667851286", // ✅ REPLACE WITH YOUR NUMBER
  showTimeline = true,
  enableHover = true,
  onStepClick,
  className = "",
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Default steps (niche-focused for construction/photography)
  const defaultSteps = [
    {
      step: 1,
      title: "Discovery Call (15 mins)",
      desc: "We discuss your business needs via WhatsApp/call. No pressure, just clarity.",
      duration: "15 mins",
      deliverables: ["Clear project scope", "Timeline estimate", "No-obligation quote"],
      icon: "💬"
    },
    {
      step: 2,
      title: "Proposal & Quote",
      desc: "I send a detailed plan with timeline and pricing – usually same day.",
      duration: "Same day",
      deliverables: ["Written proposal", "Fixed-price quote", "Milestone breakdown"],
      icon: "📄"
    },
    {
      step: 3,
      title: "50% Advance to Start",
      desc: "Secure your spot in my schedule. Secure payment via UPI/Bank transfer.",
      duration: "Instant",
      deliverables: ["Project kickoff", "Access to project tracker", "Weekly update schedule"],
      icon: "🔐"
    },
    {
      step: 4,
      title: "Build & Test (7-14 days)",
      desc: "I build your solution with regular updates. You review progress anytime.",
      duration: "7-14 days",
      deliverables: ["Working prototype", "Mobile testing", "Client feedback rounds"],
      icon: "🛠️"
    },
    {
      step: 5,
      title: "Launch + 7-Day Support",
      desc: "Final payment, go live, and 7 days of free bug-fix support.",
      duration: "1 day + 7 days support",
      deliverables: ["Live website/app", "Handover documentation", "7-day free support"],
      icon: "🚀"
    }
  ];

  const processSteps = steps.length > 0 ? steps : defaultSteps;

  // Generate WhatsApp link
  const getWhatsAppLink = () => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent("Hi Yuvaraj, I'd like to start a project. Can we schedule a discovery call?");
    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  // Handle step click with optional tracking
  const handleStepClick = (step, index) => {
    onStepClick?.(step, index);
    // Optional analytics: gtag('event', 'process_step_view', { step_number: step.step });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 14 }
    }
  };

  // Hover variants (only if enabled + not reduced motion)
  const hoverVariants = enableHover && !prefersReducedMotion ? {
    hover: {
      x: 4,
      borderColor: `${primaryColor}80`,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  } : {};

  // Schema.org structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Web Development Process",
    "provider": { "@type": "Person", "name": "Yuvaraj" },
    "serviceOutput": processSteps.map(s => ({
      "@type": "HowToStep",
      "position": s.step,
      "name": s.title,
      "text": s.desc,
      "estimatedDuration": s.duration
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <section 
        className={`process-section ${className}`}
        aria-label={title}
        style={{
          '--process-primary': primaryColor,
          '--process-secondary': secondaryColor,
        }}
      >
        <div className="process-container">
          {/* Section Header */}
          <motion.header 
            className="process-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="process-title">{title}</h2>
            {subtitle && <p className="process-subtitle">{subtitle}</p>}
            
            {/* Total Timeline Badge */}
            <div className="process-timeline-badge">
              <span className="timeline-icon" aria-hidden="true">⏱️</span>
              <span>Typical project: <strong>7-14 days</strong> from start to launch</span>
            </div>
          </motion.header>

          {/* Animated Connector Line (Desktop) */}
          {showTimeline && !prefersReducedMotion && (
            <div className="process-connector" aria-hidden="true">
              <motion.div 
                className="connector-line"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ backgroundColor: primaryColor }}
              />
            </div>
          )}

          {/* Steps List */}
          <motion.ol 
            className="process-steps"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            role="list"
            aria-label="Project workflow steps"
          >
            {processSteps.map((step, index) => (
              <motion.li
                key={step.step}
                className="process-step"
                variants={stepVariants}
                whileHover="hover"
                {...hoverVariants}
                onClick={() => handleStepClick(step, index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick(step, index);
                  }
                }}
                role="listitem"
                tabIndex={0}
                aria-labelledby={`step-title-${step.step}`}
                style={{
                  borderLeftColor: `${primaryColor}60`,
                  '--step-primary': primaryColor,
                  '--step-secondary': secondaryColor,
                }}
              >
                {/* Step Number + Icon */}
                <div className="step-marker">
                  
                  <span className="step-icon" aria-hidden="true">{step.icon}</span>
                </div>

                {/* Step Content */}
                <div className="step-content">
                  <header className="step-header">
                    <h3 
                      id={`step-title-${step.step}`}
                      className="step-title"
                    >
                      {step.title}
                    </h3>
                    {step.duration && (
                      <span className="step-duration" style={{ color: primaryColor }}>
                        ⏱️ {step.duration}
                      </span>
                    )}
                  </header>
                  
                  <p className="step-desc">{step.desc}</p>

                  {/* Deliverables List */}
                  {step.deliverables?.length > 0 && (
                    <div className="step-deliverables">
                      <span className="deliverables-label">You get:</span>
                      <ul className="deliverables-list">
                        {step.deliverables.map((item, idx) => (
                          <li key={idx} className="deliverable-item">
                            <span className="deliverable-check" aria-hidden="true">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Subtle glow effect */}
                <span 
                  className="step-glow" 
                  aria-hidden="true"
                  style={{ 
                    background: `radial-gradient(circle, ${primaryColor}30 0%, transparent 70%)` 
                  }} 
                />
              </motion.li>
            ))}
          </motion.ol>

          {/* Bottom CTA */}
          <motion.div 
            className="process-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="cta-text">
              Ready to start your project? Let's talk!
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ 
                background: `linear-gradient(135deg, #25D366, #128C7E)`,
                boxShadow: `0 8px 32px rgba(37, 211, 102, 0.4)`
              }}
            >
              💬 Start Your Project on WhatsApp
            </a>
            <p className="cta-note">
              No commitment • Free 15-min consultation • Response within 2-4 hours
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProcessSection;