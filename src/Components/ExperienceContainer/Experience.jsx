import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Element } from "react-scroll";
const Experience = () => {
  const exp = {
    role: "Full Stack Developer (Projects & Freelancing)",
    date: "Jan 2024 – Present",
    details: [
      "Developed full-stack apps using Java, Spring Boot, React & SQL/NoSQL databases.",
      "Built secure REST APIs with JWT authentication and role-based access.",
      "Created responsive UIs using Material UI and modern component patterns.",
      "Integrated OpenAI, email systems, and payment gateways.",
      "Mentored students in Java, MERN, DSA, and real-world web projects.",
    ],
  };

  return (
    <Element name="Experience">
    <section id="experience" style={{ padding: "70px 20px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Experience
      </Typography>

      <Card className="exp-card" style={{ maxWidth: 900, margin: "0 auto" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {exp.role}
          </Typography>

          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            {exp.date}
          </Typography>

          <ul style={{ marginTop: "10px", color: "#666" }}>
            {exp.details.map((d, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>
                {d}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
    </Element>
  );
};

export default Experience;
