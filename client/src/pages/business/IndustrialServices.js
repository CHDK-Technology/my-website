import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import IndustrialServicesBg from "../../assets/industrial-hero.png";
import industrialAbout from "../../assets/industrial-about.png";

import "../Home.css";
import "../business.css";
import "./IndustrialServices.css";


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

const CAPABILITIES = [
  {
    title: "Precision Inspection",
    desc: "High-accuracy dimensional inspection using advanced portable metrology tools — ensuring components conform to design specifications and industry standards.",
  },
  {
    title: "Tracking & Measurement",
    desc: "Laser tracker and large-volume measurement services for industrial assemblies, machinery alignment, and structural validation.",
  },
  {
    title: "3D Design & CAD/CAM",
    desc: "Comprehensive 3D design and CAD-CAM solutions that bridge the gap between concept and production-ready manufacturing.",
  },
  {
    title: "Reverse Engineering",
    desc: "Physical part analysis and CAD model recreation for obsolete components, enabling redesign, replication, and performance improvement.",
  },
  {
    title: "3D Scanning",
    desc: "Non-contact 3D scanning services capturing precise digital representations of industrial parts and assemblies for inspection and documentation.",
  },
  {
    title: "3D Printing & Prototyping",
    desc: "Rapid prototyping and additive manufacturing services to accelerate product development and reduce time-to-market.",
  },
];

const STEPS = [
  {
    title: "Improve Accuracy & Efficiency",
    desc: "Our precision inspection and measurement services help manufacturers identify deviations early — reducing rework, scrap, and quality costs.",
  },
  {
    title: "Advanced Technology Stack",
    desc: "We deploy industry-leading metrology tools including laser trackers, 3D scanners, and CAD-CAM systems to deliver reliable results.",
  },
  {
    title: "Sector-Agnostic Capability",
    desc: "Our industrial services support aerospace, defence, automotive, energy, and heavy manufacturing industries across India.",
  },
  {
    title: "Fast Turnaround",
    desc: "On-site deployment of portable equipment and experienced engineers ensures minimal disruption to your production schedule.",
  },
];

export default function IndustrialServices() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home biz-page-wrapper industrial-page">

      {/* ===== HERO ===== */}
      <section className="biz-hero">
        <div className="biz-hero-bg" style={{ backgroundImage: `url(${IndustrialServicesBg})` }} />
        <div className="biz-hero-overlay" />

        <div className="biz-hero-content">
          <h1 className="biz-hero-title">
            PRECISION AT<br />INDUSTRIAL SCALE
          </h1>
          <p className="biz-hero-subtitle">
            Comprehensive metrology, inspection, 3D design, and engineering services that improve accuracy, efficiency, and product development across industries.
          </p>
        </div>

        <a href="#industrial-about" className="hero-scroll-chevrons" aria-label="Scroll down">
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

      {/* ===== ABOUT ===== */}
      <section id="industrial-about" className="about-section">
        <div className="container about-intro-grid">

          <div>
            <p className="section-label">Overview</p>
            <h2 className="section-heading">INDUSTRIAL & METROLOGY SERVICES</h2>
            <p className="section-description highlight">
              CHDK offers comprehensive industrial and metrology services that help manufacturers improve accuracy, streamline operations, and accelerate product development.
            </p>
            <p className="section-description">
              From precision inspection and tracking measurement to 3D design, reverse engineering, CAD/CAM solutions, 3D scanning, and 3D printing — our services cover the full industrial engineering workflow.
            </p>
          </div>

          <div className="about-image-wrapper">
            <img src={industrialAbout} alt="Industrial Services" className="about-featured-image" />
          </div>

        </div>
      </section>

      {/* ===== STICKY SCROLL ===== */}
      <section className="aero-sticky-section">
        <div className="aero-sticky-container">

          <div className="aero-sticky-left">
            <h2>BUILT FOR<br />INDUSTRIAL<br />EXCELLENCE</h2>
          </div>

          <div className="aero-sticky-right">
            {STEPS.map((step, i) => (
              <div key={i} className="aero-step">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== CAPABILITIES GRID ===== */}
      <section ref={ref1} className={`business-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <p className="section-label">Capabilities</p>
          <h2 className="section-heading">WHAT WE DELIVER</h2>

          <div className="business-grid">
            {CAPABILITIES.map((item, i) => (
              <div key={i} className="domain-card">
                <div className="domain-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="domain-glow-line" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}