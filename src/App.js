import { useState, useEffect, useRef } from "react";
import "./App.css";
const projects = [
  {
    name: "CarmeLink",
    category: "Mobile app / Dormitory management",
    tagline: "One place for everyday dormitory operations.",
    description:
      "A Flutter dormitory-management prototype for Carmelita's Dormitory, with separate workspaces for tenants, guardians, caretakers, and owners.",
    stack: ["Flutter", "Dart", "Supabase", "Firebase"],
    features: [
      "Role-based workspaces and account onboarding.",
      "Billing, payment review, maintenance reports, and communication.",
      "Gate activity, curfew requests, visitors, and geofencing workflows.",
    ],
    status: "Functional prototype",
    image: "carmelink.jpg",
    repo: "CarmeLink",
    theme: "dormitory",
  },
  {
    name: "ActiBind",
    category: "Mobile app / Digital wellbeing",
    tagline: "Bring plans and device habits together.",
    description:
      "A Flutter activity planner that combines schedules, routines, tasks, and device-usage insights in one application.",
    stack: ["Flutter", "Dart", "Supabase", "Firebase"],
    features: [
      "Activity scheduling, recurring routines, tasks, and notes.",
      "Android app-usage tracking and synchronized computer activity.",
      "Reminders, home-screen widgets, and privacy-controlled AI insights.",
    ],
    status: "Development project",
    image: "actibind.png",
    repo: "ActiBind",
    theme: "activity",
  },
  {
    name: "eLikas",
    category: "Web app / Disaster preparedness",
    tagline: "Make preparedness easier to navigate.",
    description:
      "A React web application for evacuation guidance and disaster preparedness, bringing maps, evacuation centers, alerts, and community reporting together.",
    stack: ["React", "JavaScript", "Supabase", "Leaflet"],
    features: [
      "Interactive Leaflet maps with location and area-drawing controls.",
      "Evacuation-center directory, alerts, and preparedness guides.",
      "Hazard reports and administrative management pages.",
    ],
    status: "Development project",
    image: "elikas.png",
    repo: "eLikas",
    theme: "preparedness",
  },
  {
    name: "SureShopPH",
    category: "Web app / Shopping risk analysis",
    tagline: "Look closer before checking out.",
    description:
      "An online-shopping risk-analysis project with a React interface, a Python API, and a companion browser extension.",
    stack: ["React", "JavaScript", "Supabase", "Python / FastAPI"],
    features: [
      "URL and listing analysis with risk and confidence indicators.",
      "Saved scan history, user reports, and administrative review tools.",
      "A FastAPI backend for listing, comment, and URL analysis.",
    ],
    status: "Development project",
    repo: "SureShopPH---Risk-Detection-and-Analysis-for-online-shopping-",
    related: [
      ["Backend", "SureShopPH---Backend-Layer"],
      ["Browser extension", "SureShopPH---Browser-Extension"],
    ],
    image: "sureshopph.png",
    theme: "shopping",
  },
  {
    name: "Biyahe Bulacan",
    category: "Web app / Travel directory",
    tagline: "Discover a little more of Bulacan.",
    description:
      "An interactive Bulacan travel directory with destination discovery, reviews, itinerary planning, and commuting guidance.",
    stack: ["React", "JavaScript", "Firebase", "Google Maps"],
    features: [
      "Browse destinations and explore detailed spot information and reviews.",
      "Build travel itineraries with destination maps and route guidance.",
      "Community feeds and administrative destination-management tools.",
    ],
    status: "Travel directory project",
    image: "biyahebulacan.png",
    repo: "byahe-bulacan",
    theme: "travel",
  },
];
const skillGroups = [
  {
    title: "Technologies",
    items: [
      ["Flutter", "flutter"],
      ["Dart", "dart"],
      ["React", "react"],
      ["JavaScript", "javascript"],
      ["TypeScript", "typescript"],
      ["HTML 5", "html5"],
      ["CSS 3", "css"],
      ["Python", "python"],
      ["SQL", "sql"],
      ["Kotlin", "kotlin"],
      ["Node.js", "nodedotjs"],
    ],
  },
  {
    title: "Tools",
    items: [
      ["VS Code", "vscode"],
      ["Git", "git"],
      ["GitHub", "github"],
      ["Supabase", "supabase"],
      ["Firebase", "firebase"],
      ["Vercel", "vercel"],
      ["npm", "npm"],
      ["GitHub Actions", "githubactions"],
      ["Codemagic", "codemagic"],
      ["XAMPP", "xampp"],
      ["MySQL Workbench", "mysqlworkbench"],
      ["Unity", "unity"],
      ["Docker", "docker"],
      ["Android Studio", "androidstudio"],
      ["Packet Tracer", "cisco"],
      ["Windows Server", "windows"],
      ["PowerShell", "powershell"],
      ["Linux", "linux"],
    ],
  },
];

const backgroundIcons = skillGroups.flatMap((group) => group.items);

export default function App() {
  const headerRef = useRef(null);
  useEffect(() => {
    const header = headerRef.current;
    const updateOffset = () =>
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.getBoundingClientRect().height}px`,
      );
    updateOffset();
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateOffset)
        : null;
    observer?.observe(header);
    window.addEventListener("resize", updateOffset);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateOffset);
      document.documentElement.style.removeProperty("--header-height");
    };
  }, []);
  const [photoOpen, setPhotoOpen] = useState(false);
  const photoCloseRef = useRef(null);
  useEffect(() => {
    if (!photoOpen) return;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    photoCloseRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") setPhotoOpen(false);
      if (event.key === "Tab") {
        event.preventDefault();
        photoCloseRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [photoOpen]);
  const [project, setProject] = useState(null);
  const [motionPaused, setMotionPaused] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidesPaused, setSlidesPaused] = useState(false);
  const [slidesFocused, setSlidesFocused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const touchStart = useRef(null);
  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  useEffect(() => {
    if (
      slidesPaused ||
      slidesFocused ||
      pageHidden ||
      photoOpen ||
      project !== null
    )
      return;
    const timer = window.setTimeout(
      () => setActiveSlide((index) => (index + 1) % projects.length),
      5000,
    );
    return () => window.clearTimeout(timer);
  }, [
    activeSlide,
    slidesPaused,
    slidesFocused,
    pageHidden,
    photoOpen,
    project,
  ]);
  const goToSlide = (index) => {
    setActiveSlide((index + projects.length) % projects.length);
  };
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return saved !== "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <div className="portfolio editorial">
      <div
        className={"ambient-technologies" + (motionPaused ? " is-paused" : "")}
        aria-hidden="true"
      >
        {[0, 1, 2].map((row) => (
          <div className="ambient-row" key={row}>
            <div className="ambient-track">
              {[0, 1].map((copy) => (
                <div className="ambient-logo-group" key={copy}>
                  {backgroundIcons.map(([, icon], index) => (
                    <span
                      className="ambient-logo"
                      key={icon}
                      style={{
                        "--logo-mask":
                          "url(" +
                          process.env.PUBLIC_URL +
                          "/icons/" +
                          backgroundIcons[
                            (index + row * 5) % backgroundIcons.length
                          ][1] +
                          ".svg)",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <header ref={headerRef}>
        <a className="logo" href="#home">
          JorjDominic
          <svg
            className="github-mark"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
          >
            <path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.004-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.622-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.596 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
        <nav>
          <a href="#about">About</a>
          <a href="#projects">Projects &amp; Technologies</a>
          <a href="#socials">Contact me</a>
        </nav>
      </header>
      <main id="home">
        <section className="hero">
          <div className="intro">
            <button
              className="avatar profile-photo"
              aria-label="Enlarge profile photo"
              aria-haspopup="dialog"
              onClick={() => setPhotoOpen(true)}
            >
              <img
                alt="Jorge Dominic M. Feliciano"
                src={process.env.PUBLIC_URL + "/pfp.jpg"}
              />
            </button>
            <div>
              <strong>Jorge Dominic M. Feliciano</strong>
              <small>Software Development, Hardware &amp; Networking</small>
            </div>
            <span className="availability">
              <span className="education">NU Baliwag BSIT</span>
              <span>INTERNSHIP AVAILABILITY &middot; NOVEMBER 2026</span>
            </span>
          </div>
          <hr className="profile-divider" />
          <section
            className="about about-intro"
            id="about"
            aria-labelledby="about-title"
          >
            <div>
              <p className="eyebrow">ABOUT ME</p>
              <h1 id="about-title">
                Learning, building,
                <br />
                <span>and tinkering.</span>
              </h1>
            </div>
            <div className="about-copy">
              <p>
                I'm Jorge Dominic M. Feliciano, an aspiring IT professional with
                a passion for software development, computer hardware, and
                networking.
              </p>
              <p>
                I'm looking for opportunities to apply my knowledge, explore new
                technologies, contribute to meaningful projects, and
                continuously grow through hands-on experience.
              </p>
            </div>
          </section>
        </section>
        <section id="projects" className="work">
          <div className="section-title">
            <h2>
              Selected projects <small>/ 01&mdash;05</small>
            </h2>
            <span>A SELECTION FROM MY GITHUB</span>
          </div>
          <div
            className="project-slideshow"
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected projects"
            onFocusCapture={(event) =>
              setSlidesFocused(!!event.target.closest(".project-slide"))
            }
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setSlidesFocused(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                goToSlide(activeSlide + 1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                goToSlide(activeSlide - 1);
              }
            }}
          >
            <div
              className="project-viewport"
              onTouchStart={(event) => {
                touchStart.current = {
                  x: event.touches[0].clientX,
                  y: event.touches[0].clientY,
                };
              }}
              onTouchEnd={(event) => {
                if (!touchStart.current) return;
                const dx =
                  event.changedTouches[0].clientX - touchStart.current.x;
                const dy =
                  event.changedTouches[0].clientY - touchStart.current.y;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
                  goToSlide(activeSlide + (dx < 0 ? 1 : -1));
                touchStart.current = null;
              }}
            >
              <div
                className="project-slide-track"
                style={{ transform: "translateX(-" + activeSlide * 100 + "%)" }}
                aria-live={slidesPaused ? "polite" : "off"}
              >
                {projects.map((p, i) => (
                  <article
                    className="project-slide"
                    key={p.name}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={
                      i + 1 + " of " + projects.length + ": " + p.name
                    }
                    aria-hidden={i !== activeSlide}
                    inert={i !== activeSlide}
                  >
                    <div className={"art repository-cover cover-" + p.theme}>
                      <span className="cover-number">
                        0{i + 1} / SELECTED PROJECT
                      </span>
                      <div className="project-emblem" aria-hidden="true">
                        <img
                          src={process.env.PUBLIC_URL + "/projects/" + p.image}
                          alt=""
                          loading={i === 0 ? "eager" : "lazy"}
                        />
                      </div>
                      <strong className="cover-name">{p.name}</strong>
                      <span className="cover-tagline">{p.tagline}</span>
                    </div>
                    <div className="slide-copy">
                      <p className="eyebrow">{p.category}</p>
                      <h3>{p.name}</h3>
                      <p className="slide-description">{p.description}</p>
                      <div className="project-stack">
                        {p.stack.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                      <button
                        className="slide-details"
                        aria-label={"View " + p.name + " project"}
                        onClick={() => setProject(i)}
                      >
                        Explore project <span aria-hidden="true">&#8599;</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="slideshow-controls">
              <div className="slide-pagination" aria-label="Choose a project">
                {projects.map((p, i) => (
                  <button
                    key={p.name}
                    className={
                      "slide-dot" + (i === activeSlide ? " active" : "")
                    }
                    aria-label={"Show " + p.name}
                    aria-current={i === activeSlide ? "true" : undefined}
                    onClick={() => goToSlide(i)}
                  >
                    <span />
                  </button>
                ))}
              </div>
              <div className="slide-navigation">
                <span className="slide-count">
                  0{activeSlide + 1} <span>/ 0{projects.length}</span>
                </span>
                <button
                  className="slide-control"
                  aria-label="Previous project"
                  onClick={() => goToSlide(activeSlide - 1)}
                >
                  &#8592;
                </button>
                <button
                  className="slide-control"
                  aria-label="Next project"
                  onClick={() => goToSlide(activeSlide + 1)}
                >
                  &#8594;
                </button>
                <button
                  className="slide-control slide-play"
                  aria-label={
                    slidesPaused
                      ? "Play project slideshow"
                      : "Pause project slideshow"
                  }
                  aria-pressed={slidesPaused}
                  onClick={() => setSlidesPaused(!slidesPaused)}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {slidesPaused ? (
                      <path d="m8 5 11 7-11 7z" />
                    ) : (
                      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section
          className="technology-section"
          id="technologies"
          aria-labelledby="technologies-title"
        >
          <div className="section-title">
            <h2 id="technologies-title">Technologies &amp; tools</h2>
            <div className="technology-controls">
              <span>WHAT I BUILD AND LEARN WITH</span>
              <button
                className="tech-view-toggle"
                aria-pressed={showAllTech}
                aria-controls="technology-content"
                onClick={() => setShowAllTech(!showAllTech)}
              >
                {showAllTech ? "Carousel view" : "View all"}
              </button>
              {!showAllTech && (
                <button
                  className="carousel-control"
                  onClick={() => setMotionPaused(!motionPaused)}
                  aria-label={
                    motionPaused
                      ? "Play technology carousel"
                      : "Pause technology carousel"
                  }
                  aria-pressed={motionPaused}
                  title={motionPaused ? "Play animation" : "Pause animation"}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    {motionPaused ? (
                      <path d="m8 5 11 7-11 7z" />
                    ) : (
                      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                    )}
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div id="technology-content">
            {skillGroups.map((group) => (
              <div className="technology-group" key={group.title}>
                <h3 className="eyebrow">{group.title}</h3>
                <div
                  className={
                    "technology-carousel" +
                    (motionPaused ? " is-paused" : "") +
                    (showAllTech ? " is-static" : "")
                  }
                >
                  <div className="technology-track">
                    {(showAllTech ? [0] : [0, 1]).map((copy) => (
                      <ul
                        className="technology-grid"
                        key={copy}
                        aria-label={copy === 0 ? group.title : undefined}
                        aria-hidden={copy === 1 ? true : undefined}
                      >
                        {group.items.map(([name, icon]) => (
                          <li key={name}>
                            <div className="technology-icon" aria-hidden="true">
                              {icon === "windows" ? (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M2 4.5 10.5 3.3v8H2zm10-1.4L22 1.7v9.6h-10zM2 12.8h8.5v8L2 19.6zm10 0h10v9.5l-10-1.4z" />
                                </svg>
                              ) : icon === "powershell" ? (
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m12 4 10 8-10 8L2 12z" />
                                  <path d="m8 9 4 3-4 3m5 0h4" />
                                </svg>
                              ) : (
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/icons/" +
                                    icon +
                                    ".svg"
                                  }
                                  alt=""
                                  width="25"
                                  height="25"
                                />
                              )}
                            </div>
                            <span>{name}</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          className="contact socials"
          id="socials"
          aria-labelledby="socials-title"
        >
          <div>
            <p className="eyebrow">FIND ME ONLINE</p>
            <h2 id="socials-title">
              Let's <em>connect.</em>
            </h2>
          </div>
          <ul className="social-links" aria-label="Social profiles">
            <li>
              <a
                className="social-link"
                href="https://github.com/JorjDominic"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-icon">
                  <img
                    src={process.env.PUBLIC_URL + "/icons/github.svg"}
                    alt=""
                  />
                </span>
                <span>GitHub</span>
                <span className="social-arrow" aria-hidden="true">
                  &#8599;
                </span>
              </a>
            </li>
            <li>
              <a
                className="social-link"
                href="https://www.facebook.com/feliciano.jorge.dominic/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-icon">
                  <img
                    src={process.env.PUBLIC_URL + "/icons/facebook.svg"}
                    alt=""
                  />
                </span>
                <span>Facebook</span>
                <span className="social-arrow" aria-hidden="true">
                  &#8599;
                </span>
              </a>
            </li>
            <li>
              <a
                className="social-link"
                href="https://www.linkedin.com/in/jorge-dominic-feliciano-08256640b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-icon">
                  <img
                    src={process.env.PUBLIC_URL + "/icons/linkedin.svg"}
                    alt=""
                  />
                </span>
                <span>LinkedIn</span>
                <span className="social-arrow" aria-hidden="true">
                  &#8599;
                </span>
              </a>
            </li>
          </ul>
        </section>
      </main>
      <footer>
        <span>&copy; {new Date().getFullYear()} JorjDominic</span>
        <a href="#home">Back to top &#8593;</a>
      </footer>
      <button
        className="theme-toggle floating-theme-toggle"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={dark}
        onClick={() => setDark(!dark)}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {dark ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </>
          ) : (
            <path d="M20.9 13.1A9 9 0 0 1 10.9 3.1 9 9 0 1 0 20.9 13.1Z" />
          )}
        </svg>
      </button>
      {photoOpen && (
        <div
          className="backdrop photo-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setPhotoOpen(false);
          }}
        >
          <section
            className="photo-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Profile photo of Jorge Dominic M. Feliciano"
          >
            <button
              ref={photoCloseRef}
              className="photo-close"
              aria-label="Close enlarged photo"
              onClick={() => setPhotoOpen(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <img
              className="enlarged-photo"
              src={process.env.PUBLIC_URL + "/pfp.jpg"}
              alt="Jorge Dominic M. Feliciano"
            />
            <p>Jorge Dominic M. Feliciano</p>
          </section>
        </div>
      )}
      {project !== null && (
        <div className="backdrop" onClick={() => setProject(null)}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={projects[project].name}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") setProject(null);
            }}
          >
            <button
              autoFocus
              className="close"
              aria-label="Close project"
              onClick={() => setProject(null)}
            >
              &times;
            </button>
            <p className="eyebrow">{projects[project].category}</p>
            <h2>{projects[project].name}</h2>
            <span className="project-status">{projects[project].status}</span>
            <p>{projects[project].description}</p>
            <ul className="project-features">
              {projects[project].features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="project-stack">
              {projects[project].stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="repository-links">
              <a
                className="button"
                href={
                  "https://github.com/JorjDominic/" + projects[project].repo
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub <span aria-hidden="true">&#8599;</span>
              </a>
              {projects[project].related?.map(([label, repo]) => (
                <a
                  className="related-repo"
                  key={repo}
                  href={"https://github.com/JorjDominic/" + repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label} &#8599;
                </a>
              ))}
            </div>
            <button className="project-back" onClick={() => setProject(null)}>
              Back to projects &#8599;
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
