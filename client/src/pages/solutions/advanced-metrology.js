import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import AdvancedMetrologyBg from "../../assets/metrology-hero.png";

import logo from "../../assets/logo.png";
import "../Home.css";
import "./advanced-metrology.css";

// ===== DATA =====
const SERVICES_DATA = [
  {
    title: "Calibration Services (Portable Inspection)",
    desc: "Highly accurate portable calibration and inspection services ensuring your equipment and components meet strict quality and dimensional standards. On-site inspections eliminate the need to transport heavy or critical components.",
    points: [
      "Maintain measurement accuracy and compliance",
      "Reduce downtime with on-site inspection",
      "Ensure quality control in manufacturing processes",
      "Improve reliability and performance of equipment",
    ],
  },
  {
    title: "Laser Tracker Measurement",
    desc: "Ultra-precise 3D measurement of large components and assemblies. Our advanced system captures spatial coordinates with high accuracy, ideal for industries where precision is critical.",
    points: [
      "Alignment and installation of machinery",
      "Inspection of large structures and assemblies",
      "Aerospace and heavy engineering measurements",
      "Quality assurance and dimensional validation",
    ],
  },
  {
    title: "Reverse Engineering",
    desc: "Advanced reverse engineering services to recreate, analyze, and improve existing components. By studying physical parts, we generate accurate CAD models and technical data for redesign, replication, or enhancement.",
    points: [
      "Recreate obsolete or unavailable parts",
      "Improve existing product designs",
      "Develop CAD models for manufacturing",
      "Reduce dependency on original design data",
    ],
  },
  {
    title: "3D Scanning & Modelling",
    desc: "Cutting-edge 3D scanning technology to capture precise digital representations of physical objects. Collecting millions of data points, we create highly accurate 3D models for inspection, analysis, and product development.",
    points: [
      "High-resolution digital data capture",
      "Non-contact and non-destructive inspection",
      "Suitable for complex and intricate parts",
      "Fast and accurate measurement process",
    ],
  },
  {
    title: "Design & Development Tools",
    desc: "Comprehensive design and product development solutions using advanced CAD-CAM tools and engineering software. From concept to production-ready design, we ensure optimized performance, manufacturability, and efficiency.",
    points: [
      "3D modeling and CAD design",
      "Product development and prototyping",
      "Design optimization and simulation",
      "Engineering analysis and validation",
    ],
  },
  {
    title: "Jig, Mould & Aerospace Tooling",
    desc: "Specialized manufacturing and inspection of precision jigs, fixtures, and moulds, particularly for aerospace and defence applications where accuracy is critical.",
    points: [
      "Aerospace-grade tooling and fixtures",
      "Precision jig and mould manufacturing",
      "Inspection and validation of critical components",
      "High-quality fabrication with strict tolerances",
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

export default function AdvancedMetrology() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home metrology-page-wrapper">

      <section className="metrology-hero">
        <div className="metrology-hero-bg" style={{ backgroundImage: `url(${AdvancedMetrologyBg})` }} />
        <div className="metrology-hero-overlay" />

        <div className="metrology-hero-content">
          <h1 className="metrology-hero-title">
            <span>PRECISION AT</span><br />
            <span>EVERY SCALE.</span>
          </h1>
          <p className="metrology-hero-subtitle">
            Precision-driven engineering and inspection solutions powered by advanced technologies — supporting aerospace, defence, manufacturing, and heavy engineering.
          </p>
        </div>

        <a href="#metrology-services" className="hero-scroll-chevrons" aria-label="Scroll down">
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

      <section id="metrology-services" ref={ref1} className={`about-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <p className="section-label">Our Capability</p>
            <h2 className="section-heading">ENGINEERING WITH PRECISION.</h2>
            <p className="section-description">
              At CHDK Technology Center, we deliver high-accuracy metrology and engineering services that power critical industries. From on-site calibration to aerospace tooling, our solutions ensure quality, reliability, and compliance at every level.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="metrology-section clients-section">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-heading">OUR SERVICES</h2>

          <div className="metrology-grid">
            {SERVICES_DATA.map((s, i) => (
              <div key={i} className="metrology-card">
                <div className="metrology-glow-line" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul>
                  {s.points.map((pt, j) => (
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