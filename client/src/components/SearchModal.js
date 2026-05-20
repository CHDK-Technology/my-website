import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchModal.css";

/* ─── SEARCH INDEX ─── */
/* Add/edit entries here to keep the search index up to date */
const SEARCH_INDEX = [
  // ── Business ──
  { title: "Business Overview",          path: "/business-overview",                       category: "Business",   keywords: "business overview company" },
  { title: "Aerospace & Defence",        path: "/business/aerospace",                       category: "Business",   keywords: "aerospace defence aviation military" },
  { title: "Smart Storage",             path: "/business/agriculture",                     category: "Business",   keywords: "smart storage warehouse logistics" },
  { title: "Renewable Energy",           path: "/business/renewable-energy",               category: "Business",   keywords: "renewable energy solar wind green" },
  { title: "Infrastructure",             path: "/business/infrastructure",                  category: "Business",   keywords: "infrastructure construction civil" },
  { title: "Industrial & Manufacturing", path: "/business/industrial-services",             category: "Business",   keywords: "industrial manufacturing production" },
  { title: "Waste Management",           path: "/business/waste-management",               category: "Business",   keywords: "waste management recycling environment" },
  { title: "IT Solutions & Digital Marketing", path: "/business/it-solutions",            category: "Business",   keywords: "it solutions digital marketing technology" },

  // ── Solutions ──
  { title: "Solutions Overview",                    path: "/solutions/overview",                        category: "Solutions",  keywords: "solutions services overview" },
  { title: "Advanced Metrology & Engineering",      path: "/solutions/advanced-metrology",              category: "Solutions",  keywords: "metrology engineering measurement precision" },
  { title: "Calibration Services",                  path: "/solutions/calibration",                     category: "Solutions",  keywords: "calibration portable inspection measurement" },
  { title: "3D Scanning & Modelling",               path: "/solutions/3d-scanning",                     category: "Solutions",  keywords: "3d scanning modelling cad digital" },
  { title: "Reverse Engineering",                   path: "/solutions/reverse-engineering",             category: "Solutions",  keywords: "reverse engineering design analysis" },
  { title: "Precision Manufacturing",               path: "/solutions/precision-manufacturing",         category: "Solutions",  keywords: "precision manufacturing cnc machining" },
  { title: "Jig, Mould & Aerospace Tooling",        path: "/solutions/jig-mould-aerospace-tooling",     category: "Solutions",  keywords: "jig mould tooling aerospace fixtures" },
  { title: "Testing & Compliance",                  path: "/solutions/testing-compliance",              category: "Solutions",  keywords: "testing compliance quality assurance" },
  { title: "Design & Development Tools",            path: "/solutions/design-tools",                    category: "Solutions",  keywords: "design development tools software" },
  { title: "Web Development",                       path: "/solutions/web-development",                 category: "Solutions",  keywords: "web development website frontend backend" },
  { title: "App Development",                       path: "/solutions/app-development",                 category: "Solutions",  keywords: "app development mobile ios android" },
  { title: "Digital Marketing",                     path: "/solutions/digital-marketing",               category: "Solutions",  keywords: "digital marketing seo social media" },
  { title: "SEO Services",                          path: "/solutions/seo",                             category: "Solutions",  keywords: "seo search engine optimization ranking" },

  // ── About ──
  { title: "Company Overview",   path: "/about/overview",       category: "About Us",   keywords: "about company overview history" },
  { title: "Innovation",         path: "/about/innovation",     category: "About Us",   keywords: "innovation research development technology" },
  { title: "Advisory Board",     path: "/about/advisory-board", category: "About Us",   keywords: "advisory board directors leadership team" },
  { title: "Awards & Recognition", path: "/about/awards",       category: "About Us",   keywords: "awards recognition achievements honours" },
  { title: "Reviews",            path: "/about/reviews",        category: "About Us",   keywords: "reviews testimonials clients feedback" },

  // ── Pages ──
  { title: "Careers",   path: "/careers",                       category: "Pages",      keywords: "careers jobs hiring employment opportunities" },
  { title: "Contact",   path: "/contact",                       category: "Pages",      keywords: "contact us get in touch address phone email" },
  { title: "Get a Quote", path: "/contact#contact-main-section", category: "Pages",    keywords: "quote pricing estimate request" },
  { title: "Gallery",   path: "/gallery",                       category: "Pages",      keywords: "gallery photos images projects portfolio" },
];

/* ─── HELPERS ─── */
function score(item, q) {
  const query = q.toLowerCase().trim();
  if (!query) return 0;
  const title    = item.title.toLowerCase();
  const keywords = item.keywords.toLowerCase();
  const category = item.category.toLowerCase();

  if (title === query)              return 100;
  if (title.startsWith(query))      return 80;
  if (title.includes(query))        return 60;
  if (keywords.includes(query))     return 40;
  if (category.includes(query))     return 20;

  // Partial word match
  const words = query.split(/\s+/);
  const matches = words.filter(w => title.includes(w) || keywords.includes(w));
  if (matches.length > 0) return (matches.length / words.length) * 30;

  return 0;
}

function search(query) {
  if (!query.trim()) return [];
  return SEARCH_INDEX
    .map(item => ({ ...item, _score: score(item, query) }))
    .filter(item => item._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 8);
}

/* ─── CATEGORY ICON ─── */
const CategoryIcon = ({ category }) => {
  const icons = {
    Business: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
    Solutions: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    "About Us": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    Pages: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  };
  return icons[category] || icons.Pages;
};

/* ─── ARROW ICON ─── */
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ─── SEARCH MODAL ─── */
function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  /* Focus input when opened */
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  /* Run search */
  useEffect(() => {
    const res = search(query);
    setResults(res);
    setActiveIdx(0);
  }, [query]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Scroll active item into view */
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIdx]) {
      navigate(results[activeIdx].path);
      onClose();
    }
  }, [results, activeIdx, navigate, onClose]);

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  /* Highlight matched text */
  const highlight = (text) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} className="search-highlight">{part}</mark>
        : part
    );
  };

  if (!isOpen) return null;

//   const showDefault = !query.trim();
//   const defaultItems = SEARCH_INDEX.slice(0,8).map(item => ({ ...item, _score: 0 })); 

    const showDefault = !query.trim();

/* Show all business verticals + important pages */
const defaultItems = SEARCH_INDEX.filter(
  item =>
    item.category === "Business" ||
    item.title === "Careers" ||
    item.title === "Contact" ||
    item.title === "Gallery"
);

  return (
    <div className="search-modal-backdrop" onMouseDown={onClose}>
      <div
        className="search-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Input Row */}
        <div className="search-modal-input-row">
          <span className="search-modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input
            ref={inputRef}
            className="search-modal-input"
            type="text"
            placeholder="Search pages, services, solutions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button className="search-modal-clear" onClick={() => setQuery("")} tabIndex={-1}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
          <kbd className="search-modal-esc" onClick={onClose}>esc</kbd>
        </div>

        {/* Divider */}
        <div className="search-modal-divider" />

        {/* Results */}
        <div className="search-modal-results" ref={listRef}>
          {showDefault ? (
            <>
              <p className="search-modal-label">Recommended searches</p>
              <ul className="search-modal-list">
                {defaultItems.map((item, i) => (
                  <li key={item.path}>
                    <button
                      className="search-result-item"
                      data-idx={i}
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => handleSelect(item.path)}
                    >
                      <span className="result-icon">
                        <CategoryIcon category={item.category} />
                      </span>
                      <span className="result-text">
                        <span className="result-title">{item.title}</span>
                        <span className="result-category">{item.category}</span>
                      </span>
                      <span className="result-arrow"><ArrowIcon /></span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : results.length > 0 ? (
            <>
              <p className="search-modal-label">{results.length} result{results.length !== 1 ? "s" : ""}</p>
              <ul className="search-modal-list">
                {results.map((item, i) => (
                  <li key={item.path}>
                    <button
                      className={`search-result-item ${i === activeIdx ? "active" : ""}`}
                      data-idx={i}
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => handleSelect(item.path)}
                    >
                      <span className="result-icon">
                        <CategoryIcon category={item.category} />
                      </span>
                      <span className="result-text">
                        <span className="result-title">{highlight(item.title)}</span>
                        <span className="result-category">{item.category}</span>
                      </span>
                      <span className="result-arrow"><ArrowIcon /></span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="search-no-results">
              <span className="no-results-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </span>
              <p>No results for <strong>"{query}"</strong></p>
              <span>Try a different keyword</span>
            </div>
          )}
        </div>

        {/* Footer hint */}
        {results.length > 0 && (
          <div className="search-modal-footer">
            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Open</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchModal;