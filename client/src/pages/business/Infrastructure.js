import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import InfraBg from "../../assets/infrastructure.png";
import infraAbout from "../../assets/infrastructure-about.png";

import "../Home.css";
import "../business.css";
import "./Infrastructure.css";


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
    title: "PUF & Sandwich Panels",
    desc: "High-performance Polyurethane Foam (PUF) and sandwich panels offering superior insulation, structural strength, and quick installation for industrial and commercial buildings.",
  },
  {
    title: "Roofing Panels",
    desc: "Durable, weather-resistant roofing panel systems engineered for industrial sheds, warehouses, cold storage facilities, and large commercial structures.",
  },
  {
    title: "Flush & Overlap Doors",
    desc: "Precision-manufactured flush and overlap doors built for industrial facilities — combining structural integrity with smooth, reliable operation.",
  },
  {
    title: "Portable Houses",
    desc: "Rapidly deployable portable housing solutions for remote sites, project camps, and temporary accommodation — engineered for durability and comfort.",
  },
  {
    title: "Portable Offices",
    desc: "Modular, quickly assembled portable office units for construction sites, industrial parks, and remote project locations.",
  },
  {
    title: "Custom Modular Structures",
    desc: "Bespoke modular infrastructure solutions designed to client specifications — from control rooms and guard cabins to large-scale prefabricated facilities.",
  },
];

const STEPS = [
  {
    title: "Durability First",
    desc: "Every infrastructure product we manufacture is built to last — engineered with high-grade materials that withstand extreme weather, heavy use, and industrial environments.",
  },
  {
    title: "Insulation Efficiency",
    desc: "Our PUF panels and roofing systems provide industry-leading thermal and acoustic insulation, reducing energy consumption and operational costs.",
  },
  {
    title: "Rapid Deployment",
    desc: "Prefabricated and modular construction dramatically reduces on-site build time — getting your facility operational faster with minimal disruption.",
  },
  {
    title: "End-to-End Manufacturing",
    desc: "From design and fabrication to delivery and installation — CHDK manages the entire infrastructure supply chain under one roof.",
  },
];

export default function Infrastructure() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home biz-page-wrapper infra-page">

      {/* ===== HERO ===== */}
      <section className="biz-hero">
        <div className="biz-hero-bg" style={{ backgroundImage: `url(${InfraBg})` }} />
        <div className="biz-hero-overlay" />

        <div className="biz-hero-content">
          <h1 className="biz-hero-title">
            STRUCTURES BUILT<br />TO LAST
          </h1>
          <p className="biz-hero-subtitle">
            High-quality modular infrastructure products — PUF panels, roofing systems, portable offices and houses — engineered for durability, speed, and efficiency.
          </p>
        </div>

        <a href="#infra-about" className="hero-scroll-chevrons" aria-label="Scroll down">
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
      <section id="infra-about" className="about-section">
        <div className="container about-intro-grid">

          <div>
            <p className="section-label">Overview</p>
            <h2 className="section-heading">INFRASTRUCTURE SOLUTIONS</h2>
            <p className="section-description highlight">
              CHDK Technology Center manufactures high-quality infrastructure products designed for durability, insulation efficiency, and rapid deployment across diverse industries.
            </p>
            <p className="section-description">
              Our product range includes PUF Panels, Sandwich Panels, Roofing Panels, Flush Doors, Overlap Doors, Portable Houses, and Portable Offices — built to perform in demanding industrial and commercial environments.
            </p>
          </div>

          <img
            src={infraAbout}
            alt="Infrastructure"
            className="about-featured-image"
          /> 

        </div>
      </section>

      {/* ===== STICKY SCROLL ===== */}
      <section className="aero-sticky-section">
        <div className="aero-sticky-container">

          <div className="aero-sticky-left">
            <h2>BUILT FOR<br />TOMORROW'S<br />INDUSTRIES</h2>
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