import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Element } from "react-scroll";
import { useInView } from "react-intersection-observer";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion, useAnimation } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";
import "./SkillContainers.css";

/**
 * SkillContainers - Professional Portfolio Skills Section
 * 
 * A brandable, accessible, and performant skills display with animated progress circles,
 * in-view triggers, magnetic interactions, and professional visual hierarchy.
 * 
 * @param {Object} props
 * @param {Array<Object>} [props.skills] - Skill items: { name, value (0-100), color, icon? }
 * @param {string} [props.sectionTitle="Technology Stack"] - Section heading text
 * @param {string} [props.sectionSubtitle] - Subtitle/description text
 * @param {string} [props.primaryColor="#38f5d0"] - Brand primary color
 * @param {string} [props.secondaryColor="#22d3ee"] - Brand secondary color
 * @param {string} [props.bgColor="rgba(15,23,42,0.6)"] - Section background
 * @param {number} [props.animationDuration=20] - Ms per progress point (lower = faster)
 * @param {boolean} [props.enableMagnetic=true] - Enable magnetic hover effects
 * @param {boolean} [props.enableGlow=true] - Enable neon glow on hover
 * @param {number} [props.glowIntensity=0.35] - Glow opacity multiplier
 * @param {boolean} [props.reduceMotion] - Force reduced motion (auto-detected if undefined)
 * @param {string} [props.elementId="Skills"] - Section ID for anchor links
 * @param {number} [props.inViewThreshold=0.3] - Intersection Observer threshold
 */
function SkillContainers({
  skills: propSkills,
  sectionTitle = "Technology Stack",
  sectionSubtitle = "Tools & technologies powering our solutions",
  primaryColor = "#38f5d0",
  secondaryColor = "#22d3ee",
  bgColor = "rgba(15,23,42,0.6)",
  animationDuration = 20,
  enableMagnetic = true,
  enableGlow = true,
  glowIntensity = 0.35,
  reduceMotion: propReduceMotion,
  elementId = "Skills",
  inViewThreshold = 0.3,
}) {
  // Default skills if not provided
  const defaultSkills = useMemo(() => [
    { name: "HTML", value: 95, color: "#ff7b00" },
    { name: "CSS", value: 90, color: "#00b7ff" },
    { name: "React", value: 85, color: "#61dbfb" },
    { name: "Java", value: 80, color: "#e76f00" },
    { name: "Spring Boot", value: 80, color: "#66ff99" },
    { name: "JavaScript", value: 88, color: "#f4e04d" },
    { name: "SQL", value: 75, color: "#2db7ff" },
  ], []);

  const skills = useMemo(() => propSkills || defaultSkills, [propSkills, defaultSkills]);
  
  const [progress, setProgress] = useState(() => skills.map(() => 0));
  const [isReducedMotion, setIsReducedMotion] = useState(propReduceMotion ?? false);
  const animationRef = useRef(null);
  const sectionRef = useRef(null);
  const controls = useAnimation();

  // Detect reduced motion preference
  useEffect(() => {
    if (propReduceMotion === undefined) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
      const handleChange = (e) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener?.("change", handleChange);
      return () => mediaQuery.removeEventListener?.("change", handleChange);
    }
  }, [propReduceMotion]);

  // Intersection observer for section entrance
  const { ref: inViewRef, inView } = useInView({
    threshold: inViewThreshold,
    triggerOnce: true,
  });

  // Merge refs for both inView and section
  const setRefs = useCallback((node) => {
    inViewRef(node);
    sectionRef.current = node;
  }, [inViewRef]);

  // Animate progress bars on view
  useEffect(() => {
    if (!inView || isReducedMotion) {
      // Instant fill if reduced motion
      setProgress(skills.map((skill) => skill.value));
      return;
    }

    const start = performance.now();
    const maxValue = Math.max(...skills.map((s) => s.value));
    const totalDuration = maxValue * animationDuration;

    const animate = (time) => {
      const elapsed = time - start;
      const progressValue = Math.min(100, Math.floor(elapsed / animationDuration));

      setProgress(
        skills.map((skill) => Math.min(skill.value, progressValue))
      );

      if (elapsed < totalDuration) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [inView, skills, animationDuration, isReducedMotion]);

  // Section entrance animation
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
      });
    }
  }, [inView, controls]);

  // Magnetic effect props helper
  const getMagneticProps = (skillColor) => {
    if (!enableMagnetic || isReducedMotion) return {};
    return {
      whileHover: { 
        scale: 1.08,
        boxShadow: enableGlow ? `0 0 30px ${skillColor}${Math.floor(glowIntensity * 255).toString(16).padStart(2, '0')}` : undefined,
      },
      transition: { type: "spring", stiffness: 300, damping: 20 },
    };
  };

  // Brand styles for progress bar
  const getProgressStyles = useCallback((skillColor) => 
    buildStyles({
      textColor: "#ffffff",
      pathColor: skillColor,
      trailColor: "rgba(255, 255, 255, 0.12)",
      textSize: "16px",
      pathTransitionDuration: 0.4,
      pathTransition: "stroke-dashoffset 0.4s ease",
    }), 
  []);

  return (
    <Element name={elementId} id={elementId}>
      <motion.section
        ref={setRefs}
        className="skills-container"
        style={{
          "--brand-primary": primaryColor,
          "--brand-secondary": secondaryColor,
          "--brand-bg": bgColor,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        role="region"
        aria-labelledby="skills-heading"
      >
        {/* Decorative gradient overlay */}
        <div className="skills-overlay" aria-hidden="true" />

        {/* Section Header */}
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
  <h2 
  id="skills-heading" 
  className="skills-title"
  style={{
    background: `linear-gradient(135deg, #ffffff 0%, ${primaryColor} 50%, ${secondaryColor} 100%)`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",           // ✅ Add standard property
    WebkitTextFillColor: "transparent",
    // ❌ Remove: color: "red"
  }}
>
  {sectionTitle}
</h2>
          {sectionSubtitle && (
            <p className="skills-subtitle">{sectionSubtitle}</p>
          )}
        </motion.div>

        {/* Skills Grid */}
        <div className="skills-grid" role="list" aria-label="Technical skills">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              className="skill-card"
              role="listitem"
              aria-label={`${skill.name}: ${progress[index]}% proficiency`}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: 0.15 + index * 0.06,
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1]
              }}
              {...getMagneticProps(skill.color)}
              data-skill={skill.name}
            >
              {/* Progress Circle */}
              <div className="circle-wrapper">
                <CircularProgressbar
                  value={isReducedMotion ? skill.value : progress[index]}
                  text={`${isReducedMotion ? skill.value : progress[index]}%`}
                  styles={getProgressStyles(skill.color)}
                />
              </div>

              {/* Skill Name & Optional Icon */}
              <div className="skill-info">
                <p className="skill-name">{skill.name}</p>
                {skill.value >= 90 && (
                  <span className="skill-badge" aria-label="Expert level">
                  </span>
                )}
              </div>

              {/* Subtle bottom accent */}
              <div 
                className="skill-accent" 
                style={{ backgroundColor: skill.color }}
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>

        {/* Optional: Skill Legend for Accessibility */}
        <div className="skills-legend" aria-hidden="true">
          <span className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: primaryColor }} />
          </span>
        </div>
      </motion.section>
    </Element>
  );
}

export default SkillContainers;