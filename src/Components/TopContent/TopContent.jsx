import React from 'react';
import './TopContent.css';
import Resume from '../../assets/YUVARAJ-Developer.pdf';
import Profile from '../../assets/Yuvaraj-Profile.jpeg';

function TopContent() {
  return (
    <section className="hero-section">

      <div className="hero-left">
        <div className="photo-card">
          <img src={Profile} alt="Yuvi" className="profile-img" />
        </div>
      </div>

      <div className="hero-right">
        <h1>Hello, I'm <span>Yuvi</span></h1>
        <h2>A Passionate Software Developer 💻</h2>
        <p>
          I build scalable full-stack applications, modern user interfaces, and
          high-performance backend systems.
        </p>

        <div className="hero-buttons">
          <a href={Resume} target="_blank" rel="noreferrer">
            <button className="btn primary-btn">Download CV</button>
          </a>

          <button className="btn secondary-btn">My Work</button>
        </div>
      </div>

    </section>
  );
}

export default TopContent;
