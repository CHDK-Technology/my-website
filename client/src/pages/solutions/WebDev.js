import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import WebDevBg from "../../assets/web-dev-hero.png";
import "../Home.css";
import "./WebDev.css";

const SERVICES_DATA = [
  {
    title: "Custom Website Development",
    desc: "Bespoke websites built from the ground up — designed for your brand, optimised for performance, and engineered to convert visitors into customers.",
    points: [
      "Fully custom design and development",
      "React, Next.js, and modern web technologies",
      "Mobile-first and fully responsive",
      "Fast load times and Core Web Vitals optimised",
    ],
  },


  {
    title: "Web Portal & Dashboard Development",
    desc: "Secure web portals, admin dashboards, and client-facing platforms — giving your team and customers real-time access to the data and tools they need.",
    points: [
      "Role-based access control",
      "Real-time data dashboards",
      "Client and vendor portal systems",
      "API integrations with third-party systems",
    ],
  },
  {
    title: "Website Maintenance & Support",
    desc: "Ongoing website maintenance, security updates, performance monitoring, and content updates — keeping your website fast, secure, and up to date.",
    points: [
      "Regular security patches and updates",
      "Performance monitoring and optimisation",
      "Content updates and page additions",
      "Hosting and uptime management",
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

export default function WebDev() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home webdev-page-wrapper">

      <section className="webdev-hero">
        <div className="webdev-hero-bg" style={{ backgroundImage: `url(${WebDevBg})` }} />
        <div className="webdev-hero-overlay" />
        <div className="webdev-hero-content">
          <h1 className="webdev-hero-title">
            <span>YOUR BRAND.</span><br />
            <span>BUILT FOR THE WEB.</span>
          </h1>
          <p className="webdev-hero-subtitle">
            Custom, high-performance websites and web applications — built to represent your brand, engage your audience, and grow your business online.
          </p>
        </div>
        <a href="#webdev-services" className="hero-scroll-chevrons" aria-label="Scroll down">
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

      <section id="webdev-services" ref={ref1} className={`about-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <p className="section-label">Our Capability</p>
            <h2 className="section-heading">WEB THAT WORKS FOR YOU.</h2>
            <p className="section-description">
              CHDK Technology Center designs and develops custom websites and web applications that combine strong visual identity with technical performance. From corporate websites to complex portals, we build digital experiences that deliver real business results.
            </p>
          </div>
        </div>
      </section>

      <section className="webdev-section clients-section">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-heading">WEB DEVELOPMENT SERVICES</h2>
          <div className="webdev-grid">
            {SERVICES_DATA.map((s, i) => (
              <div key={i} className="webdev-card">
                <div className="webdev-glow-line" />
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