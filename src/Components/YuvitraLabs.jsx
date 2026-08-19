import { motion } from "framer-motion";
import { portfolioData } from "./data/portfolioData";

export default function YuvitraLabs() {
  const { yuvitraLabs } = portfolioData;

  const handleExplore = () => {
    window.open(
      "https://YOUR-YUVITRA-LABS-URL.com",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="section yuvitra-labs" id="labs">
      <div className="container">
        <motion.div
          className="labs-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="labs-glow labs-glow-one" />
          <div className="labs-glow labs-glow-two" />

          <div className="labs-content">
            <div className="labs-badge">
              <span className="labs-status-dot" />
              BUILDING WITH YUVITRA LABS
            </div>

            <span className="section-kicker">
              BEYOND THE PORTFOLIO
            </span>

            <h2>{yuvitraLabs.title}</h2>

            <p className="labs-description">
              {yuvitraLabs.description}
            </p>

            <div className="labs-pill-list">
              <span>Software Products</span>
              <span>SaaS Experiments</span>
              <span>Automation</span>
              <span>AI Solutions</span>
            </div>

            <div className="labs-actions">
              <button
                type="button"
                className="button button-primary"
                onClick={handleExplore}
              >
                {yuvitraLabs.cta}
                <span className="labs-button-arrow">
                  ↗
                </span>
              </button>
            </div>
          </div>

          <div className="labs-visual" aria-hidden="true">
            <div className="labs-orbit orbit-one">
              <span />
            </div>

            <div className="labs-orbit orbit-two">
              <span />
            </div>

            <div className="labs-core">
              <div className="labs-core-inner">
                <span className="labs-core-name">
                  Y
                </span>

                <span className="labs-core-label">
                  YUVITRA LABS
                </span>
              </div>
            </div>

            <div className="labs-product product-one">
              <span className="product-dot" />
              SaaS
            </div>

            <div className="labs-product product-two">
              <span className="product-dot" />
              AI
            </div>

            <div className="labs-product product-three">
              <span className="product-dot" />
              Automation
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}