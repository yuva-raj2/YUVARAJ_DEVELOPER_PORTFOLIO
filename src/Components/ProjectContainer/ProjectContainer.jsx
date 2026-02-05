import { Element } from "react-scroll";
import Projects from "./Projects";
import "./ProjectContainer.css";

function ProjectContainer() {
  const client_project = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKi0l4UGcNjoY7Kvg--SbW6ykLPgqeno57qA&s",
      title: "Shift Allocation Module Enhancement",
      desc: "Enhanced internal shift allocation with dynamic checkboxes, API sync, and toggles.",
      link: "#",
      tech: ["React", "API", "UI"]
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoWVPAiLf0o243XOk4s6IhIsHMKrJF_wK8w&s",
      title: "Language Translation Integration",
      desc: "Google Cloud Translation API integration with UI stability fixes.",
      link: "#",
      tech: ["React", "Google API"]
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSksxD89cqrUm1pvnm5Jm1-FR-C3Q2K0mAkaQ&s",
      title: "Checklist Configuration Bug Fixes",
      desc: "Improved checklist accuracy and consistency.",
      link: "#",
      tech: ["Debugging", "Excel"]
    },
    {
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSNwvFgXJ0fzQ_szjLVOBkA9ZKT22lrcf7Ug&s",
      title:"ChatBot",
      desc:"Technical Support Chatbot for Ticket Generation",
      link:"#",
      tech:["React","Spring","AI"]
    },
    {
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfKyOI573BhyK_R-L6tbGneHDq-MRlM3cKBw&s",
      title:"Whatsapp Automation Datas",
      desc:"Excel Datas Sharing using VB",
      link:"#",
      tech:["Excel","Visual Basic","Whatsapp Integration","Macros"]
    }
  ];

  return (
    <Element name="Projects" id="projects">
      <section className="project-container">
        <h1 className="project-title" id="Projects">Solutions & Work</h1>
        <div className="projects-grid">
          {client_project.map((project, index) => (
            <Projects key={index} {...project} />
          ))}
        </div>
      </section>
    </Element>
  );
}

export default ProjectContainer;
