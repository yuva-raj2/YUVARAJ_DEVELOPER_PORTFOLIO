import { motion } from "framer-motion";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-top"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="footer-brand">
            <button
              type="button"
              className="footer-logo"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              Y
            </button>

            <div>
              <h3>Yuvaraj R</h3>

              <p>
                Full Stack Developer · Technical Trainer
              </p>
            </div>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-socials">
            <a
              href="https://linkedin.com/in/yuvaraj-r-497908214/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/yuva-raj2"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              GitHub
            </a>

            <a
              href="mailto:yuvaarun09964@gmail.com"
              aria-label="Email"
            >
              Email
            </a>
          </div>
        </motion.div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>
            © {currentYear} Yuvaraj R. Built with React,
            Three.js and a lot of curiosity.
          </p>

          <a
            href="#home"
            className="back-to-top"
            onClick={(event) => {
              event.preventDefault();
              scrollToTop();
            }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}