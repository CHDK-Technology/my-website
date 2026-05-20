import { useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import careersbg from "../assets/careers-bg.jpg";
import "./Careers.css";

const FILTERS = ["All", "Engineering", "Operations", "Sales", "IT & Digital", "Management"];

const JOBS = [
  { id: 1, dept: "Aerospace & Defence", title: "Mechanical Design Engineer", type: "Full Time", location: "Pune", experience: "3–5 yrs", category: "Engineering" },
  { id: 2, dept: "Renewable Energy", title: "Project Coordinator – Solar", type: "Full Time", location: "Remote", experience: "2–4 yrs", category: "Operations" },
  { id: 3, dept: "IT Solutions & Digital Marketing", title: "React Developer", type: "Full Time", location: "Hybrid", experience: "1–3 yrs", category: "IT & Digital" },
  { id: 4, dept: "Material Handling", title: "Site Operations Manager", type: "Full Time", location: "Pune", experience: "5–8 yrs", category: "Operations" },
  { id: 5, dept: "Smart Storage", title: "Sales Executive – Agri Sector", type: "Full Time", location: "Mumbai", experience: "2–5 yrs", category: "Sales" },
  { id: 6, dept: "Infrastructure", title: "Civil Engineer – Project Lead", type: "Full Time", location: "Pune", experience: "4–7 yrs", category: "Engineering" },
];

const WHY_JOIN = [
  { id: 0, title: "Multi-Sector Exposure", desc: "Work across aerospace, defence, agri-tech, energy and more — no two days are the same." },
  { id: 1, title: "Continuous Learning", desc: "Training programs, mentorship and innovation-led projects to accelerate your growth." },
  { id: 2, title: "People-First Culture", desc: "Inclusive, collaborative and purpose-driven environment where your voice matters." },
  { id: 3, title: "Impactful Work", desc: "Your engineering contributes directly to national infrastructure and critical industries." },
  { id: 4, title: "Career Progression", desc: "Clear growth paths, internal mobility and leadership opportunities as we scale." },
  { id: 5, title: "Backed by Industry Leaders", desc: "Work with India's top aerospace, defence and energy organizations." },
];

const STATS = [
  { value: "200+", label: "Team Members" },
  { value: "8", label: "Business Verticals" },
  { value: "7+", label: "Years of Growth" },
  { value: "15+", label: "Ongoing Projects" },
];

function JobListings() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? JOBS : JOBS.filter((j) => j.category === activeFilter);

  return (
    <section className="careers-jobs-section">
      <div className="careers-container">
        <p className="careers-section-label">Open Positions</p>
        <h2 className="careers-section-heading">EXPLORE OPPORTUNITIES</h2>

        <div className="careers-filter-row">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`careers-filter-chip ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="careers-jobs-list">
          {filtered.map((job) => (
            <div key={job.id} className="careers-job-card">
              <div className="careers-job-info">
                <p className="careers-job-dept">{job.dept}</p>
                <h3 className="careers-job-title">{job.title}</h3>
                <div className="careers-job-meta">
                  <span className="careers-job-tag">{job.type}</span>
                  <span className="careers-job-tag">{job.location}</span>
                  <span className="careers-job-tag">{job.experience}</span>
                </div>
              </div>
<a href="/careers/apply" className="careers-apply-btn">
  Apply →
</a>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="careers-no-jobs">
            <p>No openings in this category right now. Check back soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Careers() {
  return (
    <div className="careers-page">
<section className="careers-hero">
<div
  className="careers-hero-bg"
  style={{ backgroundImage: `url(${careersbg})` }}
/>

  <div className="careers-hero-overlay" />

  <div className="careers-hero-content">
    <h1 className="careers-hero-title">
      BUILD WHAT<br />
      MATTERS.
    </h1>

    <p className="careers-hero-sub">
      Careers at CHDK Technology Center where engineers,
      creators and innovators shape the future together.
    </p>
  </div>

  <a href="#open-roles" className="hero-scroll-chevrons" aria-label="Scroll down">
    <svg className="chevron chevron-1" viewBox="0 0 32 18" fill="none"><polyline points="2,2 16,16 30,2" /></svg>
    <svg className="chevron chevron-2" viewBox="0 0 32 18" fill="none"><polyline points="2,2 16,16 30,2" /></svg>
    <svg className="chevron chevron-3" viewBox="0 0 32 18" fill="none"><polyline points="2,2 16,16 30,2" /></svg>
    <svg className="chevron chevron-4" viewBox="0 0 32 18" fill="none"><polyline points="2,2 16,16 30,2" /></svg>
  </a>

  <div className="social">
    <a href="https://linkedin.com" className="social-link social-linkedin"><FaLinkedin /></a>
    <a href="https://instagram.com" className="social-link social-instagram"><FaInstagram /></a>
    <a href="https://facebook.com" className="social-link social-facebook"><FaFacebook /></a>
    <a href="mailto:info@chdkindia.com" className="social-link social-mail"><HiOutlineMail /></a>
  </div>
</section>



      <section className="careers-whyjoin-section">
        <div className="careers-container">
          <div className="careers-whyjoin-grid">
            <div className="careers-whyjoin-text">
              <p className="careers-section-label">Why CHDK</p>
              <h2 className="careers-section-heading">SHAPE IDEAS<br />INTO INNOVATION</h2>
              <p className="careers-section-desc">
                At CHDK Technology Center, your career is more than a designation. It is a mission. We build critical solutions across industries that matter — and we do it with talented, driven people like you.
              </p>
              <a href="/about/overview" className="careers-know-more-btn">About Us <span>→</span></a>
            </div>

            <div className="careers-why-cards-grid">
              {WHY_JOIN.map((item) => (
                <div key={item.id} className="careers-why-card">
                  <h3 className="careers-why-title">{item.title}</h3>
                  <p className="careers-why-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div id="open-roles">
        <JobListings />
      </div>
    </div>
  );
}

export default Careers;