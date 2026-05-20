import { useEffect, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

import "../Home.css";
import "../business.css";
import "./innovation.css";

import cert1 from "../../assets/cert1.jpeg";
import cert2 from "../../assets/cert2.jpeg";
import cert3 from "../../assets/cert3.jpeg";
import cert4 from "../../assets/cert4.jpeg";
import cert5 from "../../assets/cert5.jpeg";
import cert6 from "../../assets/cert6.jpeg";
import cert7 from "../../assets/cert7.jpeg";


const FOCUS_AREAS = [
  {
    num: "01",
    title: "Zero Energy Chamber",
    desc: "Advanced energy-efficient chamber technology designed for sustainable industrial applications.",
  },
  {
    num: "02",
    title: "Thermal Battery Backup",
    desc: "Reliable thermal energy storage system for uninterrupted industrial performance.",
  },
  {
    num: "03",
    title: "SWACH",
    desc: "Innovative sustainability-focused engineering initiative for cleaner operations.",
  },
  {
    num: "04",
    title: "Sugar-Cane Bud Cutting Machine",
    desc: "Precision agricultural engineering solution improving productivity and automation.",
  },
  {
    num: "05",
    title: "Wind Turbine",
    desc: "Renewable energy innovation focused on high-efficiency wind power generation.",
  },
];

const CERTIFICATIONS = [
  {
    id: 1,
    image: cert1,
  },
  {
    id: 2,
    image: cert2,
  },
  {
    id: 3,
    image: cert3,
  },
  {
    id: 4,
    image: cert4,
  },
  {
    id: 5,
    image: cert5,
  },
  {
    id: 6,
    image: cert6,
  },
  {
    id: 7,
    image: cert7,
  },
];


export default function Innovation() {

  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.08 }
    );

    document
      .querySelectorAll(".inn-animate")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="innovation-page">


      {/* INNOVATIONS */}
      <section id="inn-focus" className="inn-focus">
        <div className="innovation-container">

          <div className="inn-focus-header">
            <p className="inn-label inn-animate">Innovations</p>

            <h2 className="inn-heading inn-animate">
              OUR INNOVATION
            </h2>
          </div>

          <div className="inn-focus-grid">
            {FOCUS_AREAS.map((f) => (
              <div key={f.num} className="inn-focus-card inn-animate">

                <div className="inn-focus-number">{f.num}</div>

                <h3 className="inn-focus-title">{f.title}</h3>

                <p className="inn-focus-desc">{f.desc}</p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="inn-certs">
        <div className="innovation-container">

          <div className="inn-section-header">
            <p className="inn-label">Certifications</p>

            <h2 className="inn-heading">
              QUALITY & COMPLIANCE
            </h2>
          </div>

          <div className="inn-certs-grid">
            {CERTIFICATIONS.map((item) => (
              <div
                key={item.id}
                className="inn-cert-card"
                onClick={() => setSelectedCert(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="inn-cert-img"
                />

                <h3>{item.title}</h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedCert && (
        <div
          className="cert-lightbox"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="cert-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cert-close"
              onClick={() => setSelectedCert(null)}
            >
              ×
            </button>

            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="cert-lightbox-img"
            />

            <h3>{selectedCert.title}</h3>
          </div>
        </div>
      )}

    </div>
  );
}

