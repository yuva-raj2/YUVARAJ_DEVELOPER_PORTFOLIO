import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = ({ faqs, title, primaryColor = "#7c3aed" }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="faq-section" aria-label="Frequently asked questions">
      <div className="faq-container">
        <h2 className="faq-title">{title}</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              initial={false}
            >
              <button
                className="faq-question"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.q}</span>
                <motion.span 
                  className="faq-toggle"
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;