import { motion } from "framer-motion";
import "./IndependentWork.css";

const tags = [
  "SaaS",
  "AI",
  "Automation",
  "Product Ideas",
];

export default function IndependentWork() {
  return (
    <section
      className="independent-work"
      id="independent-work"
    >
      <div className="container">
        <motion.div
          className="independent-work__card"
          initial={{
            opacity: 0,
            y: 28,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.65,
          }}
        >
          <div className="independent-work__content">
            <span className="section-kicker">
              INDEPENDENT WORK
            </span>

            <h2 className="independent-work__title">
              Building beyond day-to-day development.
            </h2>

            <p className="independent-work__description">
              Alongside my professional work and teaching, I spend
              time experimenting with software products, SaaS ideas
              and practical automation through Yuvitra Labs.
            </p>

            <a
              href="https://YOUR-YUVITRA-LABS-URL.com"
              target="_blank"
              rel="noreferrer"
              className="independent-work__button"
            >
              Explore Yuvitra Labs
              <span>↗</span>
            </a>
          </div>

          <div
            className="independent-work__visual"
            aria-hidden="true"
          >
            <div className="independent-work__orbital-ring" />

            <div className="independent-work__core">
              <span className="independent-work__core-letter">
                Y
              </span>

              <span className="independent-work__core-label">
                YUVITRA LABS
              </span>
            </div>

            <div className="independent-work__tags">
              {tags.map((tag) => (
                <span
                  className="independent-work__tag"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}