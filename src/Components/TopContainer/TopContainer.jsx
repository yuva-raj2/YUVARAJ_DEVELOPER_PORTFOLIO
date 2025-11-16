import React from 'react';
import { Element } from 'react-scroll';
import TopContent from '../TopContent/TopContent';
import SkillContainers from '../SkillContainer/SkillContainers';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import Services from '../ServicesContainer/Services';
import Experience from '../ExperienceContainer/Experience';
import Contact from '../ContactContainer/Contact';
function TopContainer() {
  return (
    <Element name="Home" className="top-container-element">
      <TopContent />
      <SkillContainers />
      <ProjectContainer/>
      <Services/>
      <Experience/>
      <Contact/>
    </Element>
  );
}
export default TopContainer;
