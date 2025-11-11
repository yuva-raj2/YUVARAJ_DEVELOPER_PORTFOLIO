import React from 'react';
import { Element } from 'react-scroll';
import TopContent from '../TopContent/TopContent';
import SkillContainers from '../SkillContainer/SkillContainers';
import ProjectContainer from '../ProjectContainer/ProjectContainer';

function TopContainer() {
  return (
    <Element name="Home" className="top-container-element">
      <TopContent />
      <SkillContainers />
      <ProjectContainer/>
    </Element>
  );
}
export default TopContainer;
