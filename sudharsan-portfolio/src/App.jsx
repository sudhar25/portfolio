import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./App.css"
import { useEffect, useRef } from 'react'

function LeadershipCard({ tag, title, desc, date, attendees, skills, images }) {
  const [current, setCurrent] = useState(0)

  const prev = () =>
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))

  const next = () =>
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

  /* auto-play */
  useEffect(() => {
    const timer = setInterval(next, 3000)
    return () => clearInterval(timer)
  }, [current])

  return (
    <div className="leadership-card">

      {/* CAROUSEL */}
      <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="carousel-slide">
              {img
                ? <img src={img} alt={`slide ${i + 1}`} />
                : `Image ${i + 1}`
              }
            </div>
          ))}
        </div>

        {/* PREV / NEXT */}
        <button className="carousel-btn prev" onClick={prev}>‹</button>
        <button className="carousel-btn next" onClick={next}>›</button>

        {/* DOTS */}
        <div className="carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="leadership-content">
        <span className="leadership-tag">{tag}</span>
        <h3>{title}</h3>
        <p>{desc}</p>

        {/* META */}
        <div className="leadership-meta">
          <div className="leadership-meta-item">
            <span>📅</span>
            <span>{date}</span>
          </div>
          <div className="leadership-meta-item">
            <span>👥</span>
            <span>{attendees} attendees</span>
          </div>
        </div>

        {/* SKILL TAGS */}
        <div className="leadership-skills">
          {skills.map((s, i) => (
            <span key={i} className="leadership-skill">{s}</span>
          ))}
        </div>
      </div>

    </div>
  )
}

/* paste this hook at the top of App.jsx, outside the App function */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target) // animate only once
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}



function WaveText({ text }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.char').forEach((char) => {
            char.style.animationPlayState = 'running'
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <span className="wave-text" ref={ref}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char"
          style={{
            animationDelay: `${i * 0.07}s`,
            animationPlayState: 'paused',  /* paused until scrolled into view */
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
function App() {
  useScrollReveal() 
  return (
    
    <div id="about" className="page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Sudharsan Nadar</div>

        <ul className="nav-links">
  <li onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>About Me</li>
  <li onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>Projects</li>
  <li onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}>Skills</li>
  <li onClick={() => document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' })}>Achievements</li>
  <li onClick={() => document.getElementById('publications').scrollIntoView({ behavior: 'smooth' })}>Publications</li>
  <li onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}>Experience</li>
  <li onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contact</li>
  <li onClick={() => document.getElementById('leadership').scrollIntoView({ behavior: 'smooth' })}>Leadership</li>
</ul>
      </nav>

      {/* MAIN SECTION */}
      <div id="about" className="container">

        {/* SIDEBAR */}
        <div className="sidebar">
          <img src="https://via.placeholder.com/200" alt="profile"/>
          <h3>B.E. Computer Engineering</h3>
           <a href="/resume.pdf" target="_blank">
    <button className="resume-btn">View Resume</button>
  </a>
        </div>
        

  

        {/* CONTENT */}
        <div className="content">
          <h1 className="flip-text">Hello 👋</h1>
          <p>
            This is where your main portfolio introduction will go.
            You can later write about your projects, experience,
            and what technologies you enjoy working with.
          </p>

          
        </div>

      </div>

<div className="marquee-container">
  <div className="marquee-track">

    {/* CARD 1 */}
    <div className="marquee-card">
      <img src="/img1.jpg" alt="" />
      <div className="marquee-text">React Projects</div>
    </div>

    {/* CARD 2 */}
    <div className="marquee-card">
      <img src="/img2.jpg" alt="" />
      <div className="marquee-text">IoT System</div>
    </div>

    {/* CARD 3 */}
    <div className="marquee-card">
      <img src="/img3.jpg" alt="" />
      <div className="marquee-text">AI Model</div>
    </div>

    {/* CARD 4 */}
    <div className="marquee-card">
      <img src="/img4.jpg" alt="" />
      <div className="marquee-text">Web App</div>
    </div>

    {/* CARD 5 */}
    <div className="marquee-card">
      <img src="/img5.jpg" alt="" />
      <div className="marquee-text">Cloud Project</div>
    </div>

    {/* DUPLICATE (for smooth infinite loop) */}
    <div className="marquee-card">
      <img src="/img1.jpg" alt="" />
      <div className="marquee-text">React Projects</div>
    </div>

    <div className="marquee-card">
      <img src="/img2.jpg" alt="" />
      <div className="marquee-text">IoT System</div>
    </div>

  </div>
</div>
      {/* SKILLS SECTION */}
      <section id="skills" className="skills reveal from-left">
        <h2><WaveText text="Skills" /></h2>

        <div className="skills-grid">
          <div className="skill-card">React</div>
          <div className="skill-card">Python</div>
          <div className="skill-card">JavaScript</div>
          <div className="skill-card">SQL</div>
          <div className="skill-card">MongoDB</div>
          <div className="skill-card">Cloud</div>
        </div>
      </section>
      <section id="experience" className="experience reveal">  

<h2><WaveText text="Experience" /></h2>
<div className="timeline">

  {/* CARD 1 */}
  <div className="timeline-item left">
    <div className="exp-card">
      <div className="exp-image">Image</div>

      <div className="exp-content">
        <h3>Frontend Internship</h3>
        <p>
          Worked on building responsive UI using React and modern
          web technologies. Contributed to real-world projects.
        </p>

        <button className="exp-btn">View Details</button>
      </div>
    </div>
  </div>

  {/* CARD 2 */}
  <div className="timeline-item right">
    <div className="exp-card ">
      <div className="exp-image">Image</div>

      <div className="exp-content">
        <h3>Backend Internship</h3>
        <p>
          Developed APIs and worked with databases while learning
          scalable backend architecture.
        </p>

        <button className="exp-btn">View Details</button>
      </div>
    </div>
  </div>

  {/* CARD 3 */}
  <div className="timeline-item left">
    <div className="exp-card ">
      <div className="exp-image">Image</div>

      <div className="exp-content">
        <h3>Cloud Internship</h3>
        <p>
          Worked with cloud services and deployment pipelines while
          learning infrastructure management.
        </p>

        <button className="exp-btn">View Details</button>
      </div>
    </div>
  </div>

  {/* CARD 4 */}
  <div className="timeline-item right">
    <div className="exp-card ">
      <div className="exp-image">Image</div>

      <div className="exp-content">
        <h3>Research Internship</h3>
        <p>
          Conducted research on machine learning models and published
          findings in a conference paper.
        </p>

        <button className="exp-btn">View Details</button>
      </div>
    </div>
  </div>

</div>

</section>
<section id="projects" className="projects reveal from-left"> 

<h2><WaveText text="Projects" /></h2>

<div className="projects-grid">

{/* PROJECT 1 */}
<div className="project-card">
<div className="project-img">Image</div>
<h3>Project One</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

{/* PROJECT 2 */}
<div className="project-card">
<div className="project-img">Image</div>
<h3>Project Two</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

{/* PROJECT 3 */}
<div className="project-card ">
<div className="project-img">Image</div>
<h3>Project Three</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

{/* PROJECT 4 */}
<div className="project-card ">
<div className="project-img">Image</div>
<h3>Project Four</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

{/* PROJECT 5 */}
<div className="project-card">
<div className="project-img">Image</div>
<h3>Project Five</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

{/* PROJECT 6 */}
<div className="project-card ">
<div className="project-img">Image</div>
<h3>Project Six</h3>
<p>Short description about the project will go here.
  hello
  how is thias
  help to modify thi
  testing for length
  of the box 
  give feedback on this
</p>
<button>View Details</button>
</div>

{/* PROJECT 7 */}
<div className="project-card">
<div className="project-img">Image</div>
<h3>Project Seven</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

{/* PROJECT 8 */}
<div className="project-card">
<div className="project-img">Image</div>
<h3>Project Eight</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

{/* PROJECT 9 */}
<div className="project-card ">
<div className="project-img">Image</div>
<h3>Project Nine</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

</div>

</section>
<section id="publications" className="publications reveal">            {/* ← right */}

<h2><WaveText text="Publications" /></h2>

<div className="publication-list">

{/* PUBLICATION 1 */}
<div className="publication-card ">
<div className="pub-image">Image</div>

<div className="pub-content">
<h3>Research Paper Title</h3>
<p>
Short description about your research publication. 
You can mention the topic, conference, or journal where 
the paper was published.
</p>

<button>View Paper</button>
</div>

</div>


{/* PUBLICATION 2 */}
<div className="publication-card ">

<div className="pub-image">Image</div>

<div className="pub-content">
<h3>Research Paper Title</h3>
<p>
Description about the methodology, research domain,
and what contribution you made in the research.
</p>

<button>View Paper</button>
</div>

</div>


{/* PUBLICATION 3 */}
<div className="publication-card ">

<div className="pub-image">Image</div>

<div className="pub-content">
<h3>Research Paper Title</h3>
<p>
Brief explanation about the problem statement and 
solution proposed in the research paper.
</p>

<button>View Paper</button>
</div>

</div>

</div>

</section>
<section id="achievements" className="achievements reveal from-left"> 

<h2><WaveText text="Achievements" /></h2>

<div className="achievements-grid">

{/* CARD 1 */}
<div className="achievement-card ">

<div className="image-group">
<img src="https://via.placeholder.com/300" />
<img src="https://via.placeholder.com/300" />
<img src="https://via.placeholder.com/300" />
</div>

<p>
Won a national level hackathon and reached the final round
among multiple participating teams.
</p>

</div>


{/* CARD 2 */}
<div className="achievement-card ">

<div className="image-group">
<img src="https://via.placeholder.com/300" />
<img src="https://via.placeholder.com/300" />
<img src="https://via.placeholder.com/300" />
</div>

<p>
Presented research work at a technical conference and received
recognition for innovative problem solving.
</p>

</div>


{/* CARD 3 */}
<div className="achievement-card ">

<div className="image-group">
<img src="https://via.placeholder.com/300" />
<img src="https://via.placeholder.com/300" />
<img src="https://via.placeholder.com/300" />
</div>

<p>
Participated in multiple technical competitions and secured
top positions at inter-college events.
</p>

</div>

</div>

</section>

{/* LEADERSHIP SECTION */}
<section id="leadership" className="leadership reveal from-left">
  <h2><WaveText text="Leadership & Events" /></h2>
  <p className="section-subtitle" style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '0' }}>
    Events I have organised and led
  </p>

  <div className="leadership-grid">

    <LeadershipCard
      tag="Event Organiser"
      title="National Tech Symposium 2024"
      desc="Led a team of 20 volunteers to organise a national-level tech symposium with speakers, workshops, and panel discussions across two days."
      date="March 2024"
      attendees="500+"
      skills={['Team Leadership', 'Event Planning', 'Public Speaking']}
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="Club Lead"
      title="Hackathon — HackFest 2024"
      desc="Organised and mentored participants in a 24-hour hackathon. Handled logistics, judging panel coordination and sponsor communication."
      date="August 2024"
      attendees="200+"
      skills={['Coordination', 'Mentoring', 'Problem Solving']}
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    

  </div>
</section>

<section id="contact" className="contact-section reveal">

<h2><WaveText text="Contact" /></h2>

<div className="contact-container">

{/* CONTACT CARD */}

<div className="contact-card">
  <h3>Contact Me</h3>

  {/* Phone */}
  <a href="tel:+91XXXXXXXXXX" className="contact-item">
    <div className="contact-item-icon">📞</div>
    <div className="contact-item-text">
      <span className="contact-item-label">Phone</span>
      <span className="contact-item-value">+91 XXXXX XXXXX</span>
    </div>
  </a>

  {/* Email */}
  <a href="mailto:example@email.com" className="contact-item">
    <div className="contact-item-icon">✉️</div>
    <div className="contact-item-text">
      <span className="contact-item-label">Email</span>
      <span className="contact-item-value">example@email.com</span>
    </div>
  </a>

  {/* Social Icons */}
  <div className="social-icons">
    <a href="https://github.com/" target="_blank" className="github"
       title="GitHub">
      <i className="fab fa-github"></i>
    </a>
    <a href="https://linkedin.com/" target="_blank" className="linkedin"
       title="LinkedIn">
      <i className="fab fa-linkedin"></i>
    </a>
    <a href="https://instagram.com/" target="_blank" className="instagram"
       title="Instagram">
      <i className="fab fa-instagram"></i>
    </a>
  </div>


</div>

{/* FEEDBACK CARD */}

<div className="feedback-card ">

<h3>Feedback</h3>

<p>How would you rate this portfolio?</p>

<div className="rating">

<span>⭐</span>
<span>⭐</span>
<span>⭐</span>
<span>⭐</span>
<span>⭐</span>

</div>

<textarea placeholder="Write your feedback here..."></textarea>

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

