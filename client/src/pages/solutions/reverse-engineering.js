import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import "../Home.css";
import "./reverse-engineering.css";
import revEnggHero from "../../assets/reverse-engineering-hero.png";

const SERVICES_DATA = [
  {
    title: "Legacy Part Recreation",
    desc: "When original drawings or CAD data no longer exist, we study the physical part and generate accurate, production-ready models to bring obsolete components back to life.",
    points: [
      "Recreate discontinued or unavailable parts",
      "Eliminate dependency on OEM data",
      "Rapid turnaround for critical replacements",
      "Full dimensional verification of output models",
    ],
  },
  {
    title: "CAD Model Generation",
    desc: "Physical parts are scanned and converted into precise parametric or surface CAD models compatible with all major platforms — ready for manufacturing or further development.",
    points: [
      "Point cloud to parametric CAD conversion",
      "CATIA, SolidWorks, NX, and STEP/IGES output",
      "Surface and solid modelling",
      "Design intent captured and documented",
    ],
  },
  {
    title: "Product Improvement & Redesign",
    desc: "We analyse existing components to identify design weaknesses, then use reverse engineering as the foundation to redesign, optimise, and improve part performance.",
    points: [
      "Failure analysis and root cause identification",
      "Weight reduction and topology optimisation",
      "Material and geometry improvement",
      "Fitment and tolerance enhancement",
    ],
  },
  {
    title: "Tooling & Fixture Replication",
    desc: "Precision replication of worn or lost tooling, jigs, and fixtures — ensuring manufacturing operations can resume without costly lead times or OEM dependency.",
    points: [
      "Jig and fixture reverse modelling",
      "Mould and die replication",
      "Assembly tooling recreation",
      "Dimensional validation against original",
    ],
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

export default function ReverseEngineering() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home revengg-page-wrapper">

      <section className="revengg-hero">
        <div className="revengg-hero-bg" style={{ backgroundImage: `url(${revEnggHero})` }} />
        <div className="revengg-hero-overlay" />
        <div className="revengg-hero-content">
          <h1 className="revengg-hero-title">
            <span>DECODE THE PART.</span><br />
            <span>REBUILD THE FUTURE.</span>
          </h1>
          <p className="revengg-hero-subtitle">
            Advanced reverse engineering services to recreate, analyse, and improve existing components — generating accurate CAD models and technical data when none exists.
          </p>
        </div>
        <a href="#revengg-services" className="hero-scroll-chevrons" aria-label="Scroll down">
          <svg className="chevron chevron-1" viewBox="0 0 32 18" fill="none"><polyline points="2,2 16,16 30,2" /></svg>
          <svg className="chevron chevron-2" viewBox="0 0 32 18" fill="none"><polyline points="2,2 16,16 30,2" /></svg>
          <svg className="chevron chevron-3" viewBox="0 0 32 18" fill="none"><polyline points="2,2 16,16 30,2" /></svg>
          <svg className="chevron chevron-4" viewBox="0 0 32 18" fill="none"><polyline points="2,2 16,16 30,2" /></svg>
        </a>
        <div className="social">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link social-linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link social-instagram" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link social-facebook" aria-label="Facebook"><FaFacebook /></a>
          <a href="mailto:info@chdkindia.com" className="social-link social-mail" aria-label="Email"><HiOutlineMail /></a>
        </div>
      </section>

      <section id="revengg-services" ref={ref1} className={`about-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <p className="section-label">Our Capability</p>
            <h2 className="section-heading">FROM PHYSICAL PART TO DIGITAL MODEL.</h2>
            <p className="section-description">
              CHDK Technology Center combines 3D scanning, precision metrology, and advanced CAD tools to deliver complete reverse engineering workflows — helping you recreate, improve, or manufacture any component with full accuracy and confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="revengg-section clients-section">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-heading">REVERSE ENGINEERING SERVICES</h2>
          <div className="revengg-grid">
            {SERVICES_DATA.map((s, i) => (
              <div key={i} className="revengg-card">
                <div className="revengg-glow-line" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul>{s.points.map((pt, j) => <li key={j}>{pt}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}