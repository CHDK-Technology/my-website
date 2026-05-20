import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

/* Client Logos */
import prajlogo from "../assets/Untitled-design-(39).png";
import solarlogo from "../assets/Untitled-design-(40).png";
import mahindralogo from "../assets/Untitled-design-(61).png";
import ltlogo from "../assets/Untitled-design-(42).png";
import hallogo from "../assets/Untitled-design-(43).png";
import godrejlogo from "../assets/Untitled-design-(44).png";
import gelogo from "../assets/Untitled-design-(60).png";
import bemllogo from "../assets/Untitled-design-(46).png";
import alstomlogo from "../assets/Untitled-design-(47).png";
import lmwlogo from "../assets/Untitled-design-(48).png";
import ecopowerlogo from "../assets/Untitled-design-(49).png";
import adalogo from "../assets/Untitled-design-(50).png";
import reliablelogo from "../assets/Untitled-design-(51).png";
import isrologo from "../assets/Untitled-design-(59).png";
import paraglogo from "../assets/Untitled-design-(53).png";
import pimientalogo from "../assets/Untitled-design-(54).png";
import tatapowerlogo from "../assets/Untitled-design-(58).png";
import kirloskarlogo from "../assets/Untitled-design-(57).png";


import "./Home.css";

/* ─── Hero Slide Data ─── */
const SLIDES = [
  {
    bg: "/slide1.png",
    title: ["Innovating", "Aerospace", "Solutions"],
    stat: "Providing expert inspection, CMM, reverse engineering, and satellite lab calibration services for superior industrial performance",
    link:{
      text: "Explore Our Aerospace Solutions",
      url: "/business/aerospace"
    },
    panel: "Aerospace Technology",
  },
  {
    bg: "/slide2.jpeg",
    title: ["Delivering Critical", "Solutions For", "Defence"],
    stat: "Providing innovative jig manufacturing and composite mould solutions for reliable production performance.",
    link:{
      text: "Explore Our Defence Solutions",
      url: "/business/aerospace"
    },
    panel: "Defence Technology",
  },
  {
    bg: "/slide3.jpeg",
    title: ["Keep Every", "Harvest", "Fresh"],
    stat: "Smart technologies designed to minimize losses, enhance shelf life, and maximize the value of every harvest.",
    link:{
      text: "Explore Our Agricultural Solutions",
      url: "/business/agriculture"
    },
    panel: "Agricultural Solutions",
  },
  {
    bg: "/slide4.png",
    title: ["Clean Energy", "With", "Iconic Designs"],
    stat: "Sustainable Energy Solutions for a Cleaner Tomorrow",
    link:{
      text: "Explore Our Renewable Energy Solutions",
      url: "/business/renewable-energy"
    },
    panel: "Renewable Energy Technology",
  },
  {
    bg: "/slide5.png",
    title: ["Redefining", "Modern", "Infrastructure"],
    stat: "Durable, Efficient Solutions For Corporate & Residential Needs.",
    link:{
      text: "Explore Our Infrastructure Solutions",
      url: "/business/infrastructure"
    },
    panel: "Infrastructure Solutions",
  },
];

const ACCORDION_DATA = [
  {
    id: "02",
    title: "Aerospace and Defence",
    desc: "Delivering critical, advanced engineering for aerospace and defence.",
    img: "/acc2.webp",
    link: "/business/aerospace"
  },
  {
    id: "01",
    title: "Agriculture",
    desc: "Innovative storage solutions ensuring minimal waste and enhance shelf life.",
    img: "/acc1.webp",
    link: "/business/agriculture"
  },
  {
    id: "03",
    title: "Renewable Energy",
    desc: "Building Energy Ecosystems Powered by Nature.",
    img: "/acc4.jpg",
    link: "/business/renewable-energy"
  },
  {
    id: "05",
    title: "Infrastructure",
    desc: "Building , future-ready infrastructure from the ground up.",
    img: "/acc6.jpg",
    link: "/business/infrastructure"
  },
  {
    id: "04",
    title: "Industrial Services",
    desc: "Innovation That Drives Industrial Growth.",
    img: "/acc5.png",
    link: "/business/industrial-services"
  },
  {
    id: "06",
    title: "Waste Management",
    desc: "Driving sustainability through advanced waste reduction methods.",
    img: "/acc7.png",
    link: "/business/waste-management"
  },
  {
    id: "07",
    title: "IT & Digital",
    desc: "Secure, Scalable, and Innovative Digital Services.",
    img: "/acc8.webp",
    link: "/business/it-solutions"
  }
];

/* ─── Client Logos ─── */
const CLIENT_LOGOS_ROW1 = [
  { name: "Mahindra",              src: mahindralogo },
  { name: "Godrej",                src: godrejlogo },
  { name: "Alstom",                src: alstomlogo },
  { name: "L&T",                   src: ltlogo },
  { name: "GE Aerospace",          src: gelogo },
  { name: "Tata Power",            src: tatapowerlogo },
  { name: "Kirloskar",             src: kirloskarlogo },
  { name: "ISRO",                  src: isrologo },
  { name: "LMW",                   src: lmwlogo },
];

const CLIENT_LOGOS_ROW2 = [
  { name: "Reliance",              src: reliablelogo },
  { name: "Praj Industries",       src: prajlogo },
  { name: "Parag Milk Foods",      src: paraglogo },
  { name: "Ecopower",              src: ecopowerlogo },
  { name: "Pimienta",              src: pimientalogo },
  { name: "BEML",                  src: bemllogo },
  { name: "Solar Group",           src: solarlogo },
  { name: "HAL",                   src: hallogo },
  { name: "ADA",                   src: adalogo },
];

/* ─── OPTIMIZED REVEAL HOOK ─── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function WhySection() {
  return (
    <section className="why-section">
      <div className="container">

        <div className="why-header">
          <h2 className="why-big">
            We Don't Just Build Solutions
            <span> We Engineer Performance</span>
          </h2>

        </div>

        <div className="why-grid">

          <div className="why-card">
            <h3>Multi-Sector Expertise</h3>
            <p>
              Solutions across aerospace, defence, agriculture,
              and industrial systems.
            </p>
          </div>

          <div className="why-card">
            <h3>Execution-Driven Approach</h3>
            <p>
              Focused on practical solutions that work in
              real-world operating conditions.
            </p>
          </div>

          <div className="why-card">
            <h3>Trusted Partnerships</h3>
            <p>
              Collaborating with leading organizations
              and industrial innovators across India.
            </p>
          </div>

          <div className="why-card">
            <h3>Built for Reliability</h3>
            <p>
              Designed for long-term operational performance,
              scalability, and sustainable growth.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
const EVENT_IMAGES = [
  { src: "/event1.PNG", alt: "CHDK Event" },
  { src: "/event2.PNG", alt: "CHDK Event" },
  { src: "/event3.PNG", alt: "CHDK Event" },
  { src: "/event1.PNG", alt: "CHDK Event" },
  { src: "/event2.PNG", alt: "CHDK Event" },
  { src: "/event3.PNG", alt: "CHDK Event" },
];


function KeyHighlights() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`highlights-section ${isVisible ? "highlights-visible" : ""}`} ref={sectionRef}>      
      <div className="container">
        <div className="events-section">
          <div className="events-header">
            <div>
              <h3 className="events-title">NEWS &amp; EVENTS</h3>
            </div>
            <div className="events-nav">
              <button ref={prevRef} className="events-nav-btn" aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <button ref={nextRef} className="events-nav-btn" aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
          <p className="events-tagline">
            We have established a strong presence across India, serving diverse industries with innovative
            and reliable solutions. Our expanding network enables us to deliver quality, efficiency,
            and support to clients in every region.
          </p>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={EVENT_IMAGES.length > 3}
            speed={700}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              640:  { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
            className="events-swiper"
          >
            {EVENT_IMAGES.map((ev, i) => (
              <SwiperSlide key={i}>
                <div className="event-photo-card">
                  <img src={ev.src} alt={ev.alt} className="event-photo-img" loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

/* ─── HERO SLIDER ─── */
function HeroSlider() {
  const swiperRef = useRef(null);
  const barRef    = useRef(null);
  const DELAY = 5000;

  function startProgress() {
    const bar = barRef.current;
    if (!bar) return;
    bar.style.transition = "none";
    bar.style.width = "0%";
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        bar.style.transition = `width ${DELAY}ms linear`;
        bar.style.width = "100%";
      })
    );
  }

  function handleSlideChange(swiper) {
    startProgress();
    document.querySelectorAll(".hero-panel-item").forEach((el, i) =>
      el.classList.toggle("active", i === swiper.realIndex)
    );
  }

  useEffect(() => { startProgress(); }, []);

  return (
    <div className="hero-slider-root">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={900}
        autoplay={{ delay: DELAY, disableOnInteraction: false }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={handleSlideChange}
        className="hero-swiper"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i} className="hero-slide">
            <div className="hero-slide-bg" style={{ backgroundImage: `url('${slide.bg}')` }} />
            <div className="hero-slide-overlay" />
            <div className="hero-slide-content">
              <p className="hero-slide-tag">{slide.tag}</p>
              <h1 className="hero-slide-title">
                {slide.title.map((line, j) => <span key={j}>{line}<br /></span>)}
              </h1>
              <p className="hero-slide-stat">{slide.stat}</p>
               <a href={slide.link.url} className="hero-slide-link">
                {slide.link.text} →
               </a>            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-panel">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`hero-panel-item${i === 0 ? " active" : ""}`}
            onClick={() => swiperRef.current?.slideToLoop(i)}
          >
            <span className="hero-panel-text">{slide.panel}</span>
          </div>
        ))}
      </div>

      <div className="hero-progress-track">
        <div className="hero-progress-bar" ref={barRef} />
      </div>

      <a href="#whatwedo" className="hero-scroll-chevrons" aria-label="Scroll down">
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
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link social-linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link social-instagram" aria-label="Instagram"><FaInstagram /></a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link social-facebook" aria-label="Facebook"><FaFacebook /></a>
        <a href="mailto:info@chdkindia.com" className="social-link social-mail" aria-label="Email"><HiOutlineMail /></a>
      </div>
    </div>
  );
}

function AccordionSlider() {
  const [activePanel, setActivePanel] = useState(2);
  const [hoverPanel, setHoverPanel] = useState(null);
  const hoverTimer = useRef(null);

  const handleEnter = useCallback((index) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setHoverPanel(index);
    }, 30);
  }, []);

  const handleLeave = useCallback(() => {
    clearTimeout(hoverTimer.current);
    setHoverPanel(null);
  }, []);

  const handleClick = useCallback((index) => {
    clearTimeout(hoverTimer.current);
    setActivePanel(index);
    setHoverPanel(null);
  }, []);

  // Memoize so string is only rebuilt when activePanel or hoverPanel changes
  const gridCols = useMemo(() => 
    ACCORDION_DATA
      .map((_, i) => {
        if (i === activePanel) return "5.5fr";
        if (i === hoverPanel && i !== activePanel) return "2.2fr";
        return "1fr";
      })
      .join(" "),
    [activePanel, hoverPanel]
  );

  return (
    <section className="premium-accordion-section">
      <div
        className="premium-accordion-wrapper"
        onMouseLeave={handleLeave}
        style={{ gridTemplateColumns: gridCols }}
      >
        {ACCORDION_DATA.map((item, index) => {
          const isActive = activePanel === index;

          return (
            <div
              key={item.id}
              className={`premium-panel ${isActive ? "active" : ""}`}
              onMouseEnter={() => handleEnter(index)}
              onClick={() => handleClick(index)}
            >
              <img
                src={item.img}
                alt={item.title}
                className="premium-bg-img"
                loading="eager"
                decoding="async"
                draggable="false"
              />

              <div className="premium-overlay-base" />
              <div className="premium-overlay-hover" />

              <div className="premium-content-inactive">
                <span className="premium-vertical-text">{item.title}</span>
              </div>

              <div className="premium-content-active">
                <h2 className="premium-title">{item.title}</h2>
                <p className="premium-desc">{item.desc}</p>
                <a href={item.link} className="premium-link">
                   Explore More <span className="arrow">→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
/* ─── HOME ─── */
function Home() {
  const [ref1] = useReveal(); // We grab the ref, the hook handles the rest

  return (
    <div className="home">
      <HeroSlider />

      <section id="whatwedo" className="about-section" ref={ref1}>
        <div className="container">
          <div className="about-intro-grid">
            <div className="about-image-wrapper">
              <img src="/CHDK.png" alt="CHDK Industrial Services" className="about-featured-image" loading="lazy" />

            </div>
            <div className="about-text-wrapper">
              <h2 className="section-heading">From Earth To Sky<br/>We Engineer</h2>
              <p className="section-description">
                CHDK Technology Center is a dynamic and trusted contributor to India's
                industrial growth, delivering innovative and reliable solutions since
                2018. Our multi-sector expertise enables us to create smart,
                sustainable, and future-ready solutions.
              </p>
              <p className="section-description highlight">
                Backed by skilled engineers and continuous innovation, we don't just work for our clients;
                we partner with them to turn complex challenges into sustainable realities.
              </p>
              <a href="/about/overview" className="know-more-btn">Discover Our Story <span>→</span></a>
            </div>
          </div>
        </div>
      </section>

      <AccordionSlider />
      <WhySection />
      <KeyHighlights />

      <section className="clients-section">
        <div className="container">
          <div className="clients-header">
            <h2 className="hc-title">WE WORK WITH</h2>
            <p className="clients-subtitle">
              Trusted by industry leaders across aerospace, defence, agriculture, and industrial sectors, we deliver innovative solutions that drive performance and growth. Our commitment to excellence has made us a preferred partner for organizations seeking reliability and innovation in their operations.
            </p>
          </div>
        </div>

        <div className="clients-marquee-wrap">
          {/* Row 1 — scrolls left */}
          <div className="clients-marquee-outer">
            <div className="clients-fade-left" />
            <div className="clients-fade-right" />
            <div className="clients-track clients-track-left">
              {[...CLIENT_LOGOS_ROW1, ...CLIENT_LOGOS_ROW1].map((client, i) => (
                <div className="clients-logo-card" key={i}>
                  <img src={client.src} alt={client.name} className="clients-logo-img" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="clients-marquee-outer">
            <div className="clients-fade-left" />
            <div className="clients-fade-right" />
            <div className="clients-track clients-track-right">
              {[...CLIENT_LOGOS_ROW2, ...CLIENT_LOGOS_ROW2].map((client, i) => (
                <div className="clients-logo-card" key={i}>
                  <img src={client.src} alt={client.name} className="clients-logo-img" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;