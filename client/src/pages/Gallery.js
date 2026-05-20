import { useState, useRef, useEffect } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import "../pages/Home.css";
import "./Gallery.css";

// ===== GALLERY DATA =====
// Replace src paths with your actual image files
const GALLERY_ITEMS = [
  // Aerospace & Defence
  { id: 1,  src: "/gallery/aero-1.jpg",       alt: "Aerospace precision component",         category: "Aerospace & Defence",  size: "tall" },
  { id: 2,  src: "/gallery/aero-2.jpg",       alt: "Defence systems assembly",              category: "Aerospace & Defence",  size: "wide" },
  { id: 3,  src: "/gallery/aero-3.jpg",       alt: "Aerospace tooling inspection",          category: "Aerospace & Defence",  size: "normal" },
  { id: 4,  src: "/gallery/aero-4.jpg",       alt: "Laser tracker measurement",             category: "Aerospace & Defence",  size: "normal" },

  // Metrology & Engineering
  { id: 5,  src: "/gallery/metro-1.jpg",      alt: "3D scanning in progress",               category: "Metrology",            size: "wide" },
  { id: 6,  src: "/gallery/metro-2.jpg",      alt: "Calibration services on-site",          category: "Metrology",            size: "normal" },
  { id: 7,  src: "/gallery/metro-3.jpg",      alt: "Reverse engineering CAD model",         category: "Metrology",            size: "tall" },
  { id: 8,  src: "/gallery/metro-4.jpg",      alt: "Dimensional inspection report",         category: "Metrology",            size: "normal" },

  // Renewable Energy
  { id: 9,  src: "/gallery/solar-1.jpg",      alt: "Solar tree installation",               category: "Renewable Energy",     size: "tall" },
  { id: 10, src: "/gallery/solar-2.jpg",      alt: "Rooftop solar panels",                  category: "Renewable Energy",     size: "wide" },
  { id: 11, src: "/gallery/solar-3.jpg",      alt: "Solar cold storage unit",               category: "Renewable Energy",     size: "normal" },
  { id: 12, src: "/gallery/solar-4.jpg",      alt: "Off-grid solar deployment",             category: "Renewable Energy",     size: "normal" },

  // Infrastructure
  { id: 13, src: "/gallery/infra-1.jpg",      alt: "PUF panel installation",                category: "Infrastructure",       size: "wide" },
  { id: 14, src: "/gallery/infra-2.jpg",      alt: "Portable office structure",             category: "Infrastructure",       size: "normal" },
  { id: 15, src: "/gallery/infra-3.jpg",      alt: "Roofing panel assembly",                category: "Infrastructure",       size: "tall" },

  // Events & Team
  { id: 16, src: "/event1.PNG",               alt: "CHDK team at industry event",           category: "Events & Team",        size: "wide" },
  { id: 17, src: "/event2.PNG",               alt: "Exhibition participation",              category: "Events & Team",        size: "normal" },
  { id: 18, src: "/event3.PNG",               alt: "Client collaboration session",          category: "Events & Team",        size: "tall" },
  { id: 19, src: "/event1.PNG",               alt: "Awards and recognition ceremony",       category: "Events & Team",        size: "normal" },
  { id: 20, src: "/event2.PNG",               alt: "Team building workshop",                category: "Events & Team",        size: "wide" },
];

const FILTERS = ["All", "Aerospace & Defence", "Metrology", "Renewable Energy", "Infrastructure", "Events & Team"];

// ===== LIGHTBOX =====
function Lightbox({ item, total, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="gallery-lightbox" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">×</button>

      <button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt} className="lightbox-img" />
        <div className="lightbox-caption">
          <span className="lightbox-category">{item.category}</span>
          <p className="lightbox-alt">{item.alt}</p>
        </div>
      </div>

      <button
        className="lightbox-nav lightbox-next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
  );
}

// ===== REVEAL HOOK =====
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

// ===== PAGE =====
export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [ref1, show1] = useReveal();

  const filtered = activeFilter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const openLightbox  = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage     = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const nextImage     = () => setLightboxIndex((i) => (i + 1) % filtered.length);

  return (
    <div className="home gallery-page">


      {/* ===== FILTER + GRID ===== */}
      <section id="gallery-grid" ref={ref1} className={`gallery-section ${show1 ? "highlights-visible" : ""}`}>
        <div className="gallery-container">

          {/* Section header */}
          <div className="gallery-header">
            <p className="section-label">Our Portfolio</p>
            <h2 className="section-heading">MOMENTS THAT DEFINE US</h2>
          </div>

          {/* Filter tabs */}
          <div className="gallery-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`gallery-filter-chip ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="gallery-grid">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className={`gallery-item gallery-item--${item.size}`}
                onClick={() => openLightbox(i)}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-category">{item.category}</span>
                  <p className="gallery-item-alt">{item.alt}</p>
                  <span className="gallery-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <p className="gallery-empty">No images in this category yet.</p>
          )}

        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {lightboxIndex !== null && (
        <Lightbox
          item={filtered[lightboxIndex]}
          total={filtered.length}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}