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
  <a href="https://www.linkedin.com/company/chdk-india/" target="_blank" rel="noreferrer" className="social-link social-linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
  <a href="https://www.instagram.com/chdk_technology_center/" target="_blank" rel="noreferrer" className="social-link social-instagram" aria-label="Instagram"><FaInstagram /></a>
  <a href="https://www.facebook.com/share/1J1A5P7Co1/" target="_blank" rel="noreferrer" className="social-link social-facebook" aria-label="Facebook"><FaFacebook /></a>
  <a href="mailto:info@chdkindia.com" className="social-link social-mail" aria-label="Email"><HiOutlineMail /></a>
</div>

    </section>
  );
}

export default Hero;