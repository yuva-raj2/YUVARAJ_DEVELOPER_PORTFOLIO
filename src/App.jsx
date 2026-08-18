// src/App.jsx

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import YuvitraLabs from "./Components/YuvitraLabs";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <YuvitraLabs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}