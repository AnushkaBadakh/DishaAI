
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { memo } from "react";

function Header() {
  const { user, signOut } = useAuth();

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

      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>{user.email}</span>
          <button onClick={signOut} className="header-button">
            Sign Out
          </button>
        </div>
      ) : (
        <Link to="/login" className="header-button">
          Sign In
        </Link>
      )}
    </header>
  );
}

export default memo(Header);