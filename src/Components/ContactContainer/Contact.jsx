import './Contact.css';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

function Contact() {
  const formRef = useRef();
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_t8aw06b', // Your EmailJS Service ID
        'template_eh8rn37', // Your EmailJS Template ID
        formRef.current,
        'TTMPEz5u1wRYY-ybE' // Your Public API KEY
      )
      .then(() => {
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        e.target.reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <section id="Contact" className="contact-section">
      <motion.h1 className="contact-title">
        Let’s Build Something
      </motion.h1>

      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        Have a business idea, automation need or product concept?
        Let’s talk.
      </p>
      <motion.form
        ref={formRef}
        onSubmit={sendEmail}
        className="contact-form"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="form-group">
          <label>Your Name</label>
          <input type="text" name="user_name" required />
        </div>

        <div className="form-group">
          <label>Your Email</label>
          <input type="email" name="user_email" required />
        </div>

        <div className="form-group">
          <label>Your Message</label>
          <textarea name="message" rows="5" required></textarea>
        </div>

        <motion.button
          type="submit"
          className="send-btn"
          whileHover={{ scale: 1.1 }}
        >
          Send Message
        </motion.button>

        {sent && <p className="success-message">✔ Message Sent Successfully!</p>}
      </motion.form>
    </section>
  );
}
export default Contact;
