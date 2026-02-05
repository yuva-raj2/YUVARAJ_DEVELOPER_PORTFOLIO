import React, { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import { useInView } from "react-intersection-observer";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";
import "./SkillContainers.css";

function SkillContainers() {
  const skills = [
    { name: "HTML", value: 95, color: "#ff7b00" },
    { name: "CSS", value: 90, color: "#00b7ff" },
    { name: "React", value: 85, color: "#61dbfb" },
    { name: "Java", value: 80, color: "#e76f00" },
    { name: "Spring Boot", value: 80, color: "#66ff99" },
    { name: "JavaScript", value: 88, color: "#f4e04d" },
    { name: "SQL", value: 75, color: "#2db7ff" }
  ];

  const [progress, setProgress] = useState(skills.map(() => 0));
  const animationRef = useRef(null);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();

    const animate = (time) => {
      const elapsed = time - start;

      setProgress(
        skills.map((skill) =>
          Math.min(skill.value, Math.floor(elapsed / 20))
        )
      );

      if (elapsed < Math.max(...skills.map((s) => s.value)) * 20) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [inView]);

  return (
    <Element name="Skills" id="Skills">
      <motion.section
        ref={ref}
        className="skills-container neon-bg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="skills-title"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Technology Stack
        </motion.h1>
        <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
          Tools & technologies powering our solutions
        </p>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card neon-card magnetic"
              whileHover={{
                scale: 1.12,
                boxShadow: `0 0 30px ${skill.color}`
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="circle-wrapper">
                <CircularProgressbar
                  value={progress[index]}
                  text={`${progress[index]}%`}
                  styles={buildStyles({
                    textColor: "#ffffff",
                    pathColor: skill.color,
                    trailColor: "#1f2933",
                    textSize: "16px",
                    pathTransition: "stroke-dashoffset 0.5s ease"
                  })}
                />
              </div>

              <p className="skill-name">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </Element>
  );
}

export default SkillContainers;
