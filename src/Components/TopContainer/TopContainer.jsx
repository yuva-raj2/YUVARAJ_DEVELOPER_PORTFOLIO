import React from 'react';
import { Element } from 'react-scroll';
import TopContent from '../TopContent/TopContent';
import SkillContainers from '../SkillContainer/SkillContainers';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import Services from '../ServicesContainer/Services';
import Experience from '../ExperienceContainer/Experience';
import Contact from '../ContactContainer/Contact';
// ✅ NEW: Import conversion-focused sections
import TrustSignals from '../TrustSignals/TrustSignals';
import ProcessSection from '../ProcessSection/ProcessSection';
import FAQSection from '../FAQSection/FAQSection';

function TopContainer(/*{
  description: string,        // New subtitle text
  ctaPrimary: { text, href }, // Primary button config
  ctaSecondary: { text, href }, // Secondary button
  trustBadges: string[],      // Array of trust badge texts
  whatsappNumber: string      // For WhatsApp CTA
}*/) {
  // ✅ NICHE-FOCUSED SKILLS (Prioritize what construction/photography clients care about)
  const customSkills = [
    { name: "React", value: 90, color: "#61dbfb", category: "Frontend" },
    { name: "TypeScript", value: 88, color: "#3178c6", category: "Frontend" },
    { name: "JavaScript", value: 88, color: "#f4e04d", category: "Frontend" },
    { name: "Tailwind CSS", value: 85, color: "#38bdf8", category: "Frontend" }, // ✅ Added
    { name: "Node.js", value: 85, color: "#68a063", category: "Backend" },
    { name: "Java", value: 80, color: "#e76f00", category: "Backend" },
    { name: "Spring Boot", value: 80, color: "#66ff99", category: "Backend" },
    { name: "PostgreSQL", value: 82, color: "#336791", category: "Database" },
    { name: "WhatsApp Business API", value: 90, color: "#25D366", category: "Automation" }, // ✅ Niche-relevant!
    { name: "Google Maps API", value: 85, color: "#4285F4", category: "Integration" }, // ✅ Niche-relevant!
    { name: "Docker", value: 78, color: "#2496ed", category: "DevOps" },
    { name: "AWS", value: 75, color: "#ff9900", category: "Cloud" },
  ];

  // ✅ SERVICES DATA (Pass to Services component for consistency)
  const servicesData = [
    {
      title: "Business Website",
      price: "₹5,000 – ₹12,000",
      features: [
        "Mobile-friendly design (looks great on phones)",
        "Google Maps integration (get found locally)",
        "WhatsApp chat button (instant customer contact)",
        "Fast loading speed (under 3 seconds)",
        "SEO optimized (rank higher on Google)",
        "Contact forms & click-to-call buttons"
      ],
      bonus: "Free Google My Business setup",
      cta: "Get This Package",
      niche: "construction, photography, small business"
    },
    {
      title: "Web Application",
      price: "₹15,000 – ₹40,000",
      features: [
        "Online booking systems",
        "Customer management dashboards",
        "Inventory tracking",
        "Automated workflows",
        "Payment integration (Razorpay/Stripe)"
      ],
      tech: "React + Spring Boot, PostgreSQL, Admin Panel",
      cta: "Discuss Your Project",
      niche: "complex business needs"
    },
    {
      title: "Automation Tools",
      price: "₹3,000 – ₹10,000",
      features: [
        "WhatsApp auto-replies & notifications",
        "Excel data automation",
        "Report generation",
        "Email workflows",
        "API integrations"
      ],
      popular: "Sending quotes, appointment reminders, bulk messaging",
      cta: "Automate My Business",
      niche: "save time on repetitive tasks"
    }
  ];
  const customServices = [
  // ... your custom service objects
];

  // ✅ TRUST SIGNALS DATA
  const trustItems = [
  { 
    icon: "🚀", 
    label: "5+ Projects Delivered",
    description: "Real results for real businesses"
  },
  { 
    icon: "⏱️", 
    label: "100% On-Time",
    description: "Never miss a deadline"
  },
  { 
    icon: "💬", 
    label: "WhatsApp Expert",
    description: "Auto-replies, quotes, bookings"
  },
  { 
    icon: "🛡️", 
    label: "7-Day Free Support",
    description: "Post-launch peace of mind"
  },
  { 
    icon: "🗺️", 
    label: "Google My Business",
    description: "Get found by local customers"
  },
  { 
    icon: "📱", 
    label: "Mobile-Optimized",
    description: "Looks perfect on any device"
  },
];
const handleTrustClick = (item, index) => {
  console.log(`Trust badge clicked: ${item.label}`);
  // Add your analytics: gtag, Mixpanel, etc.
};
const handleServiceClick = (service, index) => {
  console.log(`Service clicked: ${service.title}`);
  // Add analytics: gtag('event', 'service_click', { service_id: service.id });
};
  // ✅ PROCESS STEPS DATA
  const processSteps = [
    { 
      step: 1, 
      title: "Discovery Call (15 mins)", 
      desc: "We discuss your business needs via WhatsApp/call. No pressure, just clarity." 
    },
    { 
      step: 2, 
      title: "Proposal & Quote", 
      desc: "I send a detailed plan with timeline and pricing – usually same day." 
    },
    { 
      step: 3, 
      title: "50% Advance", 
      desc: "Secure your spot in my schedule. Secure payment via UPI/Bank transfer." 
    },
    { 
      step: 4, 
      title: "Build & Test (7-14 days)", 
      desc: "I build your solution with regular updates. You review progress anytime." 
    },
    { 
      step: 5, 
      title: "Launch + Support", 
      desc: "Final payment, go live, and 7 days of free bug-fix support." 
    }
  ];

  // ✅ FAQ DATA
  const faqItems = [
    { 
      q: "How long does a website take?", 
      a: "Simple business websites: 5-7 days. Complex web apps: 2-4 weeks. Automation tools: 3-5 days." 
    },
    { 
      q: "What if I don't like the design?", 
      a: "I share mockups first! You approve the design before I code. Unlimited revisions until you're 100% happy." 
    },
    { 
      q: "Do you provide hosting/domain?", 
      a: "I help you set up everything! Domain: ~₹800/year. Hosting: ₹200-500/month (I'll recommend the best option for your needs)." 
    },
    { 
      q: "Can I update the website myself later?", 
      a: "Yes! I build user-friendly admin panels. I also provide training and documentation so you're never stuck." 
    },
    { 
      q: "Do you work with clients outside Tamil Nadu?", 
      a: "Yes! I work remotely with clients across India via WhatsApp, email, and video calls. Location is not a barrier." 
    },
    { 
      q: "What's your payment method?", 
      a: "Bank transfer, UPI, or PayPal (for international clients). 50% upfront to start, 50% after your approval." 
    }
  ];

  return (
    <>
      {/* ♿ Skip Target for Accessibility */}
      <Element name="Home" id="Home" className="top-container-element" aria-label="Main content">
        
        {/* 🎯 HERO SECTION */}
      <TopContent 
  name="Yuvaraj"
  title="Founder @ YUVITRA Labs"
  subtitle="Web Developer for Construction & Photography Businesses"
  description="I help contractors & photographers get 30% more leads with fast websites, WhatsApp automation, and Google Maps integration."
  techStack={["React", "WhatsApp API", "Google Maps", "Tailwind", "Spring Boot"]}
  socialLinks={{
    linkedin: "https://www.linkedin.com/in/yuvaraj-r-497908214/",
    github: "https://github.com/yuva-raj2",
    whatsapp: "https://wa.me/918667851286", // ✅ ADD YOUR NUMBER
  }}
  resumeUrl="/assets/Yuvaraj_Resume.pdf"
  primaryColor="#7c3aed"
  secondaryColor="#38f5d0"
  accentColor="#22d3ee"
  ctaPrimaryText="WhatsApp Me Now"
  ctaSecondaryText="🚀 View My Work"
  ctaPrimaryHref="https://wa.me/918667851286" // ✅ ADD YOUR NUMBER
  ctaSecondaryHref="#Work"
  trustBadges={["✓ 5+ Projects", "✓ WhatsApp Expert", "✓ 7-Day Support"]}
  location="Tamil Nadu, India"
  enableParticles={true}
  particleCount={100}
  enableMagnetic={true}
/>
        
      </Element>

      {/* 🏆 TRUST SIGNALS SECTION */}
      <Element name="Trust" id="Trust">
        <TrustSignals 
  items={trustItems}
  title="Why Businesses Trust Yuvitra Labs"
  subtitle="Proven results for construction & photography businesses"
  primaryColor="#7c3aed"
  secondaryColor="#38f5d0"
  enableHover={true}
  onItemClick={handleTrustClick} // Optional
/>
      </Element>

      {/* 💡 SERVICES SECTION */}
      <Element name="Services" id="Services">
       <Services 
  // Or omit to use defaults
  title="How I Can Help Your Business"
  subtitle="Simple, transparent packages designed for construction & photography businesses"
  primaryColor="#7c3aed"
  secondaryColor="#38f5d0"
  whatsappNumber="918667851286" // ✅ ADD YOUR NUMBER
  ctaText="Get This Package"
  enableHover={true}
  onCardClick={handleServiceClick} // Optional
/>
      </Element>

      {/* 🛠️ SKILLS SECTION (Repositioned after Services for better flow) */}
      <Element name="Skills" id="Skills">
       <SkillContainers 
  // Optional: Pass custom skills or use niche-focused defaults
  sectionTitle="My Technical Expertise"
  sectionSubtitle="Technologies I use to build fast, reliable websites for construction & photography businesses"
  primaryColor="#7c3aed"
  secondaryColor="#38f5d0"
  bgColor="rgba(15,23,42,0.7)"
  animationDuration={18}
  enableMagnetic={true}
  enableGlow={true}
  glowIntensity={0.4}
  showCategories={true}        // ✅ Group by Frontend/Backend/Automation
  showTooltips={true}          // ✅ Show descriptions on hover
  inViewThreshold={0.25}
  // Optional: Track which skills get clicked
  onSkillClick={(skill, index) => {
    console.log(`Skill viewed: ${skill.name}`);
    // Add analytics: gtag('event', 'skill_view', { skill_name: skill.name });
  }}
/>
      </Element>

      {/* 📁 PROJECTS / WORK SECTION */}
      <Element name="Work" id="Work">
       <ProjectContainer 
  sectionTitle="Recent Projects"
  sectionSubtitle="Real results for construction & photography businesses"
  primaryColor="#7c3aed"
  secondaryColor="#38f5d0"
  whatsappNumber="918667851286" // ✅ ADD YOUR NUMBER
  enableFiltering={true}
  // Optional: Track which projects get clicked
  onProjectClick={(project, index) => {
    console.log(`Project viewed: ${project.title}`);
    // Add analytics: gtag('event', 'project_view', { project_id: project.id });
  }}
/>
      </Element>

      {/* 📋 PROCESS SECTION */}
      <Element name="Process" id="Process">
        <ProcessSection 
          steps={processSteps}
          title="📋 How I Work – Simple & Transparent"
          primaryColor="#7c3aed"
          secondaryColor="#38f5d0"
          showTimeline={true}
        />
      </Element>

      {/* 👤 ABOUT + EXPERIENCE SECTION */}
      <Element name="About" id="About">
        <Experience 
          sectionTitle="About Me"
          sectionSubtitle="Why I built Yuvitra Labs"
          primaryColor="#7c3aed"
          secondaryColor="#38f5d0"
          // ✅ Add your story props here if your component supports them
        />
      </Element>

      {/* ❓ FAQ SECTION */}
      <Element name="FAQ" id="FAQ">
        <FAQSection 
          faqs={faqItems}
          title="❓ Frequently Asked Questions"
          primaryColor="#7c3aed"
          secondaryColor="#38f5d0"
          enableToggle={true}
        />
      </Element>

      {/* 📬 CONTACT SECTION */}
      <Element name="Contact" id="Contact">
        <Contact 
          sectionTitle="Let's Build Something Amazing"
          sectionSubtitle="Have a project in mind? Let's talk."
          primaryColor="#7c3aed"
          secondaryColor="#38f5d0"
          whatsappNumber="918667851286" // ✅ Critical for Indian clients
          email="hello@yuvitralabs.com"
          location="Tamil Nadu, India (Remote-friendly)"
          responseTime="I typically respond within 2-4 hours"
          freeOffer="🎁 Free 15-min consultation + website audit with every inquiry"
        />
      </Element>

    </>
  );
}

export default TopContainer;