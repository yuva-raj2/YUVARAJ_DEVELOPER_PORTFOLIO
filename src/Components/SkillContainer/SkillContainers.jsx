import React, { useMemo, useState } from "react";
import { Element } from "react-scroll";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import "react-circular-progressbar/dist/styles.css";
import "./SkillContainers.css";

const SkillContainers = ({
  skills: propSkills,
  sectionTitle = "My Technical Expertise",
  sectionSubtitle = "Technologies I use to build fast, reliable websites",
  primaryColor = "#38f5d0",
  secondaryColor = "#22d3ee",
  showCategories = true,
}) => {
  // ✅ Fallback data
  const defaultSkills = useMemo(() => [
    { name: "React", value: 90, color: "#61dbfb", category: "Frontend", specialty: true },
    { name: "TypeScript", value: 88, color: "#3178c6", category: "Frontend" },
    { name: "Tailwind CSS", value: 85, color: "#38bdf8", category: "Frontend" },
    { name: "Node.js", value: 85, color: "#68a063", category: "Backend" },
    { name: "Java", value: 80, color: "#e76f00", category: "Backend" },
    { name: "Spring Boot", value: 80, color: "#66ff99", category: "Backend" },
    { name: "PostgreSQL", value: 82, color: "#336791", category: "Database" },
    { name: "WhatsApp API", value: 90, color: "#25D366", category: "Automation", specialty: true },
    { name: "Google Maps", value: 85, color: "#4285F4", category: "Integration", specialty: true },
  ], []);

  const skills = propSkills?.length > 0 ? propSkills : defaultSkills;

  // ✅ Group by category
  const groupedSkills = useMemo(() => {
    if (!showCategories) return { All: skills };
    return skills.reduce((acc, skill) => {
      const cat = skill.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});
  }, [skills, showCategories]);

  // ✅ Debug: Check if data exists
  if (skills.length === 0) {
    console.error("⚠️ Skills array is empty!");
    return <div style={{ padding: 40, color: "red" }}>Skills data missing</div>;
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Yuvaraj",
            "knowsAbout": skills.map((s) => s.name),
          })}
        </script>
      </Helmet>

      <Element name="Skills" id="Skills">
        <motion.section
          className="skills-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          style={{ "--primary": primaryColor, "--secondary": secondaryColor }}
        >
          <motion.header
            className="skills-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="skills-title">{sectionTitle}</h2>
            {sectionSubtitle && <p className="skills-subtitle">{sectionSubtitle}</p>}
          </motion.header>

          {Object.entries(groupedSkills).map(([category, catSkills]) => (
            <div key={category} className="skills-category-group">
              <h3 className="category-title">{category}</h3>
              <div className="skills-grid">
                {catSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className={`skill-card ${skill.specialty ? "specialty" : ""}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    {skill.specialty && <span className="specialty-badge">⭐ Most Used</span>}
                    
                    <div className="circle-wrapper">
                      <CircularProgressbar
                        value={skill.value} // ✅ Direct value (no complex state)
                        text={`${skill.value}%`}
                        styles={buildStyles({
                          textColor: "#fff",
                          pathColor: skill.color,
                          trailColor: "rgba(255,255,255,0.1)",
                          textSize: "16px",
                        })}
                      />
                    </div>

                    <p className="skill-name">{skill.name}</p>
                    <span className="skill-level">{skill.value >= 90 ? "Expert" : "Advanced"}</span>
                    <div className="skill-accent" style={{ background: skill.color }} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.section>
      </Element>
    </>
  );
};

export default SkillContainers;