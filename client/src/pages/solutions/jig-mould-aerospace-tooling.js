import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import "../Home.css";
import "./jig-mould-aerospace-tooling.css";
import JigMouldHero from "../../assets/jig-mould-hero.png";

const SERVICES_DATA = [
  {
    title: "Aerospace Assembly Jigs & Fixtures",
    desc: "Design and manufacture of precision assembly jigs and fixtures for aircraft structures, fuselage sections, and wing assemblies — ensuring dimensional accuracy throughout the build process.",
    points: [
      "Drill jigs and assembly fixtures",
      "Wing, fuselage, and empennage tooling",
      "Datum-referenced modular jig systems",
      "Manufactured to AS9100 quality standards",
    ],
  },
  {
    title: "Injection Mould Tooling",
    desc: "High-precision injection mould tool design and manufacture for plastics and composites — delivering tools built for long production runs with consistent dimensional output.",
    points: [
      "Single and multi-cavity mould tools",
      "Hot runner and cold runner systems",
      "Steel and aluminium tool materials",
      "EDM, milling, and polishing to mirror finish",
    ],
  },
  {
    title: "Press & Forming Dies",
    desc: "Precision press tools, forming dies, and blanking tools for sheet metal operations — designed for repeatability and longevity in high-volume production environments.",
    points: [
      "Blanking, piercing, and forming dies",
      "Progressive and compound die sets",
      "Hardened tool steel construction",
      "Die design optimised for material flow",
    ],
  },
  {
    title: "Check Fixtures & CMM Fixtures",
    desc: "Purpose-built checking fixtures and CMM holding fixtures to ensure fast, repeatable quality inspection of manufactured components throughout production.",
    points: [
      "CMM fixture design and manufacture",
      "Go/no-go gauges and attribute gauges",
      "Surface plate checking fixtures",
      "Custom datum and clamping systems",
    ],
  },
  {
    title: "Composite & Layup Tooling",
    desc: "Precision composite layup tools, mandrels, and mould tools for carbon fibre and glass fibre components — critical for aerospace, defence, and motorsport applications.",
    points: [
      "CFRP and GFRP layup mandrels",
      "Autoclave-rated composite moulds",
      "Invar and Aluminium tooling plates",
      "Thermal expansion coefficient matched tooling",
    ],
  },
  {
    title: "Tooling Repair & Refurbishment",
    desc: "Inspection, repair, and refurbishment of worn or damaged jigs, moulds, and fixtures — restoring tooling to original specification and extending operational life.",
    points: [
      "Dimensional survey of existing tooling",
      "Weld repair and remachining",
      "Recoating and surface restoration",
      "Verification against original design data",
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

export default function JigMouldAerospaceTooling() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home jigmould-page-wrapper">

      <section className="jigmould-hero">
        <div className="jigmould-hero-bg" style={{ backgroundImage: `url(${JigMouldHero})` }} />
        <div className="jigmould-hero-overlay" />
        <div className="jigmould-hero-content">
          <h1 className="jigmould-hero-title">
            <span>TOOLS THAT HOLD</span><br />
            <span>ZERO TOLERANCE.</span>
          </h1>
          <p className="jigmould-hero-subtitle">
            Precision jigs, moulds, fixtures, and aerospace tooling — manufactured to the tightest tolerances for applications where failure is not an option.
          </p>
        </div>
        <a href="#jigmould-services" className="hero-scroll-chevrons" aria-label="Scroll down">
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

      <section id="jigmould-services" ref={ref1} className={`about-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <p className="section-label">Our Capability</p>
            <h2 className="section-heading">PRECISION TOOLING FOR CRITICAL INDUSTRIES.</h2>
            <p className="section-description">
              CHDK Technology Center designs and manufactures precision tooling for aerospace, defence, and industrial manufacturing. From assembly jigs to injection mould tools, every item is built to exact tolerances with full quality documentation.
            </p>
          </div>
        </div>
      </section>

      <section className="jigmould-section clients-section">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-heading">TOOLING SERVICES</h2>
          <div className="jigmould-grid">
            {SERVICES_DATA.map((s, i) => (
              <div key={i} className="jigmould-card">
                <div className="jigmould-glow-line" />
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