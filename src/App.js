import { useState, useEffect } from "react";
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
export default function App() {
  const [photo, setPhoto] = useState(""),
    [project, setProject] = useState(null);
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
      <header>
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
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a
            href="https://github.com/JorjDominic"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub &#8599;
          </a>
          <a href="mailto:hello@example.com">Contact me &#8599;</a>
          <button
            className="theme-toggle"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={dark}
            onClick={() => setDark(!dark)}
          >
            <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
            <span>{dark ? "Light mode" : "Dark mode"}</span>
          </button>
        </nav>
      </header>
      <main id="home">
        <section className="hero">
          <div className="intro">
            <label className="avatar" title="Add your photo">
              <input
                type="file"
                accept="image/*"
                aria-label="Upload your profile photo"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    const r = new FileReader();
                    r.onload = () => setPhoto(r.result);
                    r.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
              {photo ? <img alt="Your profile" src={photo} /> : <span>JD</span>}
              <b>+</b>
            </label>
            <div>
              <strong>Jorge Dominic M. Feliciano</strong>
              <small>
                Software Development &amp; Hardware/Networking Intern
              </small>
            </div>
            <span className="availability">
              INTERNSHIP AVAILABILITY &middot; NOVEMBER 2026
            </span>
          </div>
          <p className="eyebrow">A LITTLE CURIOSITY. A LOT OF CARE.</p>
          <h1>
            Thoughtful design.
            <br />
            <span>Meaningful connections.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              I turn ideas into clear, considered experiences.
              <br />A little strategy, a little creativity, and a human touch.
            </p>
            <a className="text-link" href="#projects">
              Explore my projects <span>&#8595;</span>
            </a>
          </div>
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
        <section className="about" id="about">
          <div>
            <p className="eyebrow">THE PERSON BEHIND THE PIXELS</p>
            <h2>
              Good work starts
              <br />
              with a little <em>curiosity.</em>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              I'm JorjDominic, an aspiring intern interested in software
              development, computer hardware, and networking.
            </p>
            <p>
              This is your space to share your story. Add what you love doing,
              what you're learning, and the kind of work you'd like to make
              next.
            </p>
            <div className="skills">
              <span>Software development</span>
              <span>Computer hardware</span>
              <span>Networking</span>
            </div>
          </div>
        </section>
        <section className="contact">
          <div>
            <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
            <h2>
              Let's make it <em>happen.</em>
            </h2>
          </div>
          <a className="button" href="mailto:hello@example.com">
            Say hello <span>&#8599;</span>
          </a>
        </section>
      </main>
      <footer>
        <span>&copy; {new Date().getFullYear()} JorjDominic</span>
        <span>Made with intention. &#10035;</span>
        <a href="#home">Back to top &#8593;</a>
      </footer>
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
