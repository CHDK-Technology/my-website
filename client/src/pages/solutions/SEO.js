import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import "../Home.css";
import "./SEO.css";
import seoHero from "../../assets/seo-hero.png";

const SERVICES_DATA = [
  {
    title: "Technical SEO Audit",
    desc: "A comprehensive audit of your website's technical health — identifying crawl errors, speed issues, indexation problems, and structural weaknesses that are limiting your search rankings.",
    points: [
      "Crawlability and indexation analysis",
      "Core Web Vitals and page speed audit",
      "Mobile usability and responsive check",
      "Structured data and schema review",
    ],
  },
  {
    title: "On-Page SEO Optimisation",
    desc: "Systematic optimisation of your website's content, metadata, internal linking, and page structure to improve relevance and rankings for your target keywords.",
    points: [
      "Keyword mapping and content gap analysis",
      "Title tag, meta description, and heading optimisation",
      "Internal linking structure improvement",
      "Image optimisation and alt text",
    ],
  },
  {
    title: "Keyword Research & Strategy",
    desc: "In-depth keyword research to identify high-value search terms your target audience is using — forming the foundation of your entire content and SEO strategy.",
    points: [
      "Short-tail and long-tail keyword identification",
      "Search intent and competitor gap analysis",
      "Industry and location-specific keyword targeting",
      "Keyword priority matrix and content roadmap",
    ],
  },
  {
    title: "Content SEO & Blogging",
    desc: "SEO-focused content creation — from blog articles and landing pages to service pages — written to rank for your target keywords and drive organic traffic.",
    points: [
      "Keyword-optimised blog articles",
      "SEO landing page creation and optimisation",
      "Content refresh and updating of existing pages",
      "Topic cluster and pillar page strategy",
    ],
  },
  {
    title: "Link Building & Authority",
    desc: "Ethical, high-quality link building to increase your website's domain authority and improve rankings for competitive search terms in your industry.",
    points: [
      "Guest posting and editorial link outreach",
      "Industry directory and citation building",
      "Broken link reclamation",
      "Backlink profile audit and toxic link disavow",
    ],
  },
  {
    title: "Local SEO",
    desc: "Optimisation of your online presence for local and regional search — ensuring your business appears prominently when customers in your area search for your services.",
    points: [
      "Google Business Profile optimisation",
      "Local citation building and NAP consistency",
      "Local keyword targeting and landing pages",
      "Review generation and reputation management",
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

export default function SEO() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home seopage-page-wrapper">

      <section className="seopage-hero">
        <div className="seopage-hero-bg" style={{ backgroundImage: `url(${seoHero})` }} />
        <div className="seopage-hero-overlay" />
        <div className="seopage-hero-content">
          <h1 className="seopage-hero-title">
            <span>RANK HIGHER.</span><br />
            <span>GROW FASTER.</span>
          </h1>
          <p className="seopage-hero-subtitle">
            Data-driven SEO strategies that improve your search rankings, drive qualified organic traffic, and build long-term visibility for your business online.
          </p>
        </div>
        <a href="#seopage-services" className="hero-scroll-chevrons" aria-label="Scroll down">
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

      <section id="seopage-services" ref={ref1} className={`about-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <p className="section-label">Our Capability</p>
            <h2 className="section-heading">BE FOUND. BE CHOSEN.</h2>
            <p className="section-description">
              CHDK Technology Center delivers end-to-end SEO services that combine technical expertise, content strategy, and authority building — helping your business rank for the keywords that matter and attract customers who are ready to buy.
            </p>
          </div>
        </div>
      </section>

      <section className="seopage-section clients-section">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-heading">SEO SERVICES</h2>
          <div className="seopage-grid">
            {SERVICES_DATA.map((s, i) => (
              <div key={i} className="seopage-card">
                <div className="seopage-glow-line" />
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