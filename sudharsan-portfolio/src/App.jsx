import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

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

        {/* SIDEBAR IMAGE */}
        <div className="sidebar">
          <img
            src="https://via.placeholder.com/200"
            alt="profile"
          />
          <h3>Frontend Developer</h3>
        </div>

        {/* CONTENT */}
        <div className="content">
          <h1>Hello 👋</h1>
          <p>
            I'm Sudharsan, a Computer Engineering student passionate about
            building modern web applications using React, Python, and cloud technologies.
          </p>

      
        </div>

      </div>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Sudharsan Nadar
      </footer>

    </div>
  )
}

export default App