import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import itbg from "../../assets/it-bg.png";
import itAbout from "../../assets/it-about.png";

import "../Home.css";
import "../business.css";
import "./ITSolutions.css";


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
    title: "Website Development",
    desc: "Professional, high-performance websites built with modern frameworks — from corporate portals and landing pages to complex multi-page web applications.",
  },
  {
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile applications for iOS and Android — designed for performance, usability, and seamless user experience.",
  },
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Performance-driven Meta advertising campaigns that reach your target audience, generate quality leads, and maximise your return on ad spend.",
  },
  {
    title: "Google Ads",
    desc: "Strategic Google Ads management — Search, Display, and YouTube campaigns designed to drive high-intent traffic and measurable business results.",
  },
  {
    title: "Search Engine Optimisation (SEO)",
    desc: "Comprehensive SEO strategies that improve organic search rankings, drive sustained website traffic, and build long-term digital visibility.",
  },
  {
    title: "Digital Strategy & Consulting",
    desc: "End-to-end digital transformation consulting — helping businesses define, plan, and execute their digital growth strategy with clarity and confidence.",
  },
];

const STEPS = [
  {
    title: "End-to-End Digital Partner",
    desc: "From building your digital presence to driving measurable growth — CHDK provides the full spectrum of IT and digital marketing services under one roof.",
  },
  {
    title: "Performance-Driven Marketing",
    desc: "Every campaign, ad, and SEO strategy we execute is tied to clear, measurable business goals — traffic, leads, conversions, and revenue growth.",
  },
  {
    title: "Technology That Scales",
    desc: "The websites and apps we build are architected to grow with your business — scalable, secure, and ready for the demands of tomorrow.",
  },
  {
    title: "Dedicated Team. Real Results.",
    desc: "Our in-house team of developers, designers, and marketers work closely with clients to deliver results that directly impact business performance.",
  },
];

export default function ITSolutions() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home biz-page-wrapper it-page">

      {/* ===== HERO ===== */}
      <section className="biz-hero">
        <div className="biz-hero-bg" style={{ backgroundImage: `url(${itbg})` }} />
        <div className="biz-hero-overlay" />

        <div className="biz-hero-content">
          <h1 className="biz-hero-title">
            DIGITAL GROWTH.<br />REAL RESULTS.
          </h1>
          <p className="biz-hero-subtitle">
            End-to-end IT and digital marketing services — from website and app development to Meta Ads, Google Ads, and SEO — helping businesses grow their digital presence and reach.
          </p>
        </div>

        <a href="#it-about" className="hero-scroll-chevrons" aria-label="Scroll down">
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
      <section id="it-about" className="about-section">
        <div className="container about-intro-grid">

          <div>
            <p className="section-label">Overview</p>
            <h2 className="section-heading">IT & DIGITAL MARKETING SOLUTIONS</h2>
            <p className="section-description highlight">
              CHDK Technology Center provides end-to-end IT and digital marketing services that help businesses build a powerful online presence and drive measurable growth.
            </p>
            <p className="section-description">
              From website and mobile app development to performance-driven marketing solutions — Meta Ads, Google Ads, and SEO — we deliver the complete digital toolkit modern businesses need to compete and grow.
            </p>
          </div>

          <img
            src={itAbout}
            alt="IT Solutions"
            className="about-featured-image"
          />                     

        </div>
      </section>

      {/* ===== STICKY SCROLL ===== */}
      <section className="aero-sticky-section">
        <div className="aero-sticky-container">

          <div className="aero-sticky-left">
            <h2>BUILT FOR<br />DIGITAL<br />EXCELLENCE</h2>
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