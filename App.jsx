import { useState, useEffect, useRef } from 'react'
import heroImg from './assets/hero.png'
import "./App.css"

/* ── STAGGER HEADLINE: splits text into animated chars ── */
function StaggerHeadline({ text, className = '' }) {
  return (
    <span className={`stagger-headline ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char"
          style={{ animationDelay: `${i * 0.04}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

/* ── SCROLL REVEAL HOOK ── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ── FLOATING PARTICLES ── */
function Particles() {
  return (
    <div className="particles">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            width:  `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            animationDuration: `${8 + Math.random() * 14}s`,
            animationDelay:    `${Math.random() * 10}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  )
}

/* ── ORBIT WRAPPER ── */
function OrbitWrapper() {
  const icons = ['⚛️', '🐍', '☁️', '🗄️', '🔷', '⚡']
  return (
    <div className="orbit-wrapper">
      <div className="orbit-ring">
        {icons.map((icon, i) => (
          <div key={i} className="orbit-icon">{icon}</div>
        ))}
      </div>
      <div className="orbit-ring-2" />
      <div className="avatar-placeholder">SN</div>
    </div>
  )
}

/* ── SECTION HEADER ── */
function SectionHeader({ title, subtitle }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal from-bottom" style={{ textAlign: 'center', marginBottom: '12px' }}>
      <h2><StaggerHeadline text={title} /></h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}

function App() {
  /* ── SKILLS DATA ── */
  const skills = [
    { icon: '⚛️', label: 'React' },
    { icon: '🐍', label: 'Python' },
    { icon: '🟨', label: 'JavaScript' },
    { icon: '🗄️', label: 'SQL' },
    { icon: '🍃', label: 'MongoDB' },
    { icon: '☁️', label: 'Cloud' },
  ]

  /* Reveal refs */
  const heroRef      = useReveal()
  const sidebarRef   = useReveal()
  const skillsRef    = useReveal()
  const expRef       = useReveal()
  const projRef      = useReveal()
  const pubRef       = useReveal()
  const achRef       = useReveal()
  const contactRef   = useReveal()

  /* Timeline items */
  const expItems = [
    { side: 'left',  title: 'Frontend Internship',  desc: 'Worked on building responsive UI using React and modern web technologies. Contributed to real-world projects.' },
    { side: 'right', title: 'Backend Internship',   desc: 'Developed APIs and worked with databases while learning scalable backend architecture.' },
    { side: 'left',  title: 'Cloud Internship',     desc: 'Worked with cloud services and deployment pipelines while learning infrastructure management.' },
    { side: 'right', title: 'Research Internship',  desc: 'Conducted research on machine learning models and published findings in a conference paper.' },
  ]

  return (
    <div className="page">
      <Particles />

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="logo">Sudharsan Nadar</div>
        <ul className="nav-links">
          {['About Me','Projects','Skills','Achievements','Publications','Experience','Contact'].map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </nav>

      {/* ── HERO SECTION ── */}
      <div className="container">

        {/* SIDEBAR */}
        <div ref={sidebarRef} className="sidebar reveal from-left">
          <OrbitWrapper />
          <h3>Frontend Developer</h3>
          <a href="/resume.pdf" target="_blank">
            <button className="resume-btn">View Resume ↗</button>
          </a>
        </div>

        {/* CONTENT */}
        <div ref={heroRef} className="content reveal from-right">
          <h1>
            <StaggerHeadline text="Hello 👋" />
          </h1>
          <p>
            This is where your main portfolio introduction will go.
            You can later write about your projects, experience,
            and what technologies you enjoy working with.
          </p>
        </div>
      </div>

      {/* ── SKILLS ── */}
      <section className="skills">
        <SectionHeader title="Skills" subtitle="Technologies I work with" />
        <div ref={skillsRef} className="skills-grid reveal-stagger">
          {skills.map(s => (
            <div key={s.label} className="skill-card">
              <span className="skill-icon">{s.icon}</span>
              {s.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="experience">
        <SectionHeader title="Experience" subtitle="My professional journey" />
        <div ref={expRef} className="timeline reveal-stagger">
          {expItems.map((item, i) => (
            <div key={i} className={`timeline-item ${item.side}`}>
              <div className="exp-card">
                <div className="exp-image">🏢</div>
                <div className="exp-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <button className="exp-btn">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="projects">
        <SectionHeader title="Projects" subtitle="Things I have built" />
        <div ref={projRef} className="projects-grid reveal-stagger">
          {[
            { n: 'Project One',   d: 'Short description about the project will go here.' },
            { n: 'Project Two',   d: 'Short description about the project will go here.' },
            { n: 'Project Three', d: 'Short description about the project will go here.' },
            { n: 'Project Four',  d: 'Short description about the project will go here.' },
            { n: 'Project Five',  d: 'Short description about the project will go here.' },
            { n: 'Project Six',   d: 'Short description about the project will go here.' },
            { n: 'Project Seven', d: 'Short description about the project will go here.' },
            { n: 'Project Eight', d: 'Short description about the project will go here.' },
            { n: 'Project Nine',  d: 'Short description about the project will go here.' },
          ].map((p, i) => (
            <div key={i} className="project-card">
              <div className="project-img">🖼️</div>
              <h3>{p.n}</h3>
              <p>{p.d}</p>
              <button>View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── PUBLICATIONS ── */}
      <section className="publications">
        <SectionHeader title="Publications" subtitle="Research & academic work" />
        <div ref={pubRef} className="publication-list reveal-stagger">
          {[
            { t: 'Research Paper Title One',   d: 'Short description about your research publication. You can mention the topic, conference, or journal where the paper was published.' },
            { t: 'Research Paper Title Two',   d: 'Description about the methodology, research domain, and what contribution you made in the research.' },
            { t: 'Research Paper Title Three', d: 'Brief explanation about the problem statement and solution proposed in the research paper.' },
          ].map((pub, i) => (
            <div key={i} className="publication-card">
              <div className="pub-image">📄</div>
              <div className="pub-content">
                <h3>{pub.t}</h3>
                <p>{pub.d}</p>
                <button>View Paper</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="achievements">
        <SectionHeader title="Achievements & Awards" subtitle="Milestones along the way" />
        <div ref={achRef} className="achievements-grid reveal-stagger">
          {[
            'Won a national level hackathon and reached the final round among multiple participating teams.',
            'Presented research work at a technical conference and received recognition for innovative problem solving.',
            'Participated in multiple technical competitions and secured top positions at inter-college events.',
          ].map((text, i) => (
            <div key={i} className="achievement-card">
              <div className="image-group">
                <img src="https://via.placeholder.com/300" alt="achievement" />
                <img src="https://via.placeholder.com/300" alt="achievement" />
                <img src="https://via.placeholder.com/300" alt="achievement" />
              </div>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact-section">
        <SectionHeader title="Contact & Feedback" subtitle="Let's connect" />
        <div ref={contactRef} className="contact-container reveal-stagger">

          <div className="contact-card">
            <h3>Contact Me</h3>
            <a href="tel:+91XXXXXXXXXX" className="contact-item">
              <span>📞</span><span>+91 XXXXX XXXXX</span>
            </a>
            <a href="mailto:example@email.com" className="contact-item">
              <span>✉️</span><span>example@email.com</span>
            </a>
            <div className="social-icons">
              <a href="https://github.com/" target="_blank" title="GitHub">⌥</a>
              <a href="https://linkedin.com/" target="_blank" title="LinkedIn">in</a>
              <a href="https://instagram.com/" target="_blank" title="Instagram">ig</a>
            </div>
          </div>

          <div className="feedback-card">
            <h3>Feedback</h3>
            <p>How would you rate this portfolio?</p>
            <div className="rating">
              {['⭐','⭐','⭐','⭐','⭐'].map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <textarea placeholder="Write your feedback here..." />
            <button>Submit Feedback</button>
          </div>

        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Sudharsan Nadar | All Rights Reserved</p>
      </footer>
    </div>
  )
}

export default App
