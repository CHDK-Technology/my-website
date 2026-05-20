import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import PrecisionManufacturingBg from "../../assets/precision-manufacturing-hero.png";
import "../Home.css";
import "./precision-manufacturing.css";

const SERVICES_DATA = [
  {
    title: "CNC Precision Machining",
    desc: "High-accuracy CNC milling, turning, and multi-axis machining of complex components across a wide range of materials — from aluminium alloys to titanium and exotic aerospace materials.",
    points: [
      "3, 4, and 5-axis CNC machining",
      "Tight tolerance manufacturing (±0.005mm)",
      "Aluminium, steel, titanium, Inconel, and plastics",
      "Prototyping through to high-volume production",
    ],
  },
  {
    title: "Sheet Metal Fabrication",
    desc: "Precision sheet metal cutting, bending, forming, and welding for structural components, enclosures, brackets, and assemblies across industrial and aerospace applications.",
    points: [
      "Laser cutting and waterjet profiling",
      "Press brake forming and bending",
      "TIG, MIG, and spot welding",
      "Surface treatment and finishing",
    ],
  },
  {
    title: "Aerospace Component Manufacturing",
    desc: "Manufacturing of flight-critical and structural aerospace components with strict adherence to AS9100 quality standards, material traceability, and dimensional conformance.",
    points: [
      "Structural brackets and fittings",
      "Hydraulic and fuel system components",
      "Interior and exterior structural parts",
      "Full material traceability and certification",
    ],
  },
  {
    title: "Assembly & Sub-Assembly",
    desc: "Precision mechanical assembly of multi-component sub-systems and assemblies, with inspection at every stage to ensure dimensional integrity and functional performance.",
    points: [
      "Mechanical sub-assembly and integration",
      "Torque-controlled fastening",
      "In-process CMM and dimensional inspection",
      "Full build documentation and test records",
    ],
  },
  {
    title: "Surface Finishing & Treatment",
    desc: "Complete surface treatment and finishing services to meet cosmetic, functional, and corrosion resistance requirements for your manufactured components.",
    points: [
      "Anodising, plating, and powder coating",
      "Shot blasting and bead peening",
      "Precision grinding and lapping",
      "Painting to customer colour and spec",
    ],
  },
  {
    title: "Quality Inspection & CMM",
    desc: "In-house CMM and portable metrology inspection at every stage of manufacturing — ensuring every component meets drawing tolerances before it leaves our facility.",
    points: [
      "CMM dimensional inspection",
      "First article inspection (FAI)",
      "Statistical process control (SPC)",
      "Full quality documentation and CoC",
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

export default function PrecisionManufacturing() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home precmfg-page-wrapper">

      <section className="precmfg-hero">
        <div className="precmfg-hero-bg" style={{ backgroundImage: `url(${PrecisionManufacturingBg})` }} />
        <div className="precmfg-hero-overlay" />
        <div className="precmfg-hero-content">
          <h1 className="precmfg-hero-title">
            <span>BUILT TIGHT.</span><br />
            <span>BUILT RIGHT.</span>
          </h1>
          <p className="precmfg-hero-subtitle">
            High-accuracy CNC machining, fabrication, and assembly for aerospace, defence, and industrial applications — where every micron matters.
          </p>
        </div>
        <a href="#precmfg-services" className="hero-scroll-chevrons" aria-label="Scroll down">
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

      <section id="precmfg-services" ref={ref1} className={`about-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <p className="section-label">Our Capability</p>
            <h2 className="section-heading">MANUFACTURED TO THE LAST MICRON.</h2>
            <p className="section-description">
              CHDK Technology Center operates precision manufacturing facilities equipped with advanced CNC machining, metrology, and quality systems — delivering components that meet the tightest tolerances in aerospace, defence, and industrial engineering.
            </p>
          </div>
        </div>
      </section>

      <section className="precmfg-section clients-section">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-heading">MANUFACTURING SERVICES</h2>
          <div className="precmfg-grid">
            {SERVICES_DATA.map((s, i) => (
              <div key={i} className="precmfg-card">
                <div className="precmfg-glow-line" />
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