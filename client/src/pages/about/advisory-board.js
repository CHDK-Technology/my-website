import { useEffect } from "react";
import logo from "../../assets/logo.png";

import member1 from "../../assets/member1.jpeg";
import member2 from "../../assets/member2.jpeg";
import member3 from "../../assets/member3.png";

import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

import "../Home.css";
import "../business.css";
import "./advisory-board.css";

const MEMBERS = [
  {
    image: member1,
    name: "Dr. Lakshmikant Shankarrao Dhamande",
    title:
      "Associate Professor at Sanjivani College of Engineering, Kopargaon, Ahmednagar, Maharashtra, India.",
    bio:
      "Received DME from Govt. Polytechnic Khamgaon and Ph.D. in Mechanical Engineering (2019). Completed M.E. in Mechanical Design Engineering from University of Pune (2007). Previously worked as Maintenance Engineer at SKF Bearing India Ltd., Pune. Brings over two decades of teaching experience with specialization in condition monitoring using Vibration Analysis.",
    tags: [
      "Mechanical Engineering",
      "Vibration Analysis",
      "Condition Monitoring",
    ],
  },

  {
    image: member2,
    name: "Dr. Pravin P. Hujare",
    title:
      "Associate Professor, Department of Mechanical Engineering, VIIT Pune, India.",
    bio:
      "Ph.D. in Noise & Vibration Control from COEP, Savitribai Phule Pune University. Holds M.E. in Mechanical Engineering from University of Mumbai with over 25 years of teaching and research experience. Author of 'Predictive Analytics for Mechanical Engineering: A Beginners Guide' published by Springer. Published 35+ research papers and holds 21 patents.",
    tags: [
      "Noise & Vibration",
      "Research",
      "Patents",
      "Predictive Analytics",
    ],
  },

  {
    image: member3,
    name: "Dr. Ramakant Shrivastava",
    title:
      "Professor and Dean Quality, Government College of Engineering, Aurangabad.",
    bio:
      "Ph.D. in Mechanical Engineering from IIT Roorkee, M.Tech from IIT Madras and B.E. from SGSITS Indore. Specialized in two-phase heat transfer, refrigeration systems, heat exchangers, corrosion and flow measurement. Published 88 research papers and guided multiple Ph.D. scholars. Empaneled with UPSC, MPSC, Government of Maharashtra and NTA.",
    tags: [
      "Heat Transfer",
      "Refrigeration",
      "Research",
      "Quality Engineering",
    ],
  },
];

export default function AdvisoryBoard() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.08 }
    );

    document
      .querySelectorAll(".adv-animate")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="advisory-page">



      {/* INTRO */}
      <section id="adv-intro" className="adv-intro">
        <div className="advisory-container">

          <div className="adv-intro-grid">

            <div>
              <p className="adv-label adv-animate">
                About The Board
              </p>

              <h2 className="adv-heading adv-animate">
                ENGINEERING <br /> EXPERTISE
              </h2>
            </div>

            <div>
              <p className="adv-intro-body adv-animate">
                Our advisory board consists of experienced professors,
                researchers and engineering experts from leading institutions
                across India.
              </p>

              <p className="adv-intro-body adv-animate">
                Their expertise in vibration analysis, thermal engineering,
                predictive analytics and advanced mechanical systems strengthens
                CHDK’s innovation and technical capabilities.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BOARD MEMBERS */}
      <section className="adv-board">
        <div className="advisory-container">

          <div className="adv-board-header">
            <p className="adv-label adv-animate">
              Our Advisors
            </p>

            <h2 className="adv-heading adv-animate">
              MEET THE BOARD
            </h2>
          </div>

          <div className="adv-board-grid">

            {MEMBERS.map((m, i) => (
              <div
                key={i}
                className="adv-member-card adv-animate"
              >

                <div className="adv-member-image-wrap">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="adv-member-image"
                  />
                </div>

                <p className="adv-member-domain">
                  {m.domain}
                </p>

                <h3 className="adv-member-name">
                  {m.name}
                </h3>

                <p className="adv-member-title">
                  {m.title}
                </p>

                <p className="adv-member-bio">
                  {m.bio}
                </p>

                <div className="adv-member-tags">
                  {m.tags.map((t, j) => (
                    <span
                      key={j}
                      className="adv-member-tag"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}
