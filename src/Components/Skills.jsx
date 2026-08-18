import { motion } from "framer-motion";
import { portfolioData } from "./data/portfolioData";

const skillGroups = [
  {
    key: "frontend",
    label: "Frontend Engineering",
    description:
      "Building responsive interfaces and interactive experiences for the web.",
  },
  {
    key: "backend",
    label: "Backend Engineering",
    description:
      "Designing APIs, business logic and secure application backends.",
  },
  {
    key: "database",
    label: "Data & Storage",
    description:
      "Working with relational databases and application data layers.",
  },
  {
    key: "tools",
    label: "Development Tools",
    description:
      "Tools I use to build, version, package and deploy applications.",
  },
  {
    key: "exploring",
    label: "Currently Exploring",
    description:
      "Technologies and concepts I'm actively learning and experimenting with.",
  },
];

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">
            TECHNICAL STACK
          </span>

          <h2>
            Tools I use to turn ideas into software.
          </h2>

          <p className="section-subtitle">
            I don't try to collect every technology. I focus on
            technologies that help me solve real application and
            product problems.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const items = skills[group.key] ?? [];

            return (
              <motion.article
                className={`skill-group ${
                  group.key === "exploring"
                    ? "skill-group-exploring"
                    : ""
                }`}
                key={group.key}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
              >
                <div className="skill-group-header">
                  <span className="skill-group-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3>{group.label}</h3>
                    <p>{group.description}</p>
                  </div>
                </div>

                <div className="skill-list">
                  {items.map((skill) => (
                    <span
                      className="skill-chip"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="skills-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <span className="skills-footer-line" />

          <p>
            My core focus is{" "}
            <strong>
              Java + Spring Boot + React
            </strong>
            , while continuously exploring AI,
            cloud and product engineering.
          </p>

          <span className="skills-footer-line" />
        </motion.div>
      </div>
    </section>
  );
}