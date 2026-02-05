import "./Services.css";
import { motion } from "framer-motion";

function Services() {
  const services = [
    {
      title: "Full Stack Web Application",
      price: "₹15,000 – ₹40,000",
      desc: "End-to-end custom web applications using React & Spring Boot.",
      points: [
        "Responsive UI",
        "REST APIs",
        "Database Integration",
        "Admin Dashboards",
      ],
    },
    {
      title: "Portfolio / Business Website",
      price: "₹5,000 – ₹12,000",
      desc: "Modern portfolio or business landing websites with clean UI.",
      points: [
        "Fast & Lightweight",
        "SEO Optimized",
        "Smooth Animations",
        "Mobile Friendly",
      ],
    },
    {
      title: "Automation Tools",
      price: "₹3,000 – ₹10,000",
      desc: "Automation solutions using Excel, VBA & APIs.",
      points: [
        "Excel Automation",
        "Custom Scripts",
        "WhatsApp API",
        "Workflow Optimization",
      ],
    },
  ];

  return (
    <section id="Services" className="services-section">
      <motion.h1
        className="services-title"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Services
      </motion.h1>
      <p style={{ color: "#94a3b8", marginBottom: "40px" }}>
        Professional services by Yuvitra Labs
      </p>

      <div className="services-grid">
        {services.map((s, i) => (
          <motion.div
            key={i}
            className="service-card"
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 160 }}
          >
            <h2>{s.title}</h2>
            <h3 className="service-price">{s.price}</h3>
            <p className="service-desc">{s.desc}</p>

            <ul className="service-points">
              {s.points.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>

            <motion.button
              className="hire-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Services;
