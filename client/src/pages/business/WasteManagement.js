import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import WasteBg from "../../assets/waste-hero.jpeg";
import wasteAbout from "../../assets/waste-about.png";

import "../Home.css";
import "../business.css";
import "./WasteManagement.css";


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
    title: "SWACH — Smart Waste Management",
    desc: "Our patented SWACH system efficiently compresses waste into compact blocks — dramatically reducing storage space, simplifying handling, and enabling easier recycling.",
  },
  {
    title: "Waste Compaction Systems",
    desc: "Industrial-grade compaction equipment designed for dump yards and large-scale waste processing facilities — improving operational efficiency and reducing transport costs.",
  },
  {
    title: "Recycling Integration",
    desc: "End-to-end solutions that connect waste collection, compression, and recycling — supporting a complete circular economy approach for municipalities and industries.",
  },
  {
    title: "Municipal Waste Solutions",
    desc: "Scalable waste management systems designed for municipal corporations, urban bodies, and government agencies managing high-volume waste streams.",
  },
  {
    title: "Industrial Waste Processing",
    desc: "Customised waste handling and processing solutions for manufacturing plants, construction sites, and industrial facilities with diverse waste types.",
  },
  {
    title: "Sustainability Consulting",
    desc: "Expert guidance on adopting sustainable waste management practices — helping organisations reduce landfill dependence and meet environmental compliance requirements.",
  },
];

const STEPS = [
  {
    title: "Patented Innovation — SWACH",
    desc: "Our flagship SWACH system is a patented, home-grown innovation that compresses waste into compact blocks — making storage, transport, and recycling significantly more efficient.",
  },
  {
    title: "Reduce, Compress, Recycle",
    desc: "Our approach addresses waste at every stage — reducing volume at source, compressing for handling, and enabling recycling — contributing to cleaner, more sustainable environments.",
  },
  {
    title: "Scalable for Any Setting",
    desc: "From small municipal facilities to large industrial dump yards — our waste management systems are designed and sized to match the scale of your operation.",
  }
];

export default function WasteManagement() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home biz-page-wrapper waste-page">

      {/* ===== HERO ===== */}
      <section className="biz-hero">
        <div className="biz-hero-bg" style={{ backgroundImage: `url(${WasteBg})` }} />
        <div className="biz-hero-overlay" />

        <div className="biz-hero-content">
          <p className="biz-hero-tag">Waste Management</p>
          <h1 className="biz-hero-title">
           
           
           CLEANER CITIES.<br />SMARTER WASTE.
          </h1>
          <p className="biz-hero-subtitle">
           Patented smart waste management solutions that compress, simplify, and support recycling — building cleaner and more sustainable environments.
          </p>
        </div>

        <a href="#waste-about" className="hero-scroll-chevrons" aria-label="Scroll down">
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
      <section id="waste-about" className="about-section">
        <div className="container about-intro-grid">

          <div>
            <p className="section-label">Overview</p>
            <h2 className="section-heading">SMART WASTE MANAGEMENT</h2>
            <p className="section-description highlight">
              CHDK Technology Center has developed SWACH — a patented Smart Waste Management solution that efficiently compresses waste into compact blocks, transforming how cities and industries handle their waste.
            </p>
            <p className="section-description">
              By reducing storage space, simplifying handling, and promoting recycling, SWACH contributes to cleaner and more sustainable environments — supporting municipalities, industrial facilities, and communities across India.
            </p>
          </div>

          <div className="about-image-wrapper">
            <img src={wasteAbout} alt="Waste Management" className="about-featured-image" />
          </div>

        </div>
      </section>

      {/* ===== STICKY SCROLL ===== */}
      <section className="aero-sticky-section">
        <div className="aero-sticky-container">

          <div className="aero-sticky-left">
            <h2>BUILT FOR A<br />CLEANER<br />TOMORROW</h2>
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