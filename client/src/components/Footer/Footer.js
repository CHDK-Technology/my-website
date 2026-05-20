import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-wrapper">

      {/* CTA SECTION */}
      <section className="pre-footer-cta">
        <div className="cta-content">
          <h2>Your Vision Our Engineering</h2>

          <p>
            We don't just work for our clients; we work with them.
            Bring us your most complex challenges, and our team will
            partner with you to turn them into sustainable realities.
          </p>

          <Link to="/contact" className="btn-outline">
            CONTACT US
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-container">

          <div className="footer-logo">
            <img
              src={logo}
              alt="CHDK Logo"
              className="footer-logo-img"
            />
          </div>

          <div className="footer-links-wrapper">
            <p className="copyright-text">
              ©2026 CHDK Technology Center
            </p>

            <ul className="footer-links">

              <li>
                <Link to="/privacy-policy">
                  Privacy Notice
                </Link>
              </li>

              <li>
                <Link to="/cookie-policy">
                  Cookie Policy
                </Link>
              </li>

              <li>
                <Link to="/accessibility">
                  Accessibility
                </Link>
              </li>

              <li>
                <Link to="/disclaimer">
                  Disclaimer
                </Link>
              </li>

              <li>
                <Link to="/security-policy">
                  Security Policy
                </Link>
              </li>

              <li>
                <Link to="/terms-conditions">
                  Terms & Conditions
                </Link>
              </li>

            </ul>
          </div>

        </div>
      </footer>
    </div>
  );
}