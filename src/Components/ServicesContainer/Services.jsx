import { useState } from "react";
import "./Services.css";
import { Element } from "react-scroll";

const Services = () => {
  const services = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/906/906334.png",
      title: "Full Stack Web Development",
      desc: "Building scalable full-stack applications using Java, Spring Boot, React, SQL/NoSQL.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/235/235861.png",
      title: "API Development",
      desc: "Creating secure REST APIs and integrating third-party services.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
      title: "UI/UX Design",
      desc: "Designing clean, responsive, user-friendly interfaces.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3501/3501248.png",
      title: "Bug Fixing",
      desc: "Debugging, refactoring, and optimizing existing applications.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/8145/8145884.png",
      title: "Database Management",
      desc: "Schema design, indexing, query optimization for MySQL, PostgreSQL, MongoDB.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      title: "Mentorship",
      desc: "Training students in Java, MERN, DSA and real-world projects.",
    },
  ];

  return (
    <Element name="Services" id="services">
      <div className="services-container">
        <h1 className="services-title">Services</h1>

        <div className="services-grid">
          {services.map((service, i) => (
            <div key={i} className="service-card">
              <img src={service.img} alt={service.title} className="service-image" />

              <div className="service-overlay">
                <h2>{service.title}</h2>
                <p>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Element>
  );
};

export default Services;
