import React from 'react';
import { Element } from 'react-scroll';
import TopContent from '../TopContent/TopContent';
import SkillContainers from '../SkillContainer/SkillContainers';

function TopContainer() {
  return (
    <Element name="home" className="top-container-element">
      <TopContent />
      <SkillContainers />
    </Element>
  );
}
export default TopContainer;
