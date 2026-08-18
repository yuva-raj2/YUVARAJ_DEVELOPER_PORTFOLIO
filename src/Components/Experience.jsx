import { motion } from "framer-motion";
import { portfolioData } from "./data/portfolioData";

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section className="section experience" id="experience">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">
            EXPERIENCE
          </span>

          <h2>
            Where I have learned, built and taught.
          </h2>

          <p className="section-subtitle">
            My journey has moved between software development,
            teaching and building practical technology solutions.
          </p>
        </motion.div>

        <div className="experience-timeline">
          {experience.map((item, index) => (
            <motion.article
              className="experience-item"
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
              }}
            >
              <div className="experience-marker">
                <span
                  className={
                    item.type === "Current"
                      ? "experience-dot current"
                      : "experience-dot"
                  }
                />
              </div>

              <div className="experience-card">
                <div className="experience-top">
                  <div>
                    <span className="experience-period">
                      {item.period}
                    </span>

                    {item.type === "Current" && (
                      <span className="experience-current">
                        CURRENT
                      </span>
                    )}
                  </div>
                </div>

                <h3>{item.role}</h3>

                <h4>{item.company}</h4>

                <p>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}