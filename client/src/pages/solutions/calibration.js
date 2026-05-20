import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import CalibrationHero from "../../assets/calibration-hero.png";

import logo from "../../assets/logo.png";
import "../Home.css";
import "./calibration.css";

// ===== DATA =====
const CALIBRATION_DATA = [
  {
    title: "On-Site Portable Inspection",
    desc: "Advanced portable calibration tools brought directly to your facility, eliminating the need to transport heavy or critical components to a lab.",
    points: [
      "Minimise equipment downtime",
      "Inspection of large-scale industrial assemblies",
      "Suitable for complex geometries",
      "Fast turnaround with certified results",
    ],
  },
  {
    title: "Dimensional Measurement & Compliance",
    desc: "We ensure your components and equipment conform to strict dimensional standards, providing documented evidence of quality compliance.",
    points: [
      "Maintain measurement accuracy",
      "Full compliance documentation",
      "Traceability to national and international standards",
      "Support for ISO and aerospace quality requirements",
    ],
  },
  {
    title: "Quality Control in Manufacturing",
    desc: "Integrated calibration support for your manufacturing processes, identifying deviations early to prevent costly rework and defects.",
    points: [
      "In-process measurement support",
      "Statistical process control data",
      "First article inspection (FAI)",
      "Reduce scrap and rework costs",
    ],
  },
  {
    title: "Gauge & Instrument Calibration",
    desc: "Calibration of measuring instruments, gauges, and tooling to ensure reliable and repeatable measurements across your production floor.",
    points: [
      "Calibration of micrometers, vernier calipers, CMMs",
      "Fixture and jig verification",
      "Traceable calibration certificates",
      "Scheduled calibration management",
    ],
  },
];

// ===== REVEAL HOOK =====
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

// ===== PAGE =====
export default function CalibrationPage() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home calibration-page-wrapper">

      {/* ===== HERO ===== */}
      <section className="calibration-hero">
        <div className="calibration-hero-bg" style={{ backgroundImage: `url(${CalibrationHero})` }} />
        <div className="calibration-hero-overlay" />

        <div className="calibration-hero-content">
          <h1 className="calibration-hero-title">
            <span>PORTABLE PRECISION.</span><br />
            <span>ON-SITE ACCURACY.</span>
          </h1>
          <p className="calibration-hero-subtitle">
            Highly accurate portable calibration and inspection services — ensuring your equipment meets strict quality and dimensional standards, right where you need it.
          </p>
        </div>

        <a href="#calibration-services" className="hero-scroll-chevrons" aria-label="Scroll down">
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

      {/* ===== CAPABILITY STATEMENT ===== */}
      <section id="calibration-services" ref={ref1} className={`about-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <p className="section-label">Our Capability</p>
            <h2 className="section-heading">ACCURACY YOU CAN TRUST.</h2>
            <p className="section-description">
              CHDK Technology Center provides portable calibration and inspection services that bring precision directly to your facility. Using advanced metrology tools, we eliminate transport risks and downtime while delivering results traceable to global standards.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="calibration-section clients-section">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-heading">CALIBRATION SERVICES</h2>

          <div className="calibration-grid">
            {CALIBRATION_DATA.map((item, i) => (
              <div key={i} className="calibration-card">
                <div className="calibration-glow-line" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <ul>
                  {item.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}