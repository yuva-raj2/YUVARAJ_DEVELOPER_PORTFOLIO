import React from 'react';
import { Element } from 'react-scroll';
import TopContent from '../TopContent/TopContent';
import SkillContainers from '../SkillContainer/SkillContainers';
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import Services from '../ServicesContainer/Services';

function TopContainer() {
  return (
    <Element name="Home" className="top-container-element">
      <TopContent />
      <SkillContainers />
      <ProjectContainer/>
      <Services/>
    </Element>
  );
}
export default TopContainer;
