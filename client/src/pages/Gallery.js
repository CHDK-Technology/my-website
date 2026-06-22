import { useState, useRef, useEffect } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import "../pages/Home.css";
import "./Gallery.css";

// ============================================================================
// GALLERY DATA  —  this is the only part you normally edit
// ----------------------------------------------------------------------------
// IMAGE item:
//   { id, type: "image", src: "/gallery/file.jpg", alt, category, size }
//
// VIDEO item — pick ONE source. In order of preference:
//   YouTube (recommended, adaptive streaming = no lag):
//     { id, type: "video", youtube: "VIDEO_ID", alt, category, size: "wide" }
//   Vimeo:
//     { id, type: "video", vimeo: "VIDEO_ID", alt, category, size: "wide" }
//   Self-hosted file in /public/gallery (only for very short clips):
//     { id, type: "video", videoSrc: "/gallery/clip.mp4", poster: "/gallery/clip.jpg", alt, category, size: "wide" }
//
// The YouTube ID is the part after "v=" in the URL
//   https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  "dQw4w9WgXcQ"
// For YouTube videos you can skip "poster" — the thumbnail is pulled automatically.
//
// size options: "normal" (4:3), "tall" (3:4), "wide" (16:9). Use "wide" for video.
// ============================================================================
const GALLERY_ITEMS = [
  // ==========================================================================
  // RENEWABLE ENERGY — Ecosaras solar products & installations
  // Images live in client/public/gallery/  (videos are from @ecosaras YouTube)
  // ==========================================================================
  { id: 1,   type: "image", src: "/gallery/solar-dryer-field.jpg",     alt: "Ecosaras Hybrid Solar Dehydrator",            category: "Renewable Energy", size: "wide" },
  { id: 2,   type: "image", src: "/gallery/cold-storage-onsite.jpg",   alt: "Ecosaras solar cold storage units on-site",   category: "Renewable Energy", size: "normal" },
  { id: 101, type: "video", youtube: "OPiuBv8tCB0",                    alt: "Ecosaras Solar Tree",                         category: "Renewable Energy", size: "wide" },
  { id: 3,   type: "image", src: "/gallery/solar-dryer-product.jpg",   alt: "Ecosaras Hybrid Solar Dryer",                 category: "Renewable Energy", size: "normal" },
  { id: 4,   type: "image", src: "/gallery/cold-storage-install.jpg",  alt: "EcoSaras solar-powered cold storage installation", category: "Renewable Energy", size: "wide" },
  { id: 102, type: "video", youtube: "t5YDJ5HXpWU",                    alt: "Ecosaras Solar Dryer / Dehydrator",           category: "Renewable Energy", size: "wide" },

  // ==========================================================================
  // EVENTS & TEAM
  // ==========================================================================
  { id: 5,   type: "image", src: "/gallery/event-coldstorage-launch.jpg", alt: "Ecosaras solar cold storage launch event", category: "Events & Team", size: "wide" },
  { id: 6,   type: "image", src: "/gallery/team-farmers.jpg",            alt: "EcoSaras team with farmers at a cold storage site", category: "Events & Team", size: "normal" },
  { id: 103, type: "video", youtube: "ZSUm9vEg96Y",                      alt: "Solar Cold Storage inauguration ceremony", category: "Events & Team", size: "wide" },
  { id: 7,   type: "image", src: "/gallery/team-officials.jpg",          alt: "EcoSaras team at an installation",          category: "Events & Team", size: "normal" },

  // ==========================================================================
  // OPTIONAL / TO ADD
  // ==========================================================================
  // The three original placeholder event images — re-enable if you want them:
  // { id: 16, type: "image", src: "/event1.png", alt: "CHDK team at industry event", category: "Events & Team", size: "wide" },
  // { id: 17, type: "image", src: "/event2.png", alt: "Exhibition participation",     category: "Events & Team", size: "normal" },
  // { id: 18, type: "image", src: "/event3.png", alt: "Client collaboration session", category: "Events & Team", size: "tall" },

  // Infrastructure (Ecofoam) — drop a file in /gallery/ and uncomment:
  // { id: 20, type: "image", src: "/gallery/ecofoam-panel-1.jpg", alt: "Ecofoam insulated panel", category: "Infrastructure", size: "wide" },

  // Extra Ecosaras video — uncomment to add:
  // { id: 104, type: "video", youtube: "6QVEtsiZ4nY", alt: "Solar Dryer — innovation at CHDK", category: "Renewable Energy", size: "wide" },
];

// Categories with content right now. Add others back when you have images.
const FILTERS = ["All", "Renewable Energy", "Events & Team"];

// Thumbnail for any item: explicit poster > image src > auto YouTube thumbnail
function getThumb(item) {
  if (item.poster) return item.poster;
  if (item.type === "video" && item.youtube) return `https://img.youtube.com/vi/${item.youtube}/hqdefault.jpg`;
  return item.src;
}

// Play-button badge shown on video thumbnails
function PlayBadge() {
  return (
    <span className="gallery-play-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

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

  const isVideo = item.type === "video";

  // Build the correct player for the lightbox
  let media;
  if (isVideo && item.youtube) {
    media = (
      <div className="lightbox-video-wrap">
        <iframe
          key={item.id}
          src={`https://www.youtube-nocookie.com/embed/${item.youtube}?autoplay=1&rel=0&modestbranding=1`}
          title={item.alt}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  } else if (isVideo && item.vimeo) {
    media = (
      <div className="lightbox-video-wrap">
        <iframe
          key={item.id}
          src={`https://player.vimeo.com/video/${item.vimeo}?autoplay=1`}
          title={item.alt}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  } else if (isVideo && item.videoSrc) {
    media = (
      <div className="lightbox-video-wrap">
        <video key={item.id} src={item.videoSrc} poster={item.poster} controls autoPlay playsInline />
      </div>
    );
  } else {
    media = <img src={item.src} alt={item.alt} className="lightbox-img" />;
  }

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
        {media}
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
                className={`gallery-item gallery-item--${item.size} ${item.type === "video" ? "gallery-item--video" : ""}`}
                onClick={() => openLightbox(i)}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <img src={getThumb(item)} alt={item.alt} loading="lazy" />
                {item.type === "video" && <PlayBadge />}
                <div className="gallery-item-overlay">
                  <span className="gallery-item-category">{item.category}</span>
                  <p className="gallery-item-alt">{item.alt}</p>
                  <span className="gallery-item-icon">
                    {item.type === "video" ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <p className="gallery-empty">No items in this category yet.</p>
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
