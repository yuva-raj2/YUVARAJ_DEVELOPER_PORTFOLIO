import React from 'react';
import './TopContent.css';
import Resume from '../../assets/YUVARAJ-Developer.pdf';
function TopContent() {
  return (
    <section className="top-container">
      <div className="top-container-text">
        <h1>Hello, I'm <span>Yuvi</span></h1>
        <h2>A Passionate Software Developer 💻</h2>
        <div className="top-container-nav">
          <a href={Resume} target="_blank" rel="noreferrer">
            <button className="cv-btn">Download CV</button>
          </a>
          <button className="work-btn">My Work</button>
        </div>
      </div>
    </section>
  );
}

export default TopContent;
