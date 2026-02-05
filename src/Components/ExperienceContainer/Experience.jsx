import "./Experience.css";
import { motion } from "framer-motion";

function Experience() {
  const timeline = [
    {
      role: "Java Full Stack Developer – Intern",
      company: "Maxbyte Technologies",
      duration: "Sep 2025 – Present",
      points: [
        "Improved Shift Allocation Module with UI/UX enhancements.",
        "Integrated APIs to improve workflow accuracy.",
        "Fixed checklist configuration bugs and enhanced data quality.",
      ],
    },
    {
      role: "Web Development Mentor & CSE Teacher",
      company: "Beula Matriculation Hr Sec School",
      duration: "Mar 2025 – Aug 2025",
      points: [
        "Trained students in HTML, CSS, JavaScript, React & Python.",
        "Developed a Student Result Portal using React + Spring Boot.",
        "Automated WhatsApp result messaging using Excel + VBA.",
      ],
    },
    {
      role: "Java Full Stack Trainee",
      company: "Tap Academy",
      duration: "May 2024 – Nov 2024",
      points: [
        "Completed structured full-stack training.",
        "Built REST APIs and multiple full-stack practice projects.",
      ],
    },
  ];

  return (
    <section id="experience" className="exp-section">
      <motion.h1 className="exp-title" id="Experience">
  Experience & Trust
</motion.h1>

      <div className="timeline">
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            className="timeline-item"
            initial={{ x: i % 2 === 0 ? -60 : 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="timeline-dot" />

            <div className="timeline-card">
              <h2>{item.role}</h2>
              <h3>{item.company}</h3>
              <span className="duration">{item.duration}</span>

              <ul>
                {item.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
