import { useState, useEffect, useRef } from "react";
import "./App.css";
const projects = [
  [
    "fern & form",
    "A quieter kind of brand.",
    "Brand identity",
    "An example identity for a botanical studio, inspired by natural forms and thoughtful details.",
  ],
  [
    "forma",
    "Room for a fresh perspective.",
    "Web design",
    "An example storefront exploring editorial layouts and objects for everyday living.",
  ],
];
const skillGroups = [
  {
    title: "Technologies",
    items: [
      ["Next.js", "nextdotjs"],
      ["HTML 5", "html5"],
      ["CSS 3", "css"],
      ["TypeScript", "typescript"],
      ["Tailwind CSS", "tailwindcss"],
      ["Supabase", "supabase"],
      ["React", "react"],
    ],
  },
  {
    title: "Tools",
    items: [
      ["Packet Tracer", "cisco"],
      ["Wireshark", "wireshark"],
      ["Windows Server", "windows"],
      ["PowerShell", "powershell"],
      ["Linux", "linux"],
      ["Git", "git"],
      ["GitHub", "github"],
    ],
  },
];

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
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return saved
      ? saved === "dark"
      : !!window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <div className="portfolio editorial">
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
              <small>
                Software Development &amp; Hardware/Networking Intern
              </small>
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
                <span>and connecting.</span>
              </h1>
            </div>
            <div className="about-copy">
              <p>
                I'm Jorge Dominic M. Feliciano, an aspiring intern interested in
                software development, computer hardware, and networking.
              </p>
              <p>
                I'm looking for an opportunity to put what I'm learning into
                practice, contribute to a team, and grow through hands-on
                experience.
              </p>
            </div>
          </section>
        </section>
        <section id="projects" className="work">
          <div className="section-title">
            <h2>
              Selected projects <small>/ 01&mdash;02</small>
            </h2>
            <span>A FEW THINGS I'VE IMAGINED</span>
          </div>
          <div className="projects">
            {projects.map((p, i) => (
              <button
                className="project"
                key={p[0]}
                onClick={() => setProject(i)}
              >
                <div className={"art art-" + i}>
                  <small className="art-label">
                    CONCEPT PROJECT &middot; 0{i + 1}
                  </small>
                  {i === 0 ? (
                    <>
                      <div className="leaf one" />
                      <div className="leaf two" />
                      <div className="brand">
                        <span>&#10035;</span>
                        <strong>fern & form</strong>
                        <small>GROW INTO YOUR OWN.</small>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mock">
                        <div className="mock-nav">
                          forma <small>Shop &nbsp; About &nbsp; &#8599;</small>
                        </div>
                        <h3>
                          Objects for
                          <br />
                          everyday living.
                        </h3>
                        <small className="mock-caption">
                          LESS, BUT BETTER.
                        </small>
                        <div className="disc" />
                        <div className="vase">
                          <i />
                        </div>
                      </div>
                      <small className="art-bottom">
                        A STUDY IN SIMPLE THINGS.
                      </small>
                    </>
                  )}
                </div>
                <div className="project-info">
                  <div>
                    <h3>{p[1]}</h3>
                    <p>{p[2]} &nbsp;&middot;&nbsp; 2026</p>
                  </div>
                  <span>&#8599;</span>
                </div>
              </button>
            ))}
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
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                  {motionPaused ? (
                    <path d="m8 5 11 7-11 7z" />
                  ) : (
                    <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          {skillGroups.map((group) => (
            <div className="technology-group" key={group.title}>
              <h3 className="eyebrow">{group.title}</h3>
              <div
                className={
                  "technology-carousel" + (motionPaused ? " is-paused" : "")
                }
              >
                <div className="technology-track">
                  {[0, 1].map((copy) => (
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
            aria-label={projects[project][1]}
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
            <p className="eyebrow">SAMPLE PROJECT / 0{project + 1}</p>
            <h2>{projects[project][1]}</h2>
            <p>{projects[project][3]}</p>
            <p>
              Make this yours: replace this concept with your own project,
              process, and final work.
            </p>
            <button className="button" onClick={() => setProject(null)}>
              Back to projects &#8599;
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
