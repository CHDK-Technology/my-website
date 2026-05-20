import "./Hero.css";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

function Hero({ tag, title, subtitle, bgImage }) {
  return (
    <section className="hero-page">

      <div
        className="hero-page-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="hero-page-overlay" />

      <div className="hero-page-content">
        <p className="hero-page-tag">{tag}</p>

        <h1 className="hero-page-title">
          {title}
        </h1>

        <p className="hero-page-subtitle">
          {subtitle}
        </p>
      </div>

      <a href="#page-content" className="hero-scroll-chevrons" aria-label="Scroll down">
        <svg className="chevron chevron-1" viewBox="0 0 32 18" fill="none">
          <polyline points="2,2 16,16 30,2" />
        </svg>
        <svg className="chevron chevron-2" viewBox="0 0 32 18" fill="none">
          <polyline points="2,2 16,16 30,2" />
        </svg>
        <svg className="chevron chevron-3" viewBox="0 0 32 18" fill="none">
          <polyline points="2,2 16,16 30,2" />
        </svg>
        <svg className="chevron chevron-4" viewBox="0 0 32 18" fill="none">
          <polyline points="2,2 16,16 30,2" />
        </svg>
      </a>

      <div className="social">
        <a href="/" className="social-link social-linkedin"><FaLinkedin /></a>
        <a href="/" className="social-link social-instagram"><FaInstagram /></a>
        <a href="/" className="social-link social-facebook"><FaFacebook /></a>
        <a href="/" className="social-link social-mail"><HiOutlineMail /></a>
      </div>

    </section>
  );
}

export default Hero;