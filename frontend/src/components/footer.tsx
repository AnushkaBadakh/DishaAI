import { Link } from "react-router-dom";

function Footer() {
return ( <footer className="site-footer" id="contact"> <div className="footer-main"> <div className="footer-brand"> <Link to="/" className="logo">
Disha<span>AI</span> </Link>

      <p>
        Find your direction. Build your future.
      </p>
    </div>

    <div className="footer-links">
      <h3>Explore</h3>
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
    </div>

    <div className="footer-links">
      <h3>Connect</h3>
      <a href="mailto:hello@dishaai.com">
        Email Us
      </a>
    </div>
  </div>

  <div className="footer-bottom">
    <p>
      © {new Date().getFullYear()} DishaAI. All rights reserved.
    </p>
    <p>Made with purpose for your career journey.</p>
  </div>
</footer>


);
}

export default Footer;
