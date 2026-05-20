import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import AgricultureBg from "../../assets/Agriculture.png";
import agricultureAbout from "../../assets/agriculture-about.png";



import "../Home.css";
import "../business.css";
import "./Agriculture.css";


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
    title: "Solar Cold Storage",
    desc: "Off-grid solar-powered cold storage solutions that extend shelf life and reduce post-harvest losses for farmers and agri-businesses.",
  },
  {
    title: "Conventional Cold Storage",
    desc: "Reliable, high-capacity conventional cold storage systems designed for bulk storage of perishable produce across all climate conditions.",
  },
  {
    title: "Solar & Electric Dryers",
    desc: "Advanced solar, electric, hybrid, and tunnel dryers engineered to efficiently dehydrate fruits, vegetables, and agricultural produce.",
  },
  {
    title: "Food Processing Machines",
    desc: "Vegetable cutting, grinding, and processing equipment that improves operational speed, hygiene, and output at farm and commercial level.",
  },
  {
    title: "Vegetable Coolers",
    desc: "Compact, energy-efficient coolers built to preserve freshness and nutritional value of vegetables during storage and transit.",
  },
  {
    title: "Ripening Chambers",
    desc: "Precision-controlled ripening chambers for uniform, commercial-grade ripening of fruits — reducing waste and improving market quality.",
  },
];

const STEPS = [
  {
    title: "Reduce Post-Harvest Losses",
    desc: "Our cold storage and preservation systems directly address the critical problem of food wastage at farm and supply chain level.",
  },
  {
    title: "Sustainable Energy Integration",
    desc: "Solar-powered storage solutions reduce operational costs while minimising environmental impact for agri-businesses.",
  },
  {
    title: "Customised for Every Scale",
    desc: "From small farm units to large commercial facilities — our systems are designed and sized to meet your exact requirements.",
  },
  {
    title: "End-to-End Support",
    desc: "From system design and installation to commissioning and after-sales service, CHDK supports you at every step.",
  },
];

export default function Agriculture() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home biz-page-wrapper agri-page">

      {/* ===== HERO ===== */}
      <section className="biz-hero">
     <div className="biz-hero-bg" style={{ backgroundImage: `url(${AgricultureBg})` }} />
        
        <div className="biz-hero-overlay" />

        <div className="biz-hero-content">
          <h1 className="biz-hero-title">
            SMART STORAGE<br />FOR SUSTAINABLE<br />AGRICULTURE
          </h1>
          <p className="biz-hero-subtitle">
            Advanced food preservation and processing solutions that reduce waste, enhance shelf life, and empower farmers.
          </p>
        </div>

        <a href="#agri-about" className="hero-scroll-chevrons" aria-label="Scroll down">
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
      <section id="agri-about" className="about-section">
        <div className="container about-intro-grid">

          <div>
            <p className="section-label">Overview</p>
            <h2 className="section-heading">FOOD PRESERVATION & PROCESSING</h2>
            <p className="section-description highlight">
              CHDK Technology Center is a leading manufacturer of advanced food preservation and processing solutions that directly address post-harvest losses across India.
            </p>
            <p className="section-description">
              Our product range — from Solar Cold Storage to Tunnel Dryers and Ripening Chambers — is designed to enhance shelf life, support sustainable agricultural practices, and empower farmers and agri-businesses at every scale.
            </p>
          </div>

          <img
            src={agricultureAbout}
            alt="Agriculture Solutions"
            className="about-featured-image"
          />
        </div>
      </section>

      {/* ===== STICKY SCROLL ===== */}
      <section className="aero-sticky-section">
        <div className="aero-sticky-container">

          <div className="aero-sticky-left">
            <h2>BUILT FOR<br />SUSTAINABLE<br />GROWTH</h2>
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