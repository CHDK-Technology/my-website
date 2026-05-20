import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import appbg from "../../assets/app-dev-hero.png";

import logo from "../../assets/logo.png";
import "../Home.css";
import "./AppDev.css";

const APPDEV_DATA = [
  {
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile applications for iOS and Android — built for performance, scalability, and a seamless user experience.",
    points: [
      "React Native and Flutter cross-platform apps",
      "Native iOS (Swift) and Android (Kotlin) development",
      "Offline-first architecture",
      "Push notifications and real-time sync",
    ],
  },
  {
    title: "Web Application Development",
    desc: "Robust, scalable web applications that power business operations — from internal tools and dashboards to customer-facing platforms.",
    points: [
      "React, Next.js, and modern frontend frameworks",
      "RESTful API and GraphQL integration",
      "Role-based access and authentication",
      "Progressive Web App (PWA) capability",
    ],
  },
  {
    title: "Custom Enterprise Solutions",
    desc: "Tailored software solutions designed to streamline your business processes, automate workflows, and integrate with your existing systems.",
    points: [
      "ERP and CRM integrations",
      "Custom workflow and process automation",
      "Data dashboards and analytics panels",
      "Third-party API and payment gateway integration",
    ],
  },
  {
    title: "UI/UX Design",
    desc: "User-centred design that combines aesthetic precision with intuitive functionality — ensuring every touchpoint delivers a great experience.",
    points: [
      "Wireframing and interactive prototyping",
      "Design systems and component libraries",
      "Accessibility-first design (WCAG compliant)",
      "User testing and iterative refinement",
    ],
  },
  {
    title: "Backend & API Development",
    desc: "Secure, high-performance backend systems and APIs that form the backbone of your digital products.",
    points: [
      "Node.js, Python, and Java backends",
      "Microservices and serverless architecture",
      "Database design (SQL and NoSQL)",
      "Secure authentication and data encryption",
    ],
  },
  {
    title: "App Maintenance & Support",
    desc: "Ongoing maintenance, performance monitoring, and feature updates to keep your applications running smoothly post-launch.",
    points: [
      "Bug fixes and performance optimisation",
      "OS and dependency updates",
      "Feature enhancements and version upgrades",
      "24/7 monitoring and incident response",
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

export default function AppDev() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home appdev-page-wrapper">

      <section className="appdev-hero">
        <div className="appdev-hero-bg" style={{ backgroundImage: `url(${appbg})` }} />
        <div className="appdev-hero-overlay" />

        <div className="appdev-hero-content">
          <h1 className="appdev-hero-title">
            <span>APPS THAT WORK.</span><br />
            <span>PRODUCTS THAT GROW.</span>
          </h1>
          <p className="appdev-hero-subtitle">
            End-to-end mobile and web application development — from strategy and design to deployment and support, built to scale with your business.
          </p>
        </div>

        <a href="#appdev-services" className="hero-scroll-chevrons" aria-label="Scroll down">
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

      <section id="appdev-services" ref={ref1} className={`about-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <p className="section-label">Our Capability</p>
            <h2 className="section-heading">BUILT FOR THE REAL WORLD.</h2>
            <p className="section-description">
              CHDK Technology Center provides end-to-end mobile and web application development services. We design, develop, and deploy digital products that help businesses grow their digital presence, streamline operations, and reach customers effectively.
            </p>
          </div>
        </div>
      </section>

      <section className="appdev-section clients-section">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-heading">DEVELOPMENT SERVICES</h2>

          <div className="appdev-grid">
            {APPDEV_DATA.map((item, i) => (
              <div key={i} className="appdev-card">
                <div className="appdev-glow-line" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <ul>
                  {item.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}