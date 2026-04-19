import React, { useMemo, useState } from "react";
import { Element } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Projects from "./Projects";
import "./ProjectContainer.css";
import ShiftAllocationImage from "../../assets/shift-allocation.png";
import MultiLangSupport from  "../../assets/multi-lang.png";
/**
 * ProjectContainer - Conversion-Optimized Portfolio Showcase
 * For Construction & Photography Business Clients
 */
function ProjectContainer({
  projects: propProjects,
  sectionTitle = "Recent Projects",
  sectionSubtitle = "Real results for construction & photography businesses",
  primaryColor = "#7c3aed",
  secondaryColor = "#38f5d0",
  whatsappNumber = "918667851286", // ✅ REPLACE WITH YOUR NUMBER
  enableFiltering = true,
  onProjectClick,
  className = "",
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  // ✅ Niche-focused project data (Problem → Solution → Result format)
  const defaultProjects = useMemo(() => [
    {
      id: "shift-allocation",
      title: "Shift Allocation System",
      subtitle: "",
      img: ShiftAllocationImage,
      desc: "Manual shift scheduling was causing confusion and delays for a 50+ worker construction team.",
      problem: "🔍 Problem: Manual scheduling caused 3+ hours of weekly admin time + frequent shift conflicts",
      solution: "🛠️ Solution: Built React dashboard with dynamic assignment, real-time API sync, mobile view, auto-notifications",
      result: "📈 Result: 70% time savings, zero conflicts, workers can view shifts on phone",
      tech: ["React", "Spring Boot", "PostgreSQL", "WhatsApp API"],
      niche: "construction",
      link: "#",
      caseStudy: true,
      featured: true, // ✅ Highlight for target niche
      whatsappMessage: "Hi Yuvaraj, I saw your Shift Allocation project. Can you build something similar for my construction business?"
    },
    {
      id: "translation-integration",
      title: "Multi-Language Support",
      subtitle: "",
      img:MultiLangSupport,
      desc: "Google Cloud Translation API integration with UI stability fixes for international clients.",
      problem: "🔍 Problem: Photographer losing international clients due to language barrier",
      solution: "🛠️ Solution: Integrated Google Translation API with React, added language switcher, fixed UI flicker",
      result: "📈 Result: 3x faster content updates, 40% increase in international inquiries",
      tech: ["React", "Google Cloud API", "i18n"],
      niche: "photography",
      link: "#",
      caseStudy: true,
      featured: true,
      whatsappMessage: "Hi Yuvaraj, I need multi-language support for my photography website. Can you help?"
    },
    {
      id: "whatsapp-automation",
      title: "WhatsApp Business Automation",
      subtitle: "For Small Business",
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
      desc: "Automated Excel data sharing + WhatsApp notifications using VB macros + API integration.",
      problem: "🔍 Problem: Business owner spending 2+ hours daily manually sending quotes via WhatsApp",
      solution: "🛠️ Solution: Built Excel macro + WhatsApp Business API integration for auto-quote sending",
      result: "📈 Result: Saved 10+ hours/week, 95% faster quote delivery, fewer manual errors",
      tech: ["Visual Basic", "WhatsApp Business API", "Excel", "Node.js"],
      niche: "automation",
      link: "#",
      caseStudy: true,
      featured: true,
      whatsappMessage: "Hi Yuvaraj, I want to automate my WhatsApp messages like your project. What's possible?"
    },
    {
      id: "chatbot-support",
      title: "Technical Support Chatbot",
      subtitle: "AI-Powered Ticket System",
      img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      desc: "AI chatbot for automated ticket generation and technical support queries.",
      problem: "🔍 Problem: Support team overwhelmed with repetitive queries, slow response times",
      solution: "🛠️ Solution: Built React + Spring Boot chatbot with NLP for auto-ticket creation",
      result: "📈 Result: 60% reduction in manual tickets, 24/7 instant responses, happier customers",
      tech: ["React", "Spring Boot", "AI/NLP", "PostgreSQL"],
      niche: "automation",
      link: "#",
      caseStudy: false,
      featured: false,
      whatsappMessage: "Hi Yuvaraj, I'm interested in adding a chatbot to my website. Can we discuss?"
    },
    {
      id: "checklist-bugfix",
      title: "Checklist Configuration Fix",
      subtitle: "Internal Tool Enhancement",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      desc: "Improved checklist accuracy and consistency through systematic debugging.",
      problem: "🔍 Problem: Inconsistent checklist data causing reporting errors",
      solution: "🛠️ Solution: Debugged Excel logic, added validation rules, improved UI feedback",
      result: "📈 Result: 100% data accuracy, faster report generation, fewer support tickets",
      tech: ["Excel", "Debugging", "UI/UX"],
      niche: "automation",
      link: "#",
      caseStudy: false,
      featured: false,
      whatsappMessage: "Hi Yuvaraj, I have a similar data consistency issue. Can you help fix it?"
    }
  ], []);

  const projects = useMemo(() => propProjects || defaultProjects, [propProjects, defaultProjects]);
  
  // Filter options
  const filters = useMemo(() => {
    const niches = [...new Set(projects.map(p => p.niche))];
    return ["All", ...niches.map(n => n.charAt(0).toUpperCase() + n.slice(1))];
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(p => p.niche === activeFilter.toLowerCase());
  }, [projects, activeFilter]);

  // Generate WhatsApp link
  const getWhatsAppLink = (message) => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message || "Hi Yuvaraj, I saw your project portfolio and need help!");
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  };

  // Schema.org structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yuvaraj",
    "hasPortfolio": projects.map(p => ({
      "@type": "CreativeWork",
      "name": p.title,
      "description": p.desc,
      "keywords": p.tech.join(", "),
      "url": p.link !== "#" ? p.link : undefined
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Element name="Projects" id="projects" className={`project-container ${className}`}>
        {/* Section Header */}
        <motion.header 
          className="project-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            '--project-primary': primaryColor,
            '--project-secondary': secondaryColor,
          }}
        >
          <h2 className="project-title">{sectionTitle}</h2>
          {sectionSubtitle && <p className="project-subtitle">{sectionSubtitle}</p>}
          
          {/* Niche Filter Tabs */}
          {enableFiltering && filters.length > 1 && (
            <div className="project-filters" role="tablist" aria-label="Filter projects by niche">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                  role="tab"
                  aria-selected={activeFilter === filter}
                  style={{
                    borderColor: activeFilter === filter ? primaryColor : undefined,
                    backgroundColor: activeFilter === filter ? `${primaryColor}20` : undefined,
                    color: activeFilter === filter ? primaryColor : undefined,
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </motion.header>

        {/* Projects Grid */}
        <motion.div 
          className="projects-grid"
          role="list"
          aria-label="Project portfolio"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ delay: index * 0.08 }}
              >
                <Projects
                  {...project}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  whatsappLink={getWhatsAppLink(project.whatsappMessage)}
                  onViewCaseStudy={() => setSelectedProject(project)}
                  onClick={() => onProjectClick?.(project, index)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <CaseStudyModal 
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              whatsappLink={getWhatsAppLink(selectedProject.whatsappMessage)}
              primaryColor={primaryColor}
            />
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div 
          className="project-bottom-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="bottom-cta-text">
            Don't see exactly what you need? Let's build it together.
          </p>
          <a
            href={getWhatsAppLink("Hi Yuvaraj, I have a project idea. Can we discuss?")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            💬 Start a Conversation on WhatsApp
          </a>
        </motion.div>
      </Element>
    </>
  );
}

// ✅ Case Study Modal Component
function CaseStudyModal({ project, onClose, whatsappLink, primaryColor }) {
  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${project.id}`}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{ '--modal-primary': primaryColor }}
      >
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="Close case study"
        >
          ✕
        </button>
        
        <div className="modal-image">
          <img src={project.img} alt={project.title} loading="lazy" />
        </div>
        
        <div className="modal-body">
          <h3 id={`modal-title-${project.id}`} className="modal-title">
            {project.title}
            {project.subtitle && <span className="modal-subtitle"> – {project.subtitle}</span>}
          </h3>
          
          <div className="case-study-sections">
            <div className="case-section">
              <h4>🔍 The Problem</h4>
              <p>{project.problem}</p>
            </div>
            <div className="case-section">
              <h4>🛠️ The Solution</h4>
              <p>{project.solution}</p>
            </div>
            <div className="case-section">
              <h4>📈 The Result</h4>
              <p>{project.result}</p>
            </div>
          </div>
          
          <div className="modal-tech">
            <span className="tech-label">Technologies:</span>
            {project.tech.map((t, i) => (
              <span key={i} className="tech-badge">{t}</span>
            ))}
          </div>
          
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-cta"
            style={{ backgroundColor: primaryColor }}
          >
            💬 Discuss a Similar Project on WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectContainer;