import { motion } from "framer-motion";
import { portfolioData } from "./data/portfolioData";

const highlights = [
  {
    number: "01",
    title: "Engineering",
    text: "I enjoy turning real-world requirements into clean, maintainable software."
  },
  {
    number: "02",
    title: "Teaching",
    text: "I simplify technical concepts and help students understand how software is built."
  },
  {
    number: "03",
    title: "Product Thinking",
    text: "I am interested not only in writing code, but also in turning ideas into useful products."
  }
];

export default function About() {
  const { about } = portfolioData;

  return (
    <section className="section about" id="about">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">ABOUT ME</span>

          <h2>{about.title}</h2>
        </motion.div>

        <div className="about-layout">
          <motion.div
            className="about-copy"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            className="about-highlights"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {highlights.map((item) => (
              <article className="about-card" key={item.number}>
                <span className="about-card-number">
                  {item.number}
                </span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}