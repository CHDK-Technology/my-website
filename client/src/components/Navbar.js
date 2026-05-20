import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";
import SearchModal from "./SearchModal";

const MENU_DATA = {
  Business: {
    title: "Business Overview",
    overviewText: "Overview",
    overviewPath: "/business-overview",
    rightTitle: "Business Verticals",
    columns: [
      [
        { name: "Aerospace & Defence", path: "/business/aerospace" },
        { name: "Infrastructure", path: "/business/infrastructure" },
        { name: "Industrial & Manufacturing", path: "/business/industrial-services" },
      ],
      [
        { name: "Agriculture", path: "/business/agriculture" },
        { name: "Waste Management", path: "/business/waste-management" },
      ],
      [
        { name: "Renewable Energy", path: "/business/renewable-energy" },
        { name: "IT Solutions & Digital Marketing", path: "/business/it-solutions" },
      ],
    ],
  },
  "About Us": {
    title: "About Us",
    overviewText: "Company Overview",
    overviewPath: "/about/overview",
    rightTitle: "About CHDK Group",
    columns: [
      [
        { name: "Innovation", path: "/about/innovation" },
      ],
      [{ name: "Advisory Board", path: "/about/advisory-board" },],


    ],
  },
  Solutions: {
    title: "Our Solutions",
    overviewText: "Explore our services",
    overviewPath: "/solutions/overview",
    rightTitle: "Service Categories",
    columns: [
      [
        { name: "Advanced Metrology ", path: "/solutions/advanced-metrology" },
        { name: "Calibration Services ", path: "/solutions/calibration" },
        { name: "3D Scanning & Modelling", path: "/solutions/3d-scanning" },
      ],
      [
        { name: "Precision Manufacturing", path: "/solutions/precision-manufacturing" },
        { name: "Jig, Mould & Aerospace Tooling", path: "/solutions/jig-mould-aerospace-tooling" },
        { name: "Reverse Engineering", path: "/solutions/reverse-engineering" },

      ],
      [
        { name: "Web Development", path: "/solutions/web-development" },
        { name: "App Development", path: "/solutions/app-development" },
        { name: "Digital Marketing", path: "/solutions/digital-marketing" },
        { name: "SEO Services", path: "/solutions/seo" },
      ],
    ],
  },
};

const NAV_ITEMS = [
  { label: "Business" },
  { label: "About Us" },
  { label: "Solutions" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
  { label: "Gallery", to: "/gallery" },
];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ThemeToggle = ({ darkMode, onToggle, style }) => (
  <div
    className={`theme-switch ${darkMode ? "dark" : "light"}`}
    onClick={onToggle}
    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    style={style}
  >
    <svg className="switch-icon sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
    <div className="switch-track"><div className="switch-thumb" /></div>
    <svg className="switch-icon moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </div>
);

function Navbar() {
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [scrolled, setScrolled]             = useState(false);
  const [activeMenu, setActiveMenu]         = useState(null);
  const [searchOpen, setSearchOpen]         = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimer = useRef(null);

  /* Body scroll lock */
  useEffect(() => {
    const locked = searchOpen || mobileOpen;
    if (locked) {
      const w = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow     = "";
      document.body.style.paddingRight = "";
    }
;
  }, [searchOpen, mobileOpen]);

  /* Scroll listener */
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* Theme */
  useEffect(() => {
    document.body.classList.toggle("dark-mode",  darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const h  = (e) => setDarkMode(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  /* Close drawer on desktop resize */
  useEffect(() => {
    const h = () => { if (window.innerWidth > 900) { setMobileOpen(false); setMobileExpanded(null); } };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const openMenu    = (label) => { clearTimeout(closeTimer.current); setActiveMenu(label); };
  const closeMenu   = ()      => { closeTimer.current = setTimeout(() => setActiveMenu(null), 180); };
  const cancelClose = ()      => clearTimeout(closeTimer.current);
  const toggleTheme = ()      => setDarkMode((p) => !p);
  const closeMobile = ()      => { setMobileOpen(false); setMobileExpanded(null); };

  const renderMegaMenu = () => {
    if (!activeMenu || !MENU_DATA[activeMenu]) return null;
    const data = MENU_DATA[activeMenu];
    return (
      <>
        <div className="mega-overlay" onMouseEnter={closeMenu} />
        <div className="mega-dropdown" onMouseEnter={cancelClose} onMouseLeave={closeMenu}>
          <div className="mega-inner">
            <div className="mega-stack">
              <div className="mega-section">
                <h2>{data.title}</h2>
                {data.overviewText && (
                  <Link to={data.overviewPath} className="learn-more-btn">{data.overviewText}</Link>
                )}
              </div>
              <div className="mega-section">
                {data.rightTitle && <h2>{data.rightTitle}</h2>}
                <div className="mega-columns">
                  {data.columns.map((col, i) => (
                    <div className="column" key={i}>
                      {col.map((item, j) => (
                        <Link key={j} to={item.path} className="mega-link">{item.name}</Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {/* ══ NAVBAR ══ */}
      <nav className={["navbar", scrolled ? "scrolled" : "", activeMenu ? "dropdown-open" : ""].filter(Boolean).join(" ")}>

        <div className="nav-left">
          <Link to="/" onClick={closeMobile}>
            <img src={logo} alt="CHDK Logo" className="logo-img" />
          </Link>
        </div>

        <div className="nav-center">
          {NAV_ITEMS.map((item) => {
            const hasDrop = Boolean(MENU_DATA[item.label]);
            if (!hasDrop && item.to)
              return <Link key={item.label} to={item.to} className="nav-item">{item.label}</Link>;
            return (
              <div
                key={item.label}
                className={`nav-item ${activeMenu === item.label ? "active" : ""}`}
                onMouseEnter={() => openMenu(item.label)}
                onMouseLeave={closeMenu}
              >
                {item.label}
              </div>
            );
          })}
        </div>

        <div className="nav-right">
          <span className="nav-desktop-only">
            <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
          </span>
          <Link to="/contact#contact-main-section" className="quote-btn nav-desktop-only">
            <span>GET A QUOTE</span>
            <svg className="quote-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <button className="search-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
            <SearchIcon />
          </button>

          <button
            className={`nav-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {renderMegaMenu()}

      {/* ══ MOBILE: dim backdrop ══ */}
      <div
        className={`mobile-backdrop ${mobileOpen ? "open" : ""}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ══ MOBILE DRAWER ══ */}
      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`} aria-label="Navigation menu">

        {/* Search bar */}
        <button
          className="mobile-search-bar"
          onClick={() => { setSearchOpen(true); closeMobile(); }}
        >
          <SearchIcon />
          <span>Search pages, services…</span>
        </button>

        {/* Links */}
        <nav className="mobile-nav-links">
          {NAV_ITEMS.map((item) => {
            const hasDrop    = Boolean(MENU_DATA[item.label]);
            const isExpanded = mobileExpanded === item.label;

            if (!hasDrop && item.to) {
              return (
                <Link key={item.label} to={item.to} className="mobile-nav-item" onClick={closeMobile}>
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.label}>
                <button
                  className={`mobile-nav-item mobile-nav-toggle ${isExpanded ? "expanded" : ""}`}
                  onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                  aria-expanded={isExpanded}
                >
                  {item.label}
                  <svg
                    className={`mobile-nav-chevron ${isExpanded ? "open" : ""}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <div className={`mobile-submenu ${isExpanded ? "open" : ""}`}>
                  {MENU_DATA[item.label].overviewText && (
                    <Link
                      to={MENU_DATA[item.label].overviewPath}
                      className="mobile-submenu-link mobile-submenu-overview"
                      onClick={closeMobile}
                    >
                      {MENU_DATA[item.label].overviewText} →
                    </Link>
                  )}
                  {MENU_DATA[item.label].columns.flat().map((link, i) => (
                    <Link key={i} to={link.path} className="mobile-submenu-link" onClick={closeMobile}>
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer strip */}
        <div className="mobile-drawer-footer">
          <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} style={{ justifyContent: "flex-start" }} />
          <Link to="/contact#contact-main-section" className="mobile-quote-btn" onClick={closeMobile}>
            Get a Quote
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </aside>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default Navbar;
