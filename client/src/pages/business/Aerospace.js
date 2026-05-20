import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import AerospaceBg from "../../assets/Aerospace.jpeg";
import AeroAboutImg from "../../assets/aero-about.jpeg";


import "../Home.css";
import "../business.css";
import "./Aerospace.css";
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

export default function Aerospace() {
  const [ref1, show1] = useReveal();
  return (
    <div className="home biz-page-wrapper aero-page">

      {/* ===== HERO ===== */}
      <section className="biz-hero">
     <div className="biz-hero-bg" style={{ backgroundImage: `url(${AerospaceBg})` }} />

        <div className="biz-hero-overlay" />

        <div className="biz-hero-content">
          <p className="biz-hero-tag">Aerospace & Defence</p>
          <h1 className="biz-hero-title">
            From Concept  To <br /> Calibration
          </h1>
          <p className="biz-hero-subtitle">
         Supporting the aerospace industry with high-precision engineering, advanced tooling, composite manufacturing, and calibration solutions designed for performance, accuracy, and reliability in critical applications.
          </p>
        </div>

<a href="#aero-about" className="hero-scroll-chevrons" aria-label="Scroll down">
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
          <a href="https://linkedin.com" className="social-link social-linkedin"><FaLinkedin /></a>
          <a href="https://instagram.com" className="social-link social-instagram"><FaInstagram /></a>
          <a href="https://facebook.com" className="social-link social-facebook"><FaFacebook /></a>
          <a href="mailto:info@chdkindia.com" className="social-link social-mail"><HiOutlineMail /></a>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="aero-about" className="about-section">
        <div className="container about-intro-grid">
          
          <div>
            <p className="section-label">Overview</p>
            <h2 className="section-heading">AEROSPACE ENGINEERING</h2>

            <p className="section-description highlight">
              We engineer high-performance aerospace systems designed for precision,
              durability, and real-world operational excellence.
            </p>

            <p className="section-description">
              From structural components to advanced defence solutions, CHDK delivers
              technology that performs under extreme conditions — where reliability is everything.
            </p>
          </div>

<img
  src={AeroAboutImg}
  alt="Aerospace"
  className="about-featured-image"
/>

        </div>
      </section>

      {/* ===== STICKY SCROLL ===== */}
      <section className="aero-sticky-section">
        <div className="aero-sticky-container">

          <div className="aero-sticky-left">
            <h2>BUILT FOR<br />MISSION CRITICAL</h2>
          </div>

          <div className="aero-sticky-right">

            <div className="aero-step">
              <h3>Precision Manufacturing</h3>
              <p>High-tolerance aerospace components engineered with absolute accuracy.</p>
            </div>

            <div className="aero-step">
              <h3>Defence Systems</h3>
              <p>Advanced engineering solutions supporting national security infrastructure.</p>
            </div>

            <div className="aero-step">
              <h3>Design & Simulation</h3>
              <p>End-to-end product lifecycle from concept to validation.</p>
            </div>

            <div className="aero-step">
              <h3>Testing & Compliance</h3>
              <p>Strict adherence to global aerospace standards and certifications.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ===== GRID ===== */}
      <section ref={ref1} className={`business-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <p className="section-label">Capabilities</p>
          <h2 className="section-heading">WHAT WE DELIVER</h2>

<div className="business-grid">
  {[
    {
      title: "Manufacturing",
      points: [
        "Composite Mould & Pattern Manufacturing",
        "Jig Manufacturing",
      ],
    },
    {
      title: "Defence",
      points: [
        "Aerospace & Defence Engineering Support",
        "Precision Tooling for Defence Applications",
      ],
    },
    {
      title: "Engineering",
      points: [
        "Jig Design",
        "Aerospace Engineering Solutions",
        "Custom Tooling & Fixture Development",
      ],
    },
    {
      title: "Testing",
      points: [
        "Satellite Lab Calibration",
        "Precision Measurement & Calibration Services",
        "Quality Testing & Validation Support",
      ],
    },
  ].map((item, i) => (
    <div key={i} className="domain-card">
      <h3>{item.title}</h3>

      <ul className="domain-list">
        {item.points.map((point, index) => (
          <li key={index}>• {point}</li>
        ))}
      </ul>

      <div className="domain-glow-line"></div>
    </div>
  ))}
</div>
        </div>
      </section>
    </div>
  );
}