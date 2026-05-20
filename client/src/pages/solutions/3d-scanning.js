import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import ThreeDScanningHero from "../../assets/3d-scanning-hero.png";

import logo from "../../assets/logo.png";
import "../Home.css";
import "./3d-scanning.css";

// ===== DATA =====
const SCANNING_DATA = [
  {
    title: "High-Resolution 3D Scanning",
    desc: "Cutting-edge scanning technology that captures millions of data points to create precise digital representations of physical objects — accurate to microns.",
    points: [
      "High-resolution digital data capture",
      "Non-contact and non-destructive inspection",
      "Suitable for complex and intricate parts",
      "Fast and accurate measurement process",
    ],
  },
  {
    title: "3D Modelling & CAD Output",
    desc: "Scanned point cloud data is processed into accurate, production-ready 3D CAD models for inspection, redesign, manufacturing, or documentation purposes.",
    points: [
      "Point cloud to CAD conversion",
      "Mesh generation and surface modelling",
      "Compatible with all major CAD platforms",
      "Models ready for CNC or additive manufacturing",
    ],
  },
  {
    title: "Quality Inspection & Analysis",
    desc: "Dimensional comparison of scanned data against original CAD designs to identify deviations, validate manufacturing tolerances, and ensure part conformity.",
    points: [
      "GD&T analysis and colour deviation maps",
      "First article inspection (FAI) support",
      "Weld, casting, and formed part inspection",
      "Detailed deviation and inspection reports",
    ],
  },
  {
    title: "Reverse Engineering Support",
    desc: "3D scanning forms the foundation of our reverse engineering workflow — enabling accurate recreation of legacy parts, moulds, or assemblies with no existing drawings.",
    points: [
      "Recreate obsolete components",
      "Extract design intent from physical parts",
      "Generate manufacturing-ready CAD data",
      "Supports tooling and fixture replication",
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
export default function ThreeDScanning() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home scanning-page-wrapper">

      {/* ===== HERO ===== */}
      <section className="scanning-hero">
        <div className="scanning-hero-bg" style={{ backgroundImage: `url(${ThreeDScanningHero})` }} />
        <div className="scanning-hero-overlay" />

        <div className="scanning-hero-content">
          <h1 className="scanning-hero-title">
            <span>CAPTURE EVERY</span><br />
            <span>DIMENSION.</span>
          </h1>
          <p className="scanning-hero-subtitle">
            Precise digital representations of physical objects — millions of data points, zero contact, maximum accuracy for inspection, analysis, and product development.
          </p>
        </div>

        <a href="#scanning-services" className="hero-scroll-chevrons" aria-label="Scroll down">
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
      <section id="scanning-services" ref={ref1} className={`about-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <p className="section-label">Our Capability</p>
            <h2 className="section-heading">THE DIGITAL TWIN OF REALITY.</h2>
            <p className="section-description">
              Our 3D scanning services use cutting-edge technology to capture precise digital representations of physical objects. Detailed digital models enable design, quality control, and reverse engineering workflows with unmatched accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="scanning-section clients-section">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-heading">SCANNING CAPABILITIES</h2>

          <div className="scanning-grid">
            {SCANNING_DATA.map((item, i) => (
              <div key={i} className="scanning-card">
                <div className="scanning-glow-line" />
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