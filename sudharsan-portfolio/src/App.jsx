import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./App.css"

function App() {
  return (
    <div className="page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Sudharsan Nadar</div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Projects</li>
          <li>Skills</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* MAIN SECTION */}
      <div className="container">

        {/* SIDEBAR */}
        <div className="sidebar">
          <img src="https://via.placeholder.com/200" alt="profile"/>
          <h3>Frontend Developer</h3>
        </div>

        {/* CONTENT */}
        <div className="content">
          <h1>Hello 👋</h1>
          <p>
            This is where your main portfolio introduction will go.
            You can later write about your projects, experience,
            and what technologies you enjoy working with.
          </p>

          <button className="btn">View Projects</button>
        </div>

      </div>

      {/* SKILLS SECTION */}
      <section className="skills">
        <h2>Skills</h2>

        <div className="skills-grid">
          <div className="skill-card">React</div>
          <div className="skill-card">Python</div>
          <div className="skill-card">JavaScript</div>
          <div className="skill-card">SQL</div>
          <div className="skill-card">MongoDB</div>
          <div className="skill-card">Cloud</div>
        </div>
      </section>

    </div>
  )
}

export default App