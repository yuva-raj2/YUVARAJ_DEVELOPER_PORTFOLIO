import React from "react";
import "./Projects.css";
import { motion } from "framer-motion";

function Projects({ title, desc, img, link, tech }) {
  return (
    <motion.div
      className="project-card"
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 140 }}
    >
      <div className="project-img">
        <img src={img} alt={title} />
      </div>

      <div className="project-content">
        <h2>{title}</h2>
        <p>{desc}</p>

        <div className="tech-badges">
          {tech?.map((t, i) => (
            <span key={i} className="badge">{t}</span>
          ))}
        </div>

        {link !== "#" && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <button className="view-btn">View Project</button>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default Projects;
