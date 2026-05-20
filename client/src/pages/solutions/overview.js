import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import "../Home.css";
import "./overview.css";
import ovbg from "../../assets/solutions-overview.png";
import obabout from "../../assets/solutions-about.png";



const SERVICE_CATEGORIES = [
  {
    num: "01",
    title: "Advanced Metrology",
    desc: "Precision inspection and measurement solutions using advanced portable metrology systems for aerospace, defence, and industrial applications.",
    path: "/solutions/advanced-metrology",
    links: [
      { name: "Laser Tracker Measurement", path: "/solutions/laser-tracker" },
      { name: "Portable Metrology", path: "/solutions/advanced-metrology" },
    ],
  },

  {
    num: "02",
    title: "Calibration Services",
    desc: "Accurate calibration and validation services ensuring compliance, reliability, and performance across critical industrial equipment.",
    path: "/solutions/calibration",
    links: [
      { name: "Calibration Services", path: "/solutions/calibration" },
      { name: "Testing & Compliance", path: "/solutions/testing-compliance" },
    ],
  },

  {
    num: "03",
    title: "3D Scanning & Reverse Engineering",
    desc: "High-accuracy 3D scanning, modelling, and reverse engineering solutions for product development and manufacturing workflows.",
    path: "/solutions/3d-scanning",
    links: [
      { name: "3D Scanning & Modelling", path: "/solutions/3d-scanning" },
      { name: "Reverse Engineering", path: "/solutions/reverse-engineering" },
    ],
  },

  {
    num: "04",
    title: "Precision Manufacturing & Tooling",
    desc: "Precision manufacturing, jig fixtures, mould development, and aerospace tooling built to high-performance engineering standards.",
    path: "/solutions/precision-manufacturing",
    links: [
      { name: "Precision Manufacturing", path: "/solutions/precision-manufacturing" },
      { name: "Jig, Mould & Aerospace Tooling", path: "/solutions/jig-mould-aerospace-tooling" },
    ],
  },

  {
    num: "05",
    title: "Web & App Development",
    desc: "Custom web and mobile application development focused on scalable architecture, performance, and seamless user experience.",
    path: "/solutions/web-development",
    links: [
      { name: "Web Development", path: "/solutions/web-development" },
      { name: "App Development", path: "/solutions/app-development" },
    ],
  },

  {
    num: "06",
    title: "Digital Marketing & SEO",
    desc: "Growth-focused digital marketing solutions including Meta Ads, Google Ads, and SEO strategies to drive traffic and generate leads.",
    path: "/solutions/digital-marketing",
    links: [
      { name: "Digital Marketing", path: "/solutions/digital-marketing" },
      { name: "SEO Services", path: "/solutions/seo" },
    ],
  },
];

const APPROACH_STEPS = [
  {
    num: "01",
    title: "Understand",
    desc: "We start with a deep-dive into your operational environment, technical requirements, and quality expectations — ensuring our solution is precisely engineered for your context.",
  },
  {
    num: "02",
    title: "Engineer",
    desc: "Using advanced tools and industry expertise, we design and build solutions that meet your exact specifications — with zero compromise on accuracy, compliance, or performance.",
  },
  {
    num: "03",
    title: "Deliver",
    desc: "Comprehensive deliverables — whether inspection reports, CAD files, manufactured parts, or deployed digital products — handed off with full documentation and support.",
  },
];

const INDUSTRIES = [
  { name: "Aerospace & Defence",     desc: "Precision metrology, tooling, and component inspection for India's most critical aerospace programmes." },
  { name: "Industrial Solutions",    desc: "Dimensional inspection, reverse engineering, and tooling for automotive OEMs and Tier 1 suppliers." },
  { name: "Renewable Energy",        desc: "Engineering and digital services supporting India's solar and clean energy infrastructure build-out." },
  { name: "Heavy Manufacturing",     desc: "Industrial metrology and inspection solutions for large-scale manufacturing plants and assemblies." },
  { name: "Infrastructure",          desc: "Design, fabrication and digital support for India's growing infrastructure and construction sector." },
  { name: "IT & Digital Businesses", desc: "Web, app, and digital marketing services tailored to help businesses build strong online presence and drive growth." },
];

const TIMELINE = [

];

// ===== COMPONENT =====
export default function SolutionsOverview() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".sol-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sol-overview-page">

{/* ===== PREMIUM HERO ===== */}
<section className="sol-hero">

  <div className="sol-hero-bg" style={{ backgroundImage: `url(${ovbg})` }} />

  <div className="sol-hero-overlay" />

  <div className="sol-hero-content">

    <h1 className="sol-hero-title">
      ENGINEERING<br />EVERY SOLUTION.
    </h1>

    <p className="sol-hero-sub">
      From precision metrology and aerospace tooling to web development and digital growth, CHDK delivers solutions built for performance.
    </p>
  </div>

  {/* Scroll Arrow */}
  <a href="#sol-stats-start" className="hero-scroll-chevrons" aria-label="Scroll down">
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

  {/* Social Icons */}
  <div className="social">
    <a href="https://linkedin.com" className="social-link social-linkedin"><FaLinkedin /></a>
    <a href="https://instagram.com" className="social-link social-instagram"><FaInstagram /></a>
    <a href="https://facebook.com" className="social-link social-facebook"><FaFacebook /></a>
    <a href="mailto:info@chdkindia.com" className="social-link social-mail"><HiOutlineMail /></a>
  </div>

</section>


      {/* ─── INTRO ─── */}
      <section className="sol-intro">
        <div className="sol-container">
          <div className="sol-intro-grid">
            <div className="sol-intro-left">
              <p className="sol-label sol-animate">What We Do</p>
              <h2 className="sol-heading sol-animate">Precision. Technology.<br />Performance.</h2>
              <p className="sol-intro-body sol-animate" style={{ marginTop: "32px" }}>
CHDK Technology Center delivers engineering and digital solutions across metrology, calibration, 3D scanning, reverse engineering, precision manufacturing, aerospace tooling, web development, SEO, and digital marketing. We combine industrial expertise with digital innovation to provide scalable, result-driven solutions.              </p>
            </div>
            <div className="sol-intro-img-wrap sol-animate">
              <img src={obabout} alt="Solutions Overview" className="sol-intro-img" />

            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICE CATEGORIES ─── */}
      <section className="sol-categories">
        <div className="sol-container">
          <div className="sol-categories-header">
            <p className="sol-label sol-animate">What We Offer</p>
            <h2 className="sol-heading sol-animate">SERVICE CATEGORIES</h2>
          </div>
          <div className="sol-categories-grid">
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.num} className="sol-category-card sol-animate">
                <p className="sol-category-number">{cat.num}</p>
                <h3 className="sol-category-title">{cat.title}</h3>
                <p className="sol-category-desc">{cat.desc}</p>
                <div className="sol-category-links">
                  {cat.links.map((link, j) => (
                    <Link key={j} to={link.path} className="sol-category-link">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─── INDUSTRIES ─── */}
      <section className="sol-industries">
        <div className="sol-container">
          <div className="sol-industries-header">
            <p className="sol-label sol-animate">Who We Serve</p>
            <h2 className="sol-heading sol-animate">INDUSTRIES WE SUPPORT</h2>
          </div>
          <div className="sol-industries-grid">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className="sol-industry-card sol-animate">
                <h3 className="sol-industry-name">{ind.name}</h3>
                <p className="sol-industry-desc">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}