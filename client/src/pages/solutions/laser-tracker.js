import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import "../Home.css";
import "./laser-tracker.css";

const SERVICES_DATA = [
  {
    title: "Large-Scale Component Measurement",
    desc: "Ultra-precise 3D coordinate measurement of large components and assemblies — capturing spatial data with sub-millimetre accuracy over distances up to 80 metres.",
    points: [
      "Measure components too large for CMMs",
      "Suitable for aircraft, ships, and heavy machinery",
      "Real-time feedback during assembly",
      "Traceable to international measurement standards",
    ],
  },
  {
    title: "Machinery Alignment & Installation",
    desc: "Precision alignment of industrial machinery, turbines, and critical equipment to ensure correct positioning and optimal operational performance from day one.",
    points: [
      "Shaft and coupling alignment",
      "Base plate and foundation levelling",
      "Turbine, pump, and compressor alignment",
      "Pre- and post-installation verification",
    ],
  },
  {
    title: "Aerospace Structure Inspection",
    desc: "High-accuracy dimensional verification of aerospace structures, fuselage sections, and wing assemblies — meeting the strictest aerospace quality requirements.",
    points: [
      "Fuselage, wing, and empennage inspection",
      "Jig and tooling verification",
      "Assembly fit-check and shimming support",
      "Full traceability to AS9100 / NADCAP standards",
    ],
  },
  {
    title: "Quality Assurance & Deviation Reporting",
    desc: "Comprehensive dimensional analysis comparing measured data against design CAD models — producing detailed deviation reports and non-conformance documentation.",
    points: [
      "CAD-to-part comparison with colour maps",
      "GD&T analysis and tolerance validation",
      "First article inspection (FAI) reporting",
      "Non-conformance and SCAR documentation",
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

export default function LaserTracker() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home laser-page-wrapper">

      <section className="laser-hero">
        <div className="laser-hero-bg" style={{ backgroundImage: "url('/laser-tracker-hero.jpg')" }} />
        <div className="laser-hero-overlay" />
        <div className="laser-hero-content">
          <h1 className="laser-hero-title">
            <span>ACCURACY AT</span><br />
            <span>ANY SCALE.</span>
          </h1>
          <p className="laser-hero-subtitle">
            Ultra-precise 3D measurement of large components and assemblies — capturing spatial coordinates with exceptional accuracy for aerospace, defence, and heavy engineering.
          </p>
        </div>
        <a href="#laser-services" className="hero-scroll-chevrons" aria-label="Scroll down">
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

      <section id="laser-services" ref={ref1} className={`about-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <p className="section-label">Our Capability</p>
            <h2 className="section-heading">MEASURE WHAT OTHERS CAN'T.</h2>
            <p className="section-description">
              CHDK Technology Center uses advanced laser tracker systems to deliver sub-millimetre accuracy across large-scale industrial and aerospace environments. Where conventional CMMs fall short, our portable laser tracker solutions step in.
            </p>
          </div>
        </div>
      </section>

      <section className="laser-section clients-section">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-heading">LASER TRACKER SERVICES</h2>
          <div className="laser-grid">
            {SERVICES_DATA.map((s, i) => (
              <div key={i} className="laser-card">
                <div className="laser-glow-line" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul>{s.points.map((pt, j) => <li key={j}>{pt}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ref2} className={`about-section ${show2 ? "highlights-visible" : ""}`}>
        <div className="container">
          <p className="section-label">Our Approach</p>
          <h2 className="section-heading">HOW WE WORK</h2>
          <div className="laser-process-grid">
            <div className="laser-process-step">
              <span className="laser-process-number">01</span>
              <h3>Set Up</h3>
              <p className="section-description">Laser tracker positioned and calibrated on-site with reference targets established across the measurement volume.</p>
            </div>
            <div className="laser-process-step">
              <span className="laser-process-number">02</span>
              <h3>Measure</h3>
              <p className="section-description">Precise 3D coordinates captured across all critical features, surfaces, and datums in real time.</p>
            </div>
            <div className="laser-process-step">
              <span className="laser-process-number">03</span>
              <h3>Report</h3>
              <p className="section-description">Full deviation analysis against CAD nominal, with certified inspection reports delivered to your quality team.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}