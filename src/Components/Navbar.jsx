import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Experience", target: "experience" },
  { label: "Skills", target: "skills" },
  { label: "Work", target: "work" },
  { label: "Contact", target: "contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = navItems
        .map((item) => document.getElementById(item.target))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 180;

      let currentSection = "home";

      sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (target) => {
    const section = document.getElementById(target);

    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setIsMenuOpen(false);
  };

  return (
    <header
      className={`navbar ${
        isScrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="container navbar-inner">
        <button
          type="button"
          className="navbar-brand"
          onClick={() => handleNavigation("home")}
          aria-label="Go to homepage"
        >
          <span className="brand-mark">
            Y
          </span>

          <span className="brand-name">
            Yuvaraj<span>.</span>
          </span>
        </button>

        <nav
          className={`navbar-menu ${
            isMenuOpen ? "navbar-menu-open" : ""
          }`}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <button
              key={item.target}
              type="button"
              className={`nav-link ${
                activeSection === item.target
                  ? "nav-link-active"
                  : ""
              }`}
              onClick={() =>
                handleNavigation(item.target)
              }
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            className="navbar-contact-button"
            onClick={() => handleNavigation("contact")}
          >
            Let's Talk
          </button>
        </nav>

        <button
          type="button"
          className={`menu-toggle ${
            isMenuOpen ? "menu-toggle-open" : ""
          }`}
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}