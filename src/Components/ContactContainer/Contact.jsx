import React from "react";
import "./Contact.css";
import { Typography, Grid } from "@mui/material";
import { Element } from "react-scroll";
const Contact = () => {
  return (
    <Element name="Contact">
    <footer className="footer-container">
      <Grid container spacing={4} justifyContent="center">
        
        {/* Contact Info */}
        <Grid item xs={12} sm={4}>
          <Typography className="footer-title">Contact</Typography>
          <Typography>
            📍 <strong>Coimbatore, India</strong>
          </Typography>
          <Typography>
            📧 <a href="mailto:yuvaarun09964@gmail.com" className="footer-link">yuvaarun09964@gmail.com</a>
          </Typography>
          <Typography>
            📞 <a href="tel:+918667851286" className="footer-link">+91-8667851286</a>
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={4}>
          <Typography className="footer-title">Quick Links</Typography>
          <Typography>
            <a href="#services" className="footer-link">Services</a>
          </Typography>
          <Typography>
            <a href="#experience" className="footer-link">Experience</a>
          </Typography>
          <Typography>
            <a href="#projects" className="footer-link">Projects</a>
          </Typography>
        </Grid>

        {/* Social Links */}
        <Grid item xs={12} sm={4}>
          <Typography className="footer-title">Follow Me</Typography>

          <div className="footer-social-container">
            <a
              href="https://www.linkedin.com/in/yuvaraj-r-497908214/"
              className="footer-social-link"
              target="_blank"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/yuva-raj2"
              className="footer-social-link"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </Grid>

      </Grid>

      {/* Bottom line */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Yuvaraj — All Rights Reserved.
      </div>
    </footer>
    </Element>
  );
};

export default Contact;
