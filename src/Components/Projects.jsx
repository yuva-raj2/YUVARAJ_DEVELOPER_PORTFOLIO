import { motion } from "framer-motion";
import { portfolioData } from "./data/portfolioData";

const projectLinks = {
  "Student Result Portal": {
    live: "#",
    code: "#",
  },
  "AI Support Platform": {
    live: "#",
    code: "#",
  },
  "Industrial IoT Platform": {
    live: "#",
    code: "#",
  },
  "WhatsApp Automation": {
    live: "#",
    code: "#",
  },
};

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section className="section projects" id="work">
      <div className="container">
        <motion.div
          className="section-heading projects-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">
            SELECTED WORK
          </span>

          <h2>
            A few things I've built along the way.
          </h2>

          <p className="section-subtitle">
            A selection of software projects and practical
            systems that reflect how I approach engineering,
            product thinking and problem solving.
          </p>
        </motion.div>

        <div className="projects-list">
          {projects.map((project, index) => {
            const links =
              projectLinks[project.title] ?? {
                live: "#",
                code: "#",
              };

            return (
              <motion.article
                className="project-card"
                key={project.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.12,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
              >
                <div className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="project-main">
                  <div className="project-top">
                    <span className="project-category">
                      {project.category}
                    </span>

                    <span className="project-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3>{project.title}</h3>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="project-stack">
                    {project.stack.map((technology) => (
                      <span
                        className="project-tech"
                        key={technology}
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a
                      href={links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link project-link-primary"
                      aria-label={`View ${project.title}`}
                    >
                      View Project
                      <span aria-hidden="true">↗</span>
                    </a>

                    <a
                      href={links.code}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                      aria-label={`View source code for ${project.title}`}
                    >
                      Source
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>

                <div
                  className="project-visual"
                  aria-hidden="true"
                >
                  <div className="project-visual-grid" />

                  <div className="project-orb project-orb-one" />
                  <div className="project-orb project-orb-two" />

                  <div className="project-visual-center">
                    <span>
                      {project.category}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}