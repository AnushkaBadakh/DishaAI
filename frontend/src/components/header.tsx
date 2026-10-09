
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="logo">
        Disha<span>AI</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/about">
          About Us
        </NavLink>

        <a href="#contact">Contact</a>
      </nav>

      <Link to="/about" className="header-button">
        Explore DishaAI
      </Link>
    </header>
  );
}

export default Header;