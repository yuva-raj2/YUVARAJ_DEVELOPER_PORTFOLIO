import { useState } from "react";
import './Services.css';
const ServicesSections = ({ link, img, desc, title }) => {
  const [show, setShow] = useState(false);

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
      <div
        className="project-card"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <img src={img} alt={title} className="project-image" />

        {/* Overlay appears on hover */}
        <div className={`project-overlay ${show ? "visible" : ""}`}>
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
      </div>
    </a>
  );
};

export default ServicesSections;
