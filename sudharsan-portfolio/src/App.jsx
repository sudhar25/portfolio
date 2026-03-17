import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./App.css"
// ORBIT COMPONENT
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

function App() {
  return (
    
    <div className="page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Sudharsan Nadar</div>

        <ul className="nav-links">
          <li>About Me</li>
          <li>Projects</li>
          <li>Skills</li>
          <li>Achievements</li>
          <li>Publications</li>
          <li>Experience</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* MAIN SECTION */}
      <div className="container">

        {/* SIDEBAR */}
        <div className="sidebar">
          <OrbitWrapper />
          <img src="https://via.placeholder.com/200" alt="profile"/>
          <h3>Frontend Developer</h3>
           <a href="/resume.pdf" target="_blank">
    <button className="resume-btn">View Resume</button>
  </a>
        </div>
        

  

        {/* CONTENT */}
        <div className="content">
          <h1>Hello 👋</h1>
          <p>
            This is where your main portfolio introduction will go.
            You can later write about your projects, experience,
            and what technologies you enjoy working with.
          </p>

          
        </div>

      </div>

      {/* SKILLS SECTION */}
      <section className="skills reveal">
        <h2 className="stagger-text">Skills</h2>

        <div className="skills-grid">
          <div className="skill-card">React</div>
          <div className="skill-card">Python</div>
          <div className="skill-card">JavaScript</div>
          <div className="skill-card">SQL</div>
          <div className="skill-card">MongoDB</div>
          <div className="skill-card">Cloud</div>
        </div>
      </section>
      <section className="experience reveal">

<h2>Experience</h2>

<div className="timeline">

  {/* CARD 1 */}
  <div className="timeline-item left">
    <div className="exp-card reveal">
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
    <div className="exp-card reveal">
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
    <div className="exp-card reveal">
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
    <div className="exp-card reveal">
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
<section className="projects reveal">

<h2>Projects</h2>

<div className="projects-grid">

{/* PROJECT 1 */}
<div className="project-card reveal">
<div className="project-img">Image</div>
<h3>Project One</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

{/* PROJECT 2 */}
<div className="project-card reveal">
<div className="project-img">Image</div>
<h3>Project Two</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

{/* PROJECT 3 */}
<div className="project-card reveal">
<div className="project-img">Image</div>
<h3>Project Three</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

{/* PROJECT 4 */}
<div className="project-card reveal">
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
<div className="project-card reveal">
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
<div className="project-card reveal">
<div className="project-img">Image</div>
<h3>Project Seven</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

{/* PROJECT 8 */}
<div className="project-card reveal">
<div className="project-img">Image</div>
<h3>Project Eight</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

{/* PROJECT 9 */}
<div className="project-card reveal">
<div className="project-img">Image</div>
<h3>Project Nine</h3>
<p>Short description about the project will go here.</p>
<button>View Details</button>
</div>

</div>

</section>
<section className="publications reveal">

<h2>Publications</h2>

<div className="publication-list">

{/* PUBLICATION 1 */}
<div className="publication-card reveal">
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
<div className="publication-card reveal">

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
<div className="publication-card reveal">

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
<section className="achievements reveal">

<h2>Achievements & Awards</h2>

<div className="achievements-grid">

{/* CARD 1 */}
<div className="achievement-card reveal">

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
<div className="achievement-card reveal">

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
<div className="achievement-card reveal">

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
<section className="contact-section reveal">

<h2>Contact & Feedback</h2>

<div className="contact-container">

{/* CONTACT CARD */}

<div className="contact-card reveal">

<h3>Contact Me</h3>

{/* Image */}
<div className="contact-image">
<img src="/contact-image.png" alt="contact"/>
</div>

{/* Mobile */}
<a href="tel:+91XXXXXXXXXX" className="contact-item">
<i className="fas fa-phone"></i>
<span>+91 XXXXX XXXXX</span>
</a>

{/* Email */}
<a href="mailto:example@email.com" className="contact-item">
<i className="fas fa-envelope"></i>
<span>example@email.com</span>
</a>

{/* Social Icons */}
<div className="social-icons">

<a href="https://github.com/" target="_blank">
<i className="fab fa-github"></i>
</a>

<a href="https://linkedin.com/" target="_blank">
<i className="fab fa-linkedin"></i>
</a>

<a href="https://instagram.com/" target="_blank">
<i className="fab fa-instagram"></i>
</a>

</div>

</div>

{/* FEEDBACK CARD */}

<div className="feedback-card reveal">

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