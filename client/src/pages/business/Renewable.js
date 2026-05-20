import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import RenewableBg from "../../assets/Renewable.png";
import renewableAbout from "../../assets/renewable-about.png";

import "../Home.css";
import "../business.css";
import "./Renewable.css";


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
    title: "Solar Rooftop Systems",
    desc: "High-efficiency solar rooftop installations for residential, commercial, and industrial facilities — reducing energy bills and carbon footprint.",
  },
  {
    title: "Solar Trees",
    desc: "Unique space-saving Solar Tree structures that generate clean energy while enhancing the visual appeal of resorts, hotels, business parks, parking areas, and government facilities.",
  },
  {
    title: "Solar Cold Storage Integration",
    desc: "Solar-powered cold storage systems integrated with battery backup, enabling continuous operation day and night while supporting additional energy use for residential needs or agricultural needs.",
  },
  {
    title: "Energy Auditing & Consulting",
    desc: "Comprehensive energy assessments and consulting services to help businesses identify opportunities for renewable energy adoption and cost reduction.",
  },
  {
    title: "Operations & Maintenance",
    desc: "Ongoing O&M support to ensure solar installations perform at peak efficiency — including monitoring, cleaning, and technical servicing.",
  },
];

const STEPS = [
  {
    title: "Clean Energy for Every Scale",
    desc: "From rooftop systems for homes to large-scale solar installations for industrial parks — our solutions are designed to meet diverse energy needs.",
  },
  {
    title: "Innovative Solar Tree Design",
    desc: "Our patented Solar Tree combines aesthetic architecture with clean power generation — ideal for public spaces, campuses, and commercial properties.",
  },
  {
    title: "Reduced Operating Costs",
    desc: "Solar energy significantly lowers electricity expenses — delivering measurable financial returns alongside environmental benefits.",
  },
  {
    title: "End-to-End Project Execution",
    desc: "From site assessment and system design through to installation, commissioning, and long-term maintenance — CHDK handles the complete project lifecycle.",
  },
];

export default function Renewable() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home biz-page-wrapper renewable-page">

      {/* ===== HERO ===== */}
      <section className="biz-hero">
     <div className="biz-hero-bg" style={{ backgroundImage: `url(${RenewableBg})` }} />
        
        <div className="biz-hero-overlay" />

        <div className="biz-hero-content">
          <h1 className="biz-hero-title">
            POWERING A<br />CLEANER FUTURE
          </h1>
          <p className="biz-hero-subtitle">
            Innovative solar energy solutions — from rooftop systems to Solar Trees — delivering clean, sustainable power across industries and communities.
          </p>
        </div>

        <a href="#renewable-about" className="hero-scroll-chevrons" aria-label="Scroll down">
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
      <section id="renewable-about" className="about-section">
        <div className="container about-intro-grid">

          <div>
            <p className="section-label">Overview</p>
            <h2 className="section-heading">RENEWABLE ENERGY SOLUTIONS</h2>
            <p className="section-description highlight">
              CHDK Technology Center is a leading provider of innovative renewable energy solutions, delivering solar systems that reduce costs, protect the environment, and power the future.
            </p>
            <p className="section-description">
              Our Solar Tree is a unique, space-saving solution that generates clean energy while enhancing the aesthetic appeal of locations such as resorts, hotels, business parks, parking areas, and government facilities — combining sustainability with design.
            </p>
          </div>

<img
  src={renewableAbout}
  alt="Renewable Energy"
  className="about-featured-image"
/>

        </div>
      </section>

      {/* ===== STICKY SCROLL ===== */}
      <section className="aero-sticky-section">
        <div className="aero-sticky-container">

          <div className="aero-sticky-left">
            <h2>BUILT FOR A<br />SUSTAINABLE<br />TOMORROW</h2>
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