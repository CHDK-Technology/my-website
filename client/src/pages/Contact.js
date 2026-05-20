import { useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Hero from "../components/Hero/Hero";
import logo from "../assets/logo.png";
import contactBg from "../assets/contact.png";
import "../pages/Home.css";
import "./Contact.css";

const OFFICES = [
  { id: 0, city: "Pune", type: "Headquarters", address: "Gate No.83, Yelwadi Gatha Mandir Bypass Road, Near Sairaj Chowk, At : Yelwadi, Dehu Tal : Khed, Pune, Maharashtra -412109", phone: "+91  9687620011" },
  { id: 1, city: "Pune", type: "Regional Office", address: "2nd Floor, A-12, Sawant Elite, Near Sai Eshanya, Balewadi,Pune-411045, Maharashtra,India", phone: "+91 8080473278" },
  { id: 2, city: "Gujarat", type: "Regional Office", address: "Fortune gateway, 3rd Floor, Office No. 336, Opposite Kunj Plaza TP13, Channi Jakatnaka, Vadodara- 391740 ( Gujarat)", phone: "+91 8142427476" },
];

const ENQUIRY_TYPES = [
  "Select a topic", "Business Partnership", "Project Enquiry", "General Information", "Careers", "Media & Press", "Other"
];

function ContactForm() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", company: "", enquiryType: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // ── FIXED: Now calls your real backend API ──────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", enquiryType: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Unable to connect. Please email us directly at info@chdkindia.com");
    }
  };

  return (
    <form className="contact-form-block" onSubmit={handleSubmit}>
      {status === "success" && (
        <div style={{ padding: "14px 16px", background: "rgba(46, 213, 115, 0.1)", border: "1px solid #2ed573", color: "#2ed573", borderRadius: "4px", fontSize: "14px", fontWeight: "500" }}>
          ✅ Your message has been sent successfully! We will be in touch within 24 hours.
        </div>
      )}
      {status === "error" && (
        <div style={{ padding: "14px 16px", background: "rgba(255, 71, 87, 0.1)", border: "1px solid #ff4757", color: "#ff4757", borderRadius: "4px", fontSize: "14px", fontWeight: "500" }}>
          {errorMessage}
        </div>
      )}

      <div className="contact-form-row">
        <div className="contact-field-group">
          <label className="contact-field-label">First Name</label>
          <input type="text" name="firstName" placeholder="First name" className="contact-field-input" value={formData.firstName} onChange={handleChange} required disabled={status === "submitting"} />
        </div>
        <div className="contact-field-group">
          <label className="contact-field-label">Last Name</label>
          <input type="text" name="lastName" placeholder="Last name" className="contact-field-input" value={formData.lastName} onChange={handleChange} required disabled={status === "submitting"} />
        </div>
      </div>

      <div className="contact-field-group">
        <label className="contact-field-label">Email Address</label>
        <input type="email" name="email" placeholder="you@company.com" className="contact-field-input" value={formData.email} onChange={handleChange} required disabled={status === "submitting"} />
      </div>

      <div className="contact-form-row">
        <div className="contact-field-group">
          <label className="contact-field-label">Phone Number</label>
          <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" className="contact-field-input" value={formData.phone} onChange={handleChange} disabled={status === "submitting"} />
        </div>
        <div className="contact-field-group">
          <label className="contact-field-label">Company</label>
          <input type="text" name="company" placeholder="Your company" className="contact-field-input" value={formData.company} onChange={handleChange} disabled={status === "submitting"} />
        </div>
      </div>

      <div className="contact-field-group">
        <label className="contact-field-label">Enquiry Type</label>
        <select name="enquiryType" className="contact-field-select" value={formData.enquiryType} onChange={handleChange} required disabled={status === "submitting"}>
          {ENQUIRY_TYPES.map((type, i) => (
            <option key={i} value={i === 0 ? "" : type} disabled={i === 0}>{type}</option>
          ))}
        </select>
      </div>

      <div className="contact-field-group">
        <label className="contact-field-label">Message</label>
        <textarea name="message" placeholder="Tell us about your project or requirement..." className="contact-field-input contact-field-textarea" value={formData.message} onChange={handleChange} required rows={5} disabled={status === "submitting"} />
      </div>

      <button type="submit" className="contact-submit-btn" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message"} <span>→</span>
      </button>
    </form>
  );
}

function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-bg" style={{ backgroundImage: `url(${contactBg})` }} />
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">
            <span>LET'S START A</span><br />
            <span>CONVERSATION.</span>
          </h1>
          <p className="contact-hero-subtitle">
            Have a complex challenge? Our engineering team is ready to partner with you to turn it into a sustainable reality.
          </p>
        </div>

        <a href="#contact-main-section" className="hero-scroll-chevrons" aria-label="Scroll down">
          <svg className="chevron chevron-1" viewBox="0 0 32 18" fill="none"><polyline points="2,2 16,16 30,2" /></svg>
          <svg className="chevron chevron-2" viewBox="0 0 32 18" fill="none"><polyline points="2,2 16,16 30,2" /></svg>
          <svg className="chevron chevron-3" viewBox="0 0 32 18" fill="none"><polyline points="2,2 16,16 30,2" /></svg>
          <svg className="chevron chevron-4" viewBox="0 0 32 18" fill="none"><polyline points="2,2 16,16 30,2" /></svg>
        </a>

        {/* ── FIXED: Real CHDK social links ── */}
        <div className="social">
          <a href="https://linkedin.com/company/chdk-technology-center" target="_blank" rel="noreferrer" className="social-link social-linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://instagram.com/chdktechnology" target="_blank" rel="noreferrer" className="social-link social-instagram" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://facebook.com/chdktechnology" target="_blank" rel="noreferrer" className="social-link social-facebook" aria-label="Facebook"><FaFacebook /></a>
          <a href="mailto:info@chdkindia.com" className="social-link social-mail" aria-label="Email"><HiOutlineMail /></a>
        </div>
      </section>

      <section id="contact-main-section" className="contact-main">
        <div className="contact-container">
          <div className="contact-main-header">
            <p className="contact-section-label">Send Us a Message</p>
            <h2 className="contact-section-heading">LET'S START A<br />CONVERSATION.</h2>
          </div>

          <div className="contact-grid">
            <div className="contact-form-col">
              <ContactForm />
            </div>

            <div className="contact-info-col">
              <p className="contact-section-label">Contact Details</p>

              <div className="contact-info-card" style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "16px" }}>
                <div className="contact-info-icon"><HiOutlineMail size={22} /></div>
                <div className="contact-info-text" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <p className="contact-info-label">Email</p>
                  <p className="contact-info-val">info@chdkindia.com</p>
                  <p className="contact-info-sub">We respond within 24 hours</p>
                </div>
              </div>

              <div className="contact-info-card" style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "16px" }}>
                <div className="contact-info-icon"><FaLinkedin size={22} /></div>
                <div className="contact-info-text" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <p className="contact-info-label">LinkedIn</p>
                  <p className="contact-info-val">CHDK Technology Center</p>
                  <p className="contact-info-sub">Follow for updates</p>
                </div>
              </div>

              <div className="contact-map-embed">
                <iframe
                  title="CHDK Technology Center & Ecosaras Cold Storage"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d945.5534!2d73.7617!3d18.7248571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b76eb21c54d9%3A0x792c4d952bb324e0!2sC.H.D.K+Technology+Center+%26+Ecosaras+Cold+Storage!5e0!3m2!1sen!2sin!4v1748000000000!5m2!1sen!2sin"
                  width="100%"
                  height="280"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-offices-section">
        <div className="contact-container">
          <p className="contact-section-label">Our Offices</p>
          <h2 className="contact-section-heading">WHERE TO FIND US</h2>
          <div className="contact-offices-grid">
            {OFFICES.map((office) => (
              <div key={office.id} className="contact-office-card">
                <span className="contact-office-type">{office.type}</span>
                <h3 className="contact-office-city">{office.city}</h3>
                <p className="contact-office-address">{office.address}</p>
                <p className="contact-office-phone">{office.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;