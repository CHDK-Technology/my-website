import { useState } from "react";
import "./Apply.css";
import heroImg from "../assets/careers-hero.png";

function Apply() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    currentCompany: "",
    currentCTC: "",
    expectedCTC: "",
    skills: "",
    portfolio: "",
    coverLetter: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);

const handleChange = (e) => {

  const { name, value, files } = e.target;

  setFormData({
    ...formData,
    [name]: files ? files[0] : value,
  });
};

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const nameParts = formData.fullName.trim().split(" ");

const payload = new FormData();

payload.append("firstName", nameParts[0] || "");

payload.append(
  "lastName",
  nameParts.slice(1).join(" ") || "N/A"
);

payload.append("email", formData.email);

payload.append("phone", formData.phone);

payload.append("position", formData.position);

payload.append("experience", formData.experience);

payload.append("resume", formData.resume);

payload.append(
  "message",
  `
Current Company: ${formData.currentCompany}

Current CTC: ${formData.currentCTC}

Expected CTC: ${formData.expectedCTC}

Skills: ${formData.skills}

Portfolio: ${formData.portfolio}

Cover Letter:
${formData.coverLetter}
`
);

const response = await fetch(
  `${process.env.REACT_APP_API_URL}/api/apply`,
  {
    method: "POST",
    body: payload,
  }
);

      const data = await response.json();

      if (response.ok) {

        alert("Application Submitted Successfully ✅");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          currentCompany: "",
          currentCTC: "",
          expectedCTC: "",
          skills: "",
          portfolio: "",
          coverLetter: "",
        });

      } else {

        alert(data.message || "Failed to submit application");
      }

    } catch (error) {

      console.error(error);

      alert("Server error. Please try again.");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="apply-page">

      {/* HERO SECTION */}

      <section
        className="apply-hero"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.7)), url(${heroImg})`,
        }}
      >

        <div className="apply-overlay" />

        <div className="apply-container">

          <div className="apply-hero-content">

            <h1 className="apply-title">
              APPLY TO <br />
              JOIN OUR TEAM
            </h1>

            <p className="apply-subtitle">
              Build innovative engineering and digital solutions
              with a fast-growing technology company shaping
              the future.
            </p>

          </div>
        </div>
      </section>

      {/* FORM SECTION */}

      <section className="apply-form-section">

        <div className="apply-container">

          <div className="apply-form-wrapper">

            {/* LEFT SIDE */}

            <div className="apply-left">

              <p className="apply-section-label">
                Career Application
              </p>

              <h2 className="apply-section-heading">
                START YOUR <br />
                JOURNEY WITH US
              </h2>

              <p className="apply-section-desc">
                We are always looking for passionate engineers,
                developers, designers, and innovators ready
                to create meaningful impact.
              </p>

              <div className="apply-benefits">

                <div className="apply-benefit-card">

                  <h4>Growth Opportunities</h4>

                  <p>
                    Work on high-impact engineering and
                    technology projects.
                  </p>

                </div>

                <div className="apply-benefit-card">

                  <h4>Modern Work Culture</h4>

                  <p>
                    Collaborative environment focused on
                    innovation and growth.
                  </p>

                </div>

                <div className="apply-benefit-card">

                  <h4>Industry Exposure</h4>

                  <p>
                    Aerospace, defence, manufacturing,
                    IT and digital sectors.
                  </p>

                </div>

              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="apply-right">

              <form
                className="apply-form"
                onSubmit={handleSubmit}
              >

                <div className="apply-grid">

                  <div className="apply-field">

                    <label>Full Name</label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      placeholder="Enter your name"
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="apply-field">

                    <label>Email Address</label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="Enter your email"
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="apply-field">

                    <label>Phone Number</label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      placeholder="Enter phone number"
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="apply-field">

                    <label>Position Applying For</label>

                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      placeholder="React Developer"
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="apply-field">

                    <label>Experience</label>

                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      placeholder="2-4 Years"
                      onChange={handleChange}
                    />

                  </div>

                  <div className="apply-field">

                    <label>Current Company</label>

                    <input
                      type="text"
                      name="currentCompany"
                      value={formData.currentCompany}
                      placeholder="Current company"
                      onChange={handleChange}
                    />

                  </div>

                  <div className="apply-field">

                    <label>Current CTC</label>

                    <input
                      type="text"
                      name="currentCTC"
                      value={formData.currentCTC}
                      placeholder="Current salary"
                      onChange={handleChange}
                    />

                  </div>

                  <div className="apply-field">

                    <label>Expected CTC</label>

                    <input
                      type="text"
                      name="expectedCTC"
                      value={formData.expectedCTC}
                      placeholder="Expected salary"
                      onChange={handleChange}
                    />

                  </div>

                </div>

<div className="apply-field full-width">

  <label>Upload Resume</label>

  <input
    type="file"
    name="resume"
    accept=".pdf,.doc,.docx"
    onChange={handleChange}
    required
  />

</div>

                <div className="apply-field full-width">

                  <label>Portfolio / LinkedIn URL</label>

                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    placeholder="https://linkedin.com/in/username"
                    onChange={handleChange}
                  />

                </div>

                <div className="apply-field full-width">

                  <label>Cover Letter</label>

                  <textarea
                    rows="6"
                    name="coverLetter"
                    value={formData.coverLetter}
                    placeholder="Tell us about yourself..."
                    onChange={handleChange}
                  />

                </div>

                <button
                  type="submit"
                  className="apply-submit-btn"
                  disabled={loading}
                >

                  {
                    loading
                      ? "Submitting..."
                      : "Submit Application →"
                  }

                </button>

              </form>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Apply;