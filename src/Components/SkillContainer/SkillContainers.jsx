import React, { useEffect, useState } from "react";
import { Element } from "react-scroll";
import { useInView } from "react-intersection-observer";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./SkillContainers.css";
import ReactImage from "../../assets/Skills-Image.png";

function SkillContainers() {
  const skills = [
    {name : "HTML", value:90, color:"#62948F"},
    {name : "CSS",value:90, color:"#17D534"},
    { name: "React", value: 85, color: "#61DBFB" },
    { name: "Java", value: 70, color: "#E76F00" },
    { name: "Node.js", value: 80, color: "#3C873A" },
    { name: "JavaScript", value: 85, color: "#F7DF1E" },
    { name: "SQL", value: 75, color: "#00618A" },
  ];

  const [progress, setProgress] = useState(skills.map(() => 0));
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setProgress((prev) =>
          prev.map((p, i) => {
            if (p < skills[i].value) return p + 2;
            return skills[i].value;
          })
        );
      }, 40);
      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <Element name="Skills" id="skills">
      <div className="skills-container" ref={ref}>
        <div className="skills-left">
          <img src={ReactImage} alt="Skills" />
        </div>

        <div className="skills-right">
          <h1>My Skills</h1>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <CircularProgressbar
                  value={progress[index]}
                  text={`${progress[index]}%`}
                  styles={buildStyles({
                    textColor: "#222",
                    pathColor: skill.color,
                    trailColor: "#eee",
                    pathTransitionDuration: 0.5,
                    textSize: "16px",
                    strokeLinecap: "round",
                    rotation: 0.25, // Start from bottom-left for smooth rotation
                  })}
                />
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Element>
  );
}

export default SkillContainers;
