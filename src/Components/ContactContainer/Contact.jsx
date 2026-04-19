import './Contact.css';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

function Contact() {
  const formRef = useRef();

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const sendEmail = async (e) => {
    e.preventDefault();

    if (status.loading) return; // prevent double submit

    setStatus({ loading: true, success: false, error: false });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );

      setStatus({ loading: false, success: true, error: false });
      e.target.reset();

      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false });
      }, 3000);
    } catch (err) {
      console.error("Email Error:", err);
      setStatus({ loading: false, success: false, error: true });
    }
  };

  return (
    <section id="Contact" className="contact-section">
      <motion.h1
        className="contact-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Let’s Build Something
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Have a business idea, automation need or product concept?
        Let’s talk.
      </motion.p>

      <motion.form
        ref={formRef}
        onSubmit={sendEmail}
        className="contact-form"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input id="name" type="text" name="user_name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input id="email" type="email" name="user_email" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>

        <motion.button
          type="submit"
          className="send-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={status.loading}
        >
          {status.loading ? "Sending..." : "Send Message"}
        </motion.button>

        {status.success && (
          <p className="success-message">✔ Message Sent Successfully!</p>
        )}

        {status.error && (
          <p className="error-message">❌ Failed to send. Try again.</p>
        )}
      </motion.form>
    </section>
  );
}

export default Contact;