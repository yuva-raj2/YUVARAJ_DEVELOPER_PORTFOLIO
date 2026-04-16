import React from 'react';
import { Element } from 'react-scroll';
import TopContent from '../TopContent/TopContent';
import SkillContainers from '../SkillContainer/SkillContainers';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import Services from '../ServicesContainer/Services';
import Experience from '../ExperienceContainer/Experience';
import Contact from '../ContactContainer/Contact';
function TopContainer() {
  const customSkills = [
    { name: "React", value: 90, color: "#61dbfb" },
    { name: "Node.js", value: 85, color: "#68a063" },
    { name: "TypeScript", value: 88, color: "#3178c6" },
    { name: "PostgreSQL", value: 82, color: "#336791" },
    { name: "Docker", value: 78, color: "#2496ed" },
    { name: "AWS", value: 75, color: "#ff9900" },
    { name: "Java", value: 80, color: "#e76f00" },
    { name: "Spring Boot", value: 80, color: "#66ff99" },
    { name: "JavaScript", value: 88, color: "#f4e04d" },
  ];
  return (
    <Element name="Home" className="top-container-element">
    <TopContent 
        name="Yuvaraj"
        title="Founder @ YUVITRA Labs"
        subtitle="Java Full Stack Engineer in India"
        primaryColor="#7c3aed"        // Your brand primary
        secondaryColor="#38f5d0"      // Your brand secondary
        accentColor="#22d3ee"         // Your brand accent
        techStack={["React", "Java", "Spring Boot", "Three.js", "PostgreSQL"]}
        socialLinks={{
          linkedin: "https://www.linkedin.com/in/yuvaraj-r-497908214/",
          github: "https://github.com/yourhandle",
          twitter: "https://twitter.com/yourhandle", // Optional
        }}
        resumeUrl="/assets/Yuvaraj_Resume.pdf"
        enableParticles={true}
        particleCount={100}           // Adjust for performance
        enableMagnetic={true}
      />
      
           <SkillContainers 
        skills={customSkills}
        sectionTitle="My Expertise"
        sectionSubtitle="Technologies I use to build exceptional digital experiences"
        primaryColor="#7c3aed"        // Your brand primary
        secondaryColor="#38f5d0"      // Your brand secondary
        bgColor="rgba(15,23,42,0.7)"
        animationDuration={18}         // Faster animation
        enableMagnetic={true}
        enableGlow={true}
        glowIntensity={0.4}
        inViewThreshold={0.25}
      />
      <ProjectContainer/>
      <Services/>
      <Experience/>
      <Contact/>
    </Element>
  );
}
export default TopContainer;
