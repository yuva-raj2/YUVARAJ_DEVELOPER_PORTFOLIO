import { Link } from "react-scroll";
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Develop<span>er</span></h1>
      </div>
      <nav className="header-right">
        {['Home', 'About', 'Projects', 'Skills','Experience','Contact','Services'].map((section) => (
          <Link 
            key={section} title={section.toUpperCase()}
            to={section}
            smooth={true}
            duration={500}
            offset={-70} 
          >
            <h2>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
          </Link>
        ))}
      </nav>
    </header>
  );
}
export default Header;
