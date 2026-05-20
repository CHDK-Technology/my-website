import { useEffect } from "react";
import logo from '../../assets/logo.png';
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import background from "../../assets/ov-hero-bg.png";
import "./Overview.css";
import "../Home.css";



const VALUES = [
  { num: "01", title: "Engineering Excellence", desc: "Every solution we deliver meets the highest standards of precision, safety, and reliability — from individual components to complete systems." },
  { num: "02", title: "Client Partnership", desc: "We don't work for clients, we work with them. Long-term relationships built on trust, transparency, and shared goals." },
  { num: "03", title: "Innovative Mindset", desc: "Continuous investment in R&D, emerging technologies, and new capabilities that keep our clients ahead of the curve." },
  { num: "04", title: "Sustainability First", desc: "From renewable energy to circular waste management, sustainability is embedded in every business decision we make." },
  { num: "05", title: "National Pride", desc: "Proud contributors to India's industrial growth. Our work supports critical defence, and clean energy goals." },
  { num: "06", title: "People & Culture", desc: "Our greatest asset is our people. We invest heavily in talent development, inclusion, and creating careers that matter." },
];

const LEADERSHIP = [
  {
    name: "",
    title: "Founder & Managing Director",
    bio: "A visionary engineer with 20+ years of experience across aerospace and industrial sectors. Founded CHDK in 2018 to bridge the gap between cutting-edge engineering and India's industrial needs.",
    img: "/team1.jpg",
  },
  {
    name: "",
    title: "Director – Operations",
    bio: "Leading operational excellence across all eight business verticals with a focus on delivery quality, process efficiency, and customer satisfaction.",
    img: "/team2.jpg",
  },
  {
    name: "",
    title: "Director – Business Development",
    bio: "Driving strategic growth, partnerships and new market entries. Instrumental in expanding CHDK's footprint from aerospace into renewable energy and digital sectors.",
    img: "/team3.jpg",
  },
];

const TIMELINE = [
  { year: "2018", event: "CHDK Technology Center Founded", desc: "Launched in Pune as a precision engineering supplier to the multi-sector especially aerospace and defence." },
  { year: "2019", event: "AS9100D Certification Achieved", desc: "Received aerospace quality management certification, unlocking partnerships with GE Aerospace and Godrej Aerospace." },
  { year: "2020", event: "Expansion into Renewable Energy", desc: "Launched Solar EPC division amid India's push toward renewable targets. First 500 KW installation completed." },
  { year: "2021", event: "Smart Agriculture & Material Handling", desc: "Introduced AgriStore™ IoT platform and warehouse automation solutions, expanding into two new verticals." },
  { year: "2022", event: "Gujarat Regional Office Opened", desc: "Established second regional office in Vadodara to serve clients across Western India." },
  { year: "2023", event: "IT Solutions & Digital Division Launch", desc: "Entered digital transformation services, offering enterprise web platforms, app development, and industrial IoT integration." },
  { year: "2024", event: "₹150Cr+ Project Milestone", desc: "Crossed a landmark total project value delivered across all business verticals — a testament to scale and trust." },
  { year: "2025", event: "200+ Strong Team", desc: "Team crosses 200 members across engineering, operations, sales, and technology functions." },
];

export default function Overview() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".ov-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

return (
  <div className="overview-page">

    {/* ===== PREMIUM HERO ===== */}
    <section className="ov-hero">
      <div
        className="ov-hero-bg"
        style={{ backgroundImage: `url(${background})` }}
      />

      <div className="ov-hero-overlay" />

      <div className="ov-hero-content">

        <h1 className="ov-hero-title">
          <span>ENGINEERING</span><br />
          <span>INDIA'S FUTURE</span>
        </h1>

        <p className="ov-hero-sub">
          From precision aerospace components to clean energy systems, CHDK builds tomorrow through innovation, trust and industrial excellence.
        </p>
      </div>

      {/* Scroll Arrow */}
      <a href="#overview-start" className="hero-scroll-chevrons" aria-label="Scroll Down">
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
  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noreferrer"
    className="social-link social-linkedin"
    aria-label="LinkedIn"
  >
    <FaLinkedin />
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    rel="noreferrer"
    className="social-link social-instagram"
    aria-label="Instagram"
  >
    <FaInstagram />
  </a>

  <a
    href="https://facebook.com"
    target="_blank"
    rel="noreferrer"
    className="social-link social-facebook"
    aria-label="Facebook"
  >
    <FaFacebook />
  </a>

  <a
    href="mailto:info@chdkindia.com"
    className="social-link social-mail"
    aria-label="Email"
  >
    <HiOutlineMail />
  </a>
</div>
    </section>


      {/* MISSION */}
      <section className="ov-mission">
        <div className="overview-container">
          <div className="ov-mission-grid">
            <div className="ov-mission-left">
              <p className="overview-label ov-animate">Our Mission</p>
              <h2 className="overview-heading ov-animate">From Earth to Sky <br />We Engineer</h2>
              <p className="ov-mission-body ov-animate" style={{ marginTop: "32px" }}>
                CHDK Technology Center was founded on a simple but powerful belief: India's industrial future depends on engineering companies that refuse to compromise. We operate across eight distinct verticals — not because we diversified arbitrarily, but because each sector represents a critical national need that we are uniquely positioned to serve.
              </p>
              <p className="ov-mission-body ov-animate">
                Our clients are India's leading OEMs, government bodies, infrastructure developers, and Fortune 500 companies. They trust us because we bring the engineering depth of a specialist and the operational breadth of an integrated group.
              </p>
              <p className="ov-mission-body ov-animate">
                Since 2018, we have delivered over ₹150 Crore in project value, supported national defence programmes, powered clean energy transitions, and transformed supply chains — all while growing a team of 200+ passionate engineers and professionals.
              </p>
            </div>
            <div className="ov-mission-img-wrap ov-animate">
              <img src="/industrial.jpeg" alt="CHDK Operations" className="ov-mission-img" />

            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="ov-values">
        <div className="overview-container">
          <div className="ov-values-header">
            <p className="overview-label ov-animate">What We Stand For</p>
            <h2 className="overview-heading ov-animate">OUR CORE VALUES</h2>
          </div>
          <div className="ov-values-grid">
            {VALUES.map((v) => (
              <div key={v.num} className="ov-value-card ov-animate">
                <p className="ov-value-number">{v.num}</p>
                <h3 className="ov-value-title">{v.title}</h3>
                <p className="ov-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="ov-leadership">
        <div className="overview-container">
          <div className="ov-leadership-header">
            <p className="overview-label ov-animate">The People Behind CHDK</p>
            <h2 className="overview-heading ov-animate">LEADERSHIP TEAM</h2>
          </div>
          <div className="ov-leadership-grid">
            {LEADERSHIP.map((l, i) => (
              <div key={i} className="ov-leader-card ov-animate">
                <div className="ov-leader-img-wrap">
                  <img
                    src={l.img}
                    alt={l.name}
                    className="ov-leader-img"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.background = "var(--dark)";
                      e.target.parentElement.style.height = "340px";
                    }}
                  />
                  <div className="ov-leader-overlay" />
                </div>
                <h3 className="ov-leader-name">{l.name}</h3>
                <p className="ov-leader-title-txt">{l.title}</p>
                <p className="ov-leader-bio">{l.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}