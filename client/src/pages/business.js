import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

import "../pages/Home.css"; 
import "./business.css";

const VERTICALS_GRID_DATA = [
  {
    title: "Aerospace & Defence",
    desc: "Providing expert inspection, CMM, reverse engineering, and satellite lab calibration services for superior industrial performance",
    img: "/acc2.webp",
  },
  {
    title: "Smart Storage",
    desc: "Smart technologies designed to minimize losses, enhance shelf life, and maximize the value of every harvest.",
    img: "/acc1.webp",
  },
  {
    title: "Renewable Energy",
    desc: "Sustainable Energy Solutions for a Cleaner Tomorrow",
    img: "/acc4.webp",
  },
  {
    title: "Infrastructure",
    desc: "Building scalable, and future-ready infrastructure from the ground up.",
    img: "/acc6.webp",
  },
  {
    title: "Industrial Services",
    desc: "Innovation That Drives Industrial Growth.",
    img: "/acc5.webp",
  },
  {
    title: "Waste Management",
    desc: "Driving sustainability through advanced waste reduction and management methods.",
    img: "/acc7.webp",
  },
  {
    title: "IT & Digital",
    desc: "Secure, Scalable, and Innovative Digital Services",
    img: "/acc8.webp",
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

export default function BusinessPage() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home biz-page-wrapper">

      <section className="biz-hero">
        <div className="biz-hero-bg" style={{ backgroundImage: "url('/Business-Overview.jpeg')" }} />
        <div className="biz-hero-overlay" />

        <div className="biz-hero-content">
          <h1 className="biz-hero-title">
            <span>Creating Value</span><br />
            <span>Through Innovation</span>
          </h1>
          <p className="biz-hero-subtitle">
            A multi-industry solutions provider committed to engineering excellence and operational innovation. We build scalable systems that enhance productivity, reliability, and sustainable progress
          </p>
        </div>

        <a href="#capability" className="hero-scroll-chevrons" aria-label="Scroll down">
          <svg className="chevron chevron-1" viewBox="0 0 32 18" fill="none">
            <polyline points="2,2 16,16 30,2" />
          </svg>
          <svg className="chevron chevron-2" viewBox="0 0 32 18" fill="none">
            <polyline points="2,2 16,16 30,2" />
          </svg>
          <svg className="chevron chevron-3" viewBox="0 0 32 18" fill="none">
            <polyline points="2,2 16,16 30,2" />
          </svg>
          <svg className="chevron chevron-4" viewBox="0 0 32 18" fill="none">
            <polyline points="2,2 16,16 30,2" />
          </svg>
        </a>

        <div className="social">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link social-linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link social-instagram" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link social-facebook" aria-label="Facebook"><FaFacebook /></a>
          <a href="mailto:info@chdkindia.com" className="social-link social-mail" aria-label="Email"><HiOutlineMail /></a>
        </div>
      </section>

      <section id="capability" ref={ref1} className={`about-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <h2 className="section-heading">DESIGNED TO DELIVER</h2>
            <p className="section-description">
             We build high-performance engineering and technology solutions tailored for modern industrial challenges and long-term growth
            </p>
          </div>
        </div>
      </section>

      <section className="business-section clients-section">
        <div className="container">
          <h2 className="section-heading">BUSINESS DOMAINS</h2>

          <div className="business-grid">
            {VERTICALS_GRID_DATA.map((v, i) => (
              <div key={i} className="domain-card">
                <div className="domain-content">
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
                <div className="domain-glow-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ref2} className={`about-section ${show2 ? "highlights-visible" : ""}`}>
        <div className="container">
          <h2 className="section-heading">HOW WE WORK</h2>

          <div className="process-grid">
            <div className="process-step">
              <span className="process-number">01</span>
              <h3>Design & Prototype</h3>
              <p className="section-description">Every solution begins with strategic planning, technical expertise, and innovative thinking to create systems optimized for performance, efficiency, and scalability.</p>
            </div>
            <div className="process-step">
              <span className="process-number">02</span>
              <h3>Build & Test</h3>
              <p className="section-description"> We transform concepts into reality through precision engineering, rigorous quality standards, and real-world performance testing.</p>
            </div>
            <div className="process-step">
              <span className="process-number">03</span>
              <h3>Deliver</h3>
              <p className="section-description">Our team delivers future-ready solutions designed for operational reliability, long-term sustainability, and seamless industrial integration.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}