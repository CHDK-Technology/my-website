import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../../assets/logo.png";
import "../Home.css";
import "./DigitalMarketing.css";
import digitalbg from "../../assets/digital-marketing-hero.png";

const SERVICES_DATA = [
  {
    title: "Social Media Marketing",
    desc: "Strategic social media management across LinkedIn, Instagram, Facebook, and more — building your brand presence, growing your audience, and driving meaningful engagement.",
    points: [
      "Platform strategy and content calendar",
      "Branded post design and copywriting",
      "Community management and engagement",
      "Paid social advertising campaigns",
    ],
  },
  {
    title: "Content Marketing",
    desc: "High-quality, purpose-driven content that educates your audience, builds authority, and supports your SEO and lead generation goals.",
    points: [
      "Blog articles and long-form content",
      "Case studies and whitepapers",
      "Email newsletters and drip campaigns",
      "Video scripts and explainer content",
    ],
  },
  {
    title: "Pay-Per-Click Advertising (PPC)",
    desc: "Data-driven PPC campaigns on Google, Meta, and LinkedIn — designed to maximise return on ad spend and drive qualified leads to your business.",
    points: [
      "Google Search and Display campaigns",
      "Meta (Facebook & Instagram) ads",
      "LinkedIn B2B lead generation ads",
      "Campaign tracking and ROI reporting",
    ],
  },
  {
    title: "Email Marketing",
    desc: "Targeted email marketing campaigns that nurture leads, retain customers, and drive repeat business — built around your audience segments and buyer journey.",
    points: [
      "Email campaign design and copywriting",
      "Automation workflows and drip sequences",
      "List segmentation and personalisation",
      "Open rate, click, and conversion tracking",
    ],
  },
  {
    title: "Brand Strategy & Identity",
    desc: "Defining and articulating your brand's positioning, messaging, and visual identity — ensuring consistency across every digital touchpoint.",
    points: [
      "Brand positioning and messaging framework",
      "Logo and visual identity design",
      "Brand guidelines and asset library",
      "Tone of voice and communication strategy",
    ],
  },
  {
    title: "Analytics & Performance Reporting",
    desc: "Clear, actionable reporting on your digital marketing performance — giving you the data you need to make informed decisions and optimise campaigns.",
    points: [
      "Google Analytics 4 setup and reporting",
      "Monthly performance dashboards",
      "Campaign attribution and ROI analysis",
      "Competitor benchmarking and insights",
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

export default function DigitalMarketing() {
  const [ref1, show1] = useReveal();
  const [ref2, show2] = useReveal();

  return (
    <div className="home digmkt-page-wrapper">

      <section className="digmkt-hero">
        <div className="digmkt-hero-bg" style={{ backgroundImage: `url(${digitalbg})` }} />
        <div className="digmkt-hero-overlay" />
        <div className="digmkt-hero-content">
          <h1 className="digmkt-hero-title">
            <span>GROW ONLINE.</span><br />
            <span>REACH FURTHER.</span>
          </h1>
          <p className="digmkt-hero-subtitle">
            Data-driven digital marketing strategies that build your brand, generate qualified leads, and deliver measurable return on investment across every channel.
          </p>
        </div>
        <a href="#digmkt-services" className="hero-scroll-chevrons" aria-label="Scroll down">
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

      <section id="digmkt-services" ref={ref1} className={`about-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="container">
          <div style={{ maxWidth: "800px" }}>
            <p className="section-label">Our Capability</p>
            <h2 className="section-heading">MARKETING THAT MOVES THE NEEDLE.</h2>
            <p className="section-description">
              CHDK Technology Center delivers integrated digital marketing solutions that connect your brand with the right audience at the right time. From social media to paid advertising, every campaign is built around your business goals and measured against real results.
            </p>
          </div>
        </div>
      </section>

      <section className="digmkt-section clients-section">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h2 className="section-heading">DIGITAL MARKETING SERVICES</h2>
          <div className="digmkt-grid">
            {SERVICES_DATA.map((s, i) => (
              <div key={i} className="digmkt-card">
                <div className="digmkt-glow-line" />
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