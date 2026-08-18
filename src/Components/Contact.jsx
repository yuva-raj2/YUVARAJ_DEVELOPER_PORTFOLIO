import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { portfolioData } from "./data/portfolioData";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    setStatus({
      type: "",
      message: "",
    });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: "error",
        message:
          "Email service is not configured yet. Please use the direct contact options below.",
      });
      return;
    }

    try {
      setIsSending(true);

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        {
          publicKey,
        }
      );

      setStatus({
        type: "success",
        message:
          "Thanks for reaching out. Your message has been sent successfully.",
      });

      setFormData(initialForm);
    } catch (error) {
      console.error("EmailJS submission failed:", error);

      setStatus({
        type: "error",
        message:
          "Something went wrong while sending your message. Please try one of the direct contact options below.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const openLinkedIn = () => {
    window.open(
      "https://www.linkedin.com/yuvaraj-r-497908214/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openGitHub = () => {
    window.open(
      "https://github.com/yuva-raj2",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <motion.div
          className="section-heading contact-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-kicker">LET'S CONNECT</span>

          <h2>{portfolioData.contact.title}</h2>

          <p>
            {portfolioData.contact.description}
          </p>
        </motion.div>

        <div className="contact-layout">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-intro">
              <span className="contact-label">
                OPEN TO
              </span>

              <h3>
                Software projects, product ideas & technical collaborations.
              </h3>

              <p>
                I prefer starting with the problem first. Once the requirement
                is clear, we can decide whether the right solution is a
                website, web application, automation workflow or a larger
                software product.
              </p>
            </div>

            <div className="contact-links">
              <a
                href="mailto:yuvaarun09964@gmail.com"
                className="contact-link"
              >
                <span className="contact-link-icon">✉</span>

                <span>
                  <small>Email</small>
                  <strong>Let's talk via email</strong>
                </span>
              </a>

              <button
                type="button"
                className="contact-link contact-link-button"
                onClick={openLinkedIn}
              >
                <span className="contact-link-icon">in</span>

                <span>
                  <small>LinkedIn</small>
                  <strong>Connect professionally</strong>
                </span>
              </button>

              <button
                type="button"
                className="contact-link contact-link-button"
                onClick={openGitHub}
              >
                <span className="contact-link-icon">⌘</span>

                <span>
                  <small>GitHub</small>
                  <strong>Explore my code</strong>
                </span>
              </button>
            </div>

            <div className="contact-note">
              <span>Based in</span>
              <strong>Coimbatore, Tamil Nadu, India</strong>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <form
              ref={formRef}
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What would you like to build?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me a little about your idea or requirement..."
                  rows="7"
                  required
                />
              </div>

              <button
                type="submit"
                className="button button-primary contact-submit"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>

              {status.message && (
                <p
                  className={`form-status ${
                    status.type === "success"
                      ? "form-status-success"
                      : "form-status-error"
                  }`}
                  role="status"
                >
                  {status.message}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}