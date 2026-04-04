import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./App.css"
import { useEffect, useRef } from 'react'


function PubCard({ images, title, desc, link }) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="publication-card">

      {/* CAROUSEL */}
      <div className="pub-carousel">
        <div
          className="pub-carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="pub-carousel-slide">
              <img src={img} alt={`slide ${i + 1}`} />
            </div>
          ))}
        </div>

        <button
          className="pub-car-btn prev"
          onClick={() => setCurrent(c => c === 0 ? images.length - 1 : c - 1)}
        >‹</button>
        <button
          className="pub-car-btn next"
          onClick={() => setCurrent(c => c === images.length - 1 ? 0 : c + 1)}
        >›</button>

        <div className="pub-car-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`pub-car-dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="pub-content">
        <h3>{title}</h3>
        <p>{desc}</p>
        <a href={link || '#'} target="_blank" rel="noreferrer">
          <button>View Paper ↗</button>
        </a>
      </div>

    </div>
  )
}


function ExpCard({ images, title, desc, side, link }) {
  const [current, setCurrent] = useState(0)
  const currentRef = useRef(0)

  useEffect(() => {
    const timer = setInterval(() => {
      const next = currentRef.current === images.length - 1 ? 0 : currentRef.current + 1
      currentRef.current = next
      setCurrent(next)
    }, 3000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className={`timeline-item ${side}`}>
      <div className="exp-card">
        <div className="exp-image-carousel">
          <div
            className="exp-carousel-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={i} className="exp-carousel-slide">
                <img src={img} alt={`slide ${i + 1}`} />
              </div>
            ))}
          </div>
          <button
            className="exp-car-btn prev"
            onClick={() => {
              const p = currentRef.current === 0 ? images.length - 1 : currentRef.current - 1
              currentRef.current = p
              setCurrent(p)
            }}
          >‹</button>
          <button
            className="exp-car-btn next"
            onClick={() => {
              const n = currentRef.current === images.length - 1 ? 0 : currentRef.current + 1
              currentRef.current = n
              setCurrent(n)
            }}
          >›</button>
          <div className="exp-car-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`exp-car-dot ${i === current ? 'active' : ''}`}
                onClick={() => { currentRef.current = i; setCurrent(i) }}
              />
            ))}
          </div>
        </div>

        <div className="exp-content">
          <h3>{title}</h3>

          {/* DESCRIPTION — renders bullet points cleanly */}
          <div className="exp-desc">
            {desc.split('\n').filter(line => line.trim() !== '').map((line, i) => (
              <p key={i} className={line.trim().startsWith('•') ? 'exp-bullet' : 'exp-company'}>
                {line.trim()}
              </p>
            ))}
          </div>

          {/* BUTTON WITH LINK */}
          <a href={link || '#'} target="_blank" rel="noreferrer">
            <button className="exp-btn">View Certificate ↗</button>
          </a>
        </div>

      </div>
    </div>
  )
}
function MarqueeCard({ item }) {
  const [current, setCurrent] = useState(0)

  const prev = (e) => {
    e.stopPropagation()
    setCurrent((c) => (c === 0 ? item.images.length - 1 : c - 1))
  }

  const next = (e) => {
    e.stopPropagation()
    setCurrent((c) => (c === item.images.length - 1 ? 0 : c + 1))
  }

  return (
    <div className="leadership-marquee-card">

      {/* CAROUSEL */}
      <div className="marquee-card-carousel">
        <div
          className="marquee-card-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {item.images.map((img, i) => (
            <div key={i} className="marquee-card-slide">
              <img src={img} alt={`slide ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* PREV / NEXT */}
        <button className="mq-btn prev" onClick={prev}>‹</button>
        <button className="mq-btn next" onClick={next}>›</button>

        {/* DOTS */}
        <div className="mq-dots">
          {item.images.map((_, i) => (
            <span
              key={i}
              className={`mq-dot ${i === current ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
            />
          ))}
        </div>
      </div>

      {/* TEXT */}
      <div className="marquee-card-content">
        <span className="leadership-tag">{item.tag}</span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        
      </div>

    </div>
  )
}

function LeadershipCard({ tag, title, desc, skills, images, link }) {
  const [current, setCurrent] = useState(0)

  const prev = () =>
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))

  const next = () =>
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

  useEffect(() => {
  const timer = setInterval(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
  }, 3000)
}, [images.length])

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
                : `Image ${i + 1}`}
            </div>
          ))}
        </div>

        <button className="carousel-btn prev" onClick={prev}>‹</button>
        <button className="carousel-btn next" onClick={next}>›</button>

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

        {tag && <span className="leadership-tag">{tag}</span>}

        <h3>{title}</h3>
        <p>{desc}</p>

        {skills && skills.length > 0 && (
          <div className="leadership-skills">
            {skills.map((s, i) => (
              <span key={i} className="leadership-skill">{s}</span>
            ))}
          </div>
        )}

        <a href={link || '#'} target="_blank" rel="noreferrer">
          <button className="leadership-view-btn">
            View Details ↗
          </button>
        </a>

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
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    
    <div id="about" className="page">

      {/* NAVBAR */}
      {/* NAVBAR */}
<nav className="navbar">
  <div className="logo">Sudharsan Nadar</div>

  {/* HAMBURGER */}
  <div
    className={`hamburger ${menuOpen ? 'open' : ''}`}
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <span></span>
    <span></span>
    <span></span>
  </div>

  <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
    <li onClick={() => { document.getElementById('about').scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>About Me</li>
    <li onClick={() => { document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>Projects</li>
    <li onClick={() => { document.getElementById('skills').scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>Skills</li>
    <li onClick={() => { document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>Achievements</li>
    <li onClick={() => { document.getElementById('publications').scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>Publications</li>
    <li onClick={() => { document.getElementById('experience').scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>Experience</li>
    <li onClick={() => { document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>Contact</li>
    <li onClick={() => { document.getElementById('leadership').scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>Blog</li>
  </ul>
</nav>
      {/* MAIN SECTION */}
      <div id="about" className="container">

        {/* SIDEBAR */}
        <div className="sidebar">
          <img src="/me.JPG" alt="profile"/>
          <h3>Sudharsan Nadar - B.E. Computer Engineering</h3>
           <a href="/resume.pdf" target="_blank">
    <button className="resume-btn">View Resume</button>
  </a>
        </div>
        

  

        {/* CONTENT */}
        <div className="content">
          <h1 className="flip-text">Hello 👋</h1>
          <p>
            Software Engineer skilled in building reliable, scalable applications across 
            frontend and backend environments. Proficient in Python, PHP, JavaScript, React, SQL, and cloud technologies, with experience 
            designing secure architectures, developing APIs, and optimizing system performance. Adept at improving workflow efficiency
            by up to 60% through automation and clean code practices. Strong in problem-solving, collaborative development, and delivering 
            features end-to-end within agile teams.
          </p>

          
        </div>

      </div>


{/* LEADERSHIP */}
<section id="leadership" className="leadership reveal from-left">
  <h2><WaveText text="Leadership & Events" /></h2>
  <p className="section-subtitle" style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '40px' }}>
    Events I have organised and led
  </p>

  <div className="leadership-marquee-wrapper">
    <div className="leadership-marquee-track">

      {[
        {
          tag: 'Ideathon',
          title: 'Idea presentation competition',
          desc: 'Participated and presented our innovative idea on a AIML based project"',
         
          images: [
            'certificates/ideathon.png',
            
          ],
        },
        {
          tag: 'Sr.Logistics Coordinator',
          title: 'CSI-SIES GST',
          desc: 'Organised and mentored participants in a 24-hour hackathon. Handled logistics and sponsor communication.',
          
          images: [
            'certificates/CSI Certificate.png',
            'about/csi.jpg',
            
          ],
        },
        {
          tag: 'ELEVATE 2025',
          title: 'Participated',
          desc: 'ELEVETE 2025 was event where after clearing Aptitude, GD, Technical rounds got an Internship.',
          
          images: [
            'about/elevate.jpg',
            'https://via.placeholder.com/300x160',
          ],
        },
        {
          tag: 'TEXTURE 2026',
          title: 'National Level Paper Presentation',
          desc: 'Participated in the national level paper presentation event, presenting research on Deep Learning framework for Satellite Images.',
          
          images: [
            'about/texture1.jpg',
            'about/texture2.jpg',
            'certificates/texture image.png',
            'about/texture3.jpg',
          ],
        },
        /* DUPLICATES for infinite loop */
        {
          tag: 'Cognition 2025',
          title: 'Project Presentation Competition',
          desc: 'Presented our team project Society Administration Platform Which got a great appreciation from the judges and won the 1st place in the competition.',
          
          images: [
            'about/cognition1.jpg',
            'about/cognition2.jpg',
            'about/cognition3.jpg',
            'certificates/cognition.png',
          ],
        },
        {
          tag: 'Innovatiions 2026',
          title: 'Project presentation competition',
          desc: '',
          
          images: [
            'about/innovation1.jpg',
            'about/innovation2.jpg',
            'certificates/innovation.png',
          ],
        },
        {
          tag: 'Event Organiser',
          title: 'Tech Talk Series 2024',
          desc: 'Coordinated a monthly tech talk series inviting industry professionals to speak to students.',
          
          images: [
            'https://via.placeholder.com/300x160',
            'https://via.placeholder.com/300x160',
          ],
        },
        {
          tag: 'Club Lead',
          title: 'Open Source Drive 2023',
          desc: 'Led an open source contribution drive encouraging students to contribute to GitHub projects.',
          
          images: [
            'https://via.placeholder.com/300x160',
            'https://via.placeholder.com/300x160',
          ],
        },
      ].map((item, i) => (
        <MarqueeCard key={i} item={item} />
      ))}

    </div>
  </div>
</section>



      {/* SKILLS SECTION */}
      <section id="skills" className="skills reveal from-left">
        <h2><WaveText text="Skills" /></h2>

        <div className="skills-grid">
          <div className="skill-card">python</div>
          <div className="skill-card">MySQL</div>
          <div className="skill-card">PostgreSQL</div>
          <div className="skill-card">AWS Cloud</div>
          <div className="skill-card">PHP</div>
          <div className="skill-card">PHPMyAdmin</div>
          <div className="skill-card">Machine Learning</div>
          <div className="skill-card">NLP</div>
          <div className="skill-card">React</div>
          <div className="skill-card">REST API</div>
          <div className="skill-card">Git</div>
          <div className="skill-card">Github</div>
          <div className="skill-card">Flutter</div>
          <div className="skill-card">Android Development</div>
          <div className="skill-card">JSON</div>

        </div>
      </section>


      
 
     <section id="experience" className="experience reveal">
  <h2><WaveText text="Experience" /></h2>

  <div className="timeline">

    <ExpCard
  side="left"
  title="WEB DEVELOPER"
  link="https://www.linkedin.com/posts/sudharsan-nadar-645145313_internshipcompleted-easygolife-chsmitraproject-ugcPost-7334814738842877952-i3rj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE-TpVUBa0s91Ghx7Mxq8gqSaUWTgnfTBUI"
  desc="EasyGoLife Pvt. Ltd
 Key Skills: PHP, SQL, Front-End Development, HTML, CSS, Bootstrap
 Led a team of three interns to build a full-stack society management platform.
 Contributed to frontend design, backend logic using PHP, and database structuring with MySQL.
 Managed task allocation, ensured timely delivery, and integrated key modules including complaints, maintenance, visitor approvals, and member management."
  images={['/easygolife_certificate.png']}
/>

    <ExpCard
      side="right"
      title="Software Engineer Intern"
      link="https://your-certificate-link.com"
      desc="Developed APIs and worked with databases while learning scalable backend architecture."
      images={['', '/easygolife_certificate.png']}
    />

    <ExpCard
      side="left"
      title="Cloud Internship"
      link="https://your-certificate-link.com"
      desc="Worked with cloud services and deployment pipelines while learning infrastructure management."
      images={['experience/IFuture.JPG']}
    />

    <ExpCard
      side="right"
      title="WEB DEVELOPER"
      link="https://your-certificate-link.com"
      desc="Conducted research on machine learning models and published findings in a conference paper."
      images={['experience/sdp.png']}
    />

  </div>
</section>





<section id="projects" className="projects reveal from-left">
  <h2><WaveText text="Projects" /></h2>

  <div className="projects-grid">

    <LeadershipCard
      tag="Web App"
      title="Project One"
      desc="Short description about the project will go here."
      date="Jan 2024"
      attendees="Solo"
      skills={['React', 'Node.js']}
      link="https://github.com/your-project-link"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="Full Stack"
      title="Project Two"
      desc="Short description about the project will go here."
      date="Feb 2024"
      attendees="Team of 3"
      skills={['Python', 'MongoDB']}
      link="https://github.com/your-project-link"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="Frontend"
      title="Project Three"
      desc="Short description about the project will go here."
      date="Mar 2024"
      attendees="Solo"
      skills={['React', 'Tailwind']}
      link="https://github.com/your-project-link"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="Backend"
      title="Project Four"
      desc="Short description about the project will go here."
      date="Apr 2024"
      attendees="Team of 2"
      skills={['Node.js', 'SQL']}
      link="https://github.com/your-project-link"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="ML"
      title="Project Five"
      desc="Short description about the project will go here."
      date="May 2024"
      attendees="Solo"
      skills={['Python', 'TensorFlow']}
      link="https://github.com/your-project-link"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="Cloud"
      title="Project Six"
      desc="Short description about the project will go here."
      date="Jun 2024"
      attendees="Team of 4"
      skills={['AWS', 'Docker']}
      link="https://github.com/your-project-link"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="Mobile"
      title="Project Seven"
      desc="Short description about the project will go here."
      date="Jul 2024"
      attendees="Solo"
      skills={['React Native']}
      link="https://github.com/your-project-link"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="API"
      title="Project Eight"
      desc="Short description about the project will go here."
      date="Aug 2024"
      attendees="Team of 2"
      skills={['Express', 'REST']}
      link="https://github.com/your-project-link"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="Open Source"
      title="Project Nine"
      desc="Short description about the project will go here."
      date="Sep 2024"
      attendees="Solo"
      skills={['JavaScript', 'GitHub']}
      link="https://github.com/your-project-link"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

  </div>
</section>



<section id="publications" className="publications reveal">
  <h2><WaveText text="Publications" /></h2>

  <div className="publication-list">

    <PubCard
      title="Research Paper Title One"
      desc="Short description about your research publication. You can mention the topic, conference, or journal where the paper was published."
      link="#"
      images={[
        '/certificates/IEEE_paper.png',
        
      ]}
    />

    <PubCard
      title="Research Paper Title Two"
      desc="Description about the methodology, research domain, and what contribution you made in the research."
      link="#"
      images={[
        '/certificates/journal.png',
      ]}
    />

    <PubCard
      title="Research Paper Title Three"
      desc="Brief explanation about the problem statement and solution proposed in the research paper."
      link="#"
      images={[
        '/easygolife_certificate.png',
        '/easygolife_certificate.png',
      ]}
    />

  </div>
</section>



<section id="achievements" className="achievements reveal from-left"> 

<h2><WaveText text="Achievements" /></h2>

<div className="achievements-grid">

{/* CARD 1 */}
<div className="achievement-card ">

<div className="image-group">
<img src="certificates/hackathon.jpg" />
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
<img src="certificates/Avishkar1.jpeg" />
<img src="certificates/Avishkar2.png" />
<img src="about/avishkar1.jpg"/>

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

