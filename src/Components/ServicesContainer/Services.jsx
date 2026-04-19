import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import './Services.css';

/**
 * Services - Conversion-Optimized Pricing Section
 * For Construction & Photography Business Clients
 * 
 * @param {Object} props
 * @param {Array} props.services - Service cards data
 * @param {string} [props.title="How I Can Help Your Business"] - Section heading
 * @param {string} [props.subtitle] - Optional subheading
 * @param {string} [props.primaryColor="#7c3aed"] - Brand primary color
 * @param {string} [props.secondaryColor="#38f5d0"] - Brand secondary color
 * @param {string} [props.whatsappNumber] - WhatsApp number for CTAs (e.g., "919876543210")
 * @param {string} [props.ctaText="Get This Package"] - Default CTA button text
 * @param {boolean} [props.enableHover=true] - Enable hover animations
 * @param {function} [props.onCardClick] - Optional click tracking callback
 * @param {string} [props.className] - Additional CSS classes
 */
function Services({
  services: propServices,
  title = "How I Can Help Your Business",
  subtitle = "Simple, transparent packages designed for construction & photography businesses",
  primaryColor = "#7c3aed",
  secondaryColor = "#38f5d0",
  whatsappNumber = "918667851286", // ✅ REPLACE WITH YOUR NUMBER
  ctaText = "Get This Package",
  enableHover = true,
  onCardClick,
  className = "",
}) {
  const prefersReducedMotion = useReducedMotion();

  // Default services data (niche-focused)
  const defaultServices = [
    {
      id: "website",
      title: "Business Website",
      subtitle: "For Contractors & Photographers",
      price: "₹5,000 – ₹12,000",
      desc: "Perfect for: Construction companies, Photographers, Small businesses",
      points: [
        "Mobile-friendly design (looks great on phones)",
        "Google Maps integration (get found locally)",
        "WhatsApp chat button (instant customer contact)",
        "Fast loading speed (under 3 seconds)",
        "SEO optimized (rank higher on Google)",
        "Contact forms & click-to-call buttons"
      ],
      bonus: "🎁 Free Google My Business setup",
      niche: ["construction", "photography", "small business"],
      tech: ["React", "Tailwind", "Netlify"],
      popular: true, // ✅ Highlight this card
      cta: "Get This Package",
      whatsappMessage: "Hi Yuvaraj, I'm interested in the Business Website package for my [construction/photography] business."
    },
    {
      id: "webapp",
      title: "Web Application",
      subtitle: "Custom Solutions",
      price: "₹15,000 – ₹40,000",
      desc: "For businesses needing advanced features:",
      points: [
        "Online booking / pre-order systems",
        "Customer management dashboards",
        "Inventory tracking & reports",
        "Automated workflows",
        "Payment integration (Razorpay/Stripe)"
      ],
      bonus: "🎁 Free 30-day bug-fix support",
      niche: ["complex business needs", "scalable solutions"],
      tech: ["React", "Spring Boot", "PostgreSQL", "AWS"],
      popular: false,
      cta: "Discuss Your Project",
      whatsappMessage: "Hi Yuvaraj, I need a custom web application for my business. Can we discuss?"
    },
    {
      id: "automation",
      title: "Automation Tools",
      subtitle: "Save Time & Money",
      price: "₹3,000 – ₹10,000",
      desc: "Automate repetitive tasks:",
      points: [
        "WhatsApp auto-replies & notifications",
        "Excel/Google Sheets data automation",
        "Automated report generation",
        "Email workflow automation",
        "API integrations (Google, WhatsApp, etc.)"
      ],
      bonus: "🎁 Free setup guide + video tutorial",
      niche: ["save time", "reduce manual work"],
      tech: ["Node.js", "WhatsApp Business API", "Zapier"],
      popular: false,
      cta: "Automate My Business",
      whatsappMessage: "Hi Yuvaraj, I want to automate [task] for my business. What's possible?"
    }
  ];

  const services = propServices || defaultServices;

  // Generate WhatsApp link with pre-filled message
  const getWhatsAppLink = (message) => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message || "Hi Yuvaraj, I saw your services and need help!");
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  };

  // Handle card click with optional tracking
  const handleCardClick = (service, index) => {
    onCardClick?.(service, index);
    // Optional analytics: gtag('event', 'service_card_click', { service_id: service.id });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  // Hover variants (only if enabled + not reduced motion)
  const hoverVariants = enableHover && !prefersReducedMotion ? {
    hover: {
      y: -6,
      scale: 1.01,
      boxShadow: `0 20px 60px ${primaryColor}30`,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  } : {};

  // Schema.org structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "Person",
      "name": "Yuvaraj",
      "url": typeof window !== "undefined" ? window.location.href : ""
    },
    "serviceType": "Web Development & Automation",
    "areaServed": "India",
    "offers": services.map(s => ({
      "@type": "Offer",
      "name": s.title,
      "description": s.desc,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "INR",
        "minPrice": parseInt(s.price.replace(/[^\d,]/g, '').split('–')[0]),
        "maxPrice": parseInt(s.price.replace(/[^\d,]/g, '').split('–')[1] || s.price.replace(/[^\d,]/g, ''))
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <section 
        id="Services" 
        className={`services-section ${className}`}
        aria-label="Services offered by Yuvitra Labs"
        style={{
          '--services-primary': primaryColor,
          '--services-secondary': secondaryColor,
        }}
      >
        {/* Section Header */}
        <motion.header 
          className="services-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="services-title">{title}</h2>
          {subtitle && <p className="services-subtitle">{subtitle}</p>}
        </motion.header>

        {/* Services Grid */}
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          role="list"
          aria-label="Service packages"
        >
          {services.map((service, index) => {
            const isPopular = service.popular;
            const whatsappLink = getWhatsAppLink(service.whatsappMessage);
            
            return (
              <motion.article
                key={service.id || index}
                className={`service-card ${isPopular ? 'service-card--popular' : ''}`}
                variants={cardVariants}
                whileHover="hover"
                {...hoverVariants}
                onClick={() => handleCardClick(service, index)}
                role="listitem"
                aria-labelledby={`service-title-${service.id || index}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(service, index);
                  }
                }}
                style={{
                  borderColor: `${primaryColor}40`,
                  background: `linear-gradient(135deg, ${primaryColor}08, ${secondaryColor}05)`,
                }}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <span className="popular-badge" aria-label="Most popular package">
                    🔥 Most Popular
                  </span>
                )}

                {/* Card Header */}
                <header className="service-header">
                  <h3 
                    id={`service-title-${service.id || index}`}
                    className="service-title"
                    style={{ color: isPopular ? primaryColor : undefined }}
                  >
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <span className="service-subtitle">{service.subtitle}</span>
                  )}
                </header>

                {/* Price */}
                <div className="service-price-wrapper">
                  <span className="service-price">{service.price}</span>
                  {service.bonus && (
                    <span className="service-bonus">{service.bonus}</span>
                  )}
                </div>

                {/* Description */}
                <p className="service-desc">{service.desc}</p>

                {/* Features List */}
                <ul className="service-points" role="list">
                  {service.points.map((point, idx) => (
                    <li key={idx} className="service-point">
                      <span className="point-check" aria-hidden="true">✓</span>
                      <span className="point-text">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Badges */}
                {service.tech?.length > 0 && (
                  <div className="service-tech" aria-label="Technologies used">
                    {service.tech.map((tech, idx) => (
                      <span key={idx} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                )}

                {/* Niche Tags */}
                {service.niche?.length > 0 && (
                  <div className="service-niche" aria-label="Best for">
                    <span className="niche-label">Best for:</span>
                    <span className="niche-tags">
                      {service.niche.map((tag, idx) => (
                        <span key={idx} className="niche-tag">{tag}</span>
                      ))}
                    </span>
                  </div>
                )}

                {/* CTA Button */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`service-cta ${isPopular ? 'service-cta--popular' : ''}`}
                  onClick={(e) => e.stopPropagation()} // Prevent card click
                  aria-label={`${service.cta || ctaText} via WhatsApp`}
                >
                  <span className="cta-icon" aria-hidden="true">💬</span>
                  {service.cta || ctaText}
                </a>

                {/* Subtle glow effect */}
                <span 
                  className="service-glow" 
                  aria-hidden="true"
                  style={{ 
                    background: `radial-gradient(circle, ${isPopular ? primaryColor : secondaryColor}30 0%, transparent 70%)` 
                  }} 
                />
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="services-bottom-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="bottom-cta-text">
            Not sure which package fits? Let's chat!
          </p>
          <a
            href={getWhatsAppLink("Hi Yuvaraj, I'm not sure which package fits my business. Can you help me choose?")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            💬 Get Free Consultation on WhatsApp
          </a>
        </motion.div>
      </section>
    </>
  );
}

export default Services;