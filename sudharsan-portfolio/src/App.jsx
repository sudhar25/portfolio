import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./App.css"
import { useEffect, useRef } from 'react'



function ReadMore({ text, maxLines = 3 }) {
  const [expanded, setExpanded] = useState(false)
  const lines = text.split('\n').map(l => l.trim()).filter(l => l !== '')
  const preview = lines.slice(0, maxLines)
  const rest = lines.slice(maxLines)
  return (
    <div className="readmore-wrapper">
      {preview.map((line, i) => (
        <p key={i} className={line.startsWith('•') ? 'desc-bullet' : 'desc-text'}>{line}</p>
      ))}
      {expanded && rest.map((line, i) => (
        <p key={i} className={line.startsWith('•') ? 'desc-bullet' : 'desc-text'}>{line}</p>
      ))}
      {rest.length > 0 && (
        <button className="readmore-btn" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}>
          {expanded ? '▲ Read Less' : '▼ Read More'}
        </button>
      )}
    </div>
  )
}

function VisitorCount() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    /* get existing count from localStorage */
    const stored = parseInt(localStorage.getItem('portfolioViews') || '0')
    /* increment on each visit */
    const newCount = stored + 1
    localStorage.setItem('portfolioViews', newCount)
    /* animate count up */
    let start = 0
    const end = newCount
    const duration = 1500
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [])

  return <span>{count.toLocaleString()}</span>
}

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
        <ReadMore text={desc} maxLines={1} />

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
  const [formSent,  setFormSent]  = useState(false)
  return (
  
    <div className="page">

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
  <div className="social-icons">
    <a href="https://github.com/sudhar25" target="_blank" className="github"
       title="GitHub">
      <i className="fab fa-github"></i>
    </a>
    <a href="https://www.linkedin.com/in/sudharsan-nadar-645145313/" target="_blank" className="linkedin"
       title="LinkedIn">
      <i className="fab fa-linkedin"></i>
    </a>
    <a href="https://www.instagram.com/me_sudhar_?igsh=MTRqcHRrbzc2MDY5bQ==" target="_blank" className="instagram"
       title="Instagram">
      <i className="fab fa-instagram"></i>
    </a>
  </div>
        </div>
        

  

        {/* CONTENT */}
        <div className="content">
          <h1 className="flip-text">Hello 👋</h1>
          <p>
            I'm Sudharsan Nadar, a final-year Computer Engineering student from Mumbai with a deep interest in artificial intelligence, data systems, and building things that actually 
            work in the real world. I gravitate toward problems that sit at the intersection of engineering and intelligence  where clean code meets meaningful output  whether 
            that's training a deep learning model, designing a data pipeline, or architecting a backend that handles real user load.<br></br>
<br></br>I'm someone who learns best by building. Most of what I know came from picking a problem, figuring out what I didn't know, and working through 
it  from publishing ML research at IEEE to shipping full-stack products used by real users. I care deeply about the quality and thoughtfulness
behind what I create, not just whether it runs.<br></br> 
<br></br>Outside of tech, I enjoy taking on responsibility I've led logistics for large technical events, coordinated teams across internships, and 
represented my college at research competitions. I'm currently looking for opportunities in ML engineering, data analytics, agentic AI, or Python development 
where I can keep growing, contribute meaningfully from day one, and work alongside people who care about what they're building as much as I do.
          </p>

          
        </div>

      </div>
      
    

{/* LEADERSHIP */}
<section id="leadership" className="leadership reveal from-left">
  <h2><WaveText text="Events, Leadership and Participations" /></h2>
  <p className="section-subtitle" style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '40px' }}>
    Events I have organised, led and participated in during my college days. This includes hackathons, workshops, paper presentations and more.
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
          desc: 'Managed logistics for technical events, workshops, and seminars. Handled vendor coordination, resource planning, and on-ground operations to ensure smooth execution and successful student-led initiatives',
          
          images: [
            'certificates/CSI Certificate.png',
            'about/csi.jpg',
            
          ],
        },
        {
          tag: 'ELEVATE 2025',
          title: 'Participated',
          desc: 'Participated in ELEVETE 2025 event where after clearing Aptitude, GD, Technical rounds got an Internship.',
          
          images: [
            'about/elevate.jpg',
            'https://via.placeholder.com/300x160',
          ],
        },

        {
          tag: 'Avishkar 2025',
          title: 'Represented SIES GST at Avishkar Project presentation',
          desc: 'Presented our research project on a Deep Learning framework for Satellite Image Analysis at the prestigious Avishkar Research Convention, representing SIES GST and competing against top research projects from universities across Maharashtra.',
          
          images: [
            'about/avishkar4.png',
            'about/avishkar2.jpg',
            'certificates/Avishkar1.jpeg',
            'about/avishkar3.jpg',
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
          desc: 'Presented our team project Society Administration Platform Which got a great appreciation from the judges in the competition.',
          
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
          desc: 'Participated in Innovation of CSI SIES GST a project presentation competition and got a valuable appreciation from the judges for the innovative idea of the project',
          
          images: [
            'about/innovation1.jpg',
            'about/innovation2.jpg',
            'certificates/innovation.png',
          ],
        },
        {
          tag: 'Hackathon',
          title: 'AR/VR Hackathon',
          desc: 'Participated in a 24-hour AR/VR hackathon where we developed an immersive virtual reality experience using Lens Studio and secured 3rd place among 50+ teams.',
          
          images: [
            'https://via.placeholder.com/300x160',
            'certificates/hackathon.jpg',
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
          <div className="skill-card">Data Processing</div>
          <div className="skill-card">Database Optimization</div>
          <div className="skill-card">Data visualization</div>
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
          <div className="skill-card">JWT</div>
          <div className="skill-card">Session Management</div>
          <div className="skill-card">Deep Learning</div>

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
  images={['experience/easygolife_certificate.png']}
/>

    <ExpCard
      side="right"
      title="Software Engineer Intern"
      link="https://your-certificate-link.com"
      desc="•	Key Skills: PHP, JSON, Front-End Development, XAMPP, PhpMyAdmin
•	Developed an intelligent FAQ chatbot for the college admission portal using PHP with similarity and Levenshtein-based matching.
•	Built a mobile-responsive interface and integrated it seamlessly into the website footer.
•	Improved user experience by delivering accurate, instant, link-supported responses for admission-related queries.
"
      images={['', '/easygolife_certificate.png']}
    />

    <ExpCard
      side="left"
      title="Cloud Internship"
      link="https://www.linkedin.com/posts/sudharsan-nadar-645145313_internshipexperience-cloudcomputing-microsoftservers-share-7287818201445384192-wFMb?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE-TpVUBa0s91Ghx7Mxq8gqSaUWTgnfTBUI"
      desc="●	Key Skills: Cloud Computing, Microsoft Server Management
●	Completed a cloud-focused internship centered on Microsoft Server Management and private cloud environments.
●	Gained hands-on experience in managing cloud infrastructure, configuring servers, and deploying offline applications. 
●	Recognized for strong problem-solving, consistency, and professional discipline.
"
      images={['experience/IFuture.JPG']}
    />

    {/* <ExpCard
      side="right"
      title="WEB DEVELOPER"
      link="https://your-certificate-link.com"
      desc="Conducted research on machine learning models and published findings in a conference paper."
      images={['experience/sdp.png']}
    />*/}

  </div>
</section>





<section id="projects" className="projects reveal from-left">
  <h2><WaveText text="Projects" /></h2>
    <div className="projects-scroll-wrapper">
    <div className="projects-scroll-track">
  
    <LeadershipCard
      tag="AIML Deep Learning"
      title=" Cropsure: A Deep Learning Framework for Crop Damage Assessment and Agricultural
Insurance Support"
      desc="Developed an intelligent system that uses satellite imagery (Sentinel-1, Sentinel-2, Landsat-8) and deep learning (NASNet + Vision
Transformer) to detect crop damage and automate insurance claim verification. Implemented a TypeScript-based web platform with a
Python backend that integrates Google Earth Engine for satellite data processing, NDVI/SAR feature extraction, disaster detection, and
automated compensation estimation. The system enables farmers to submit claims digitally and supports scalable, data-driven
agricultural insurance assessment."
      date=""
      attendees="Team of 4"
      skills={['Python', 'Deep Learning', 'Postgre SQL', 'Typscript', 'AIML', 'Data Processing', 'FinTech', 'NAS-Net', 'VIT']}
      link="https://github.com/arasu30/greenfield-shield"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="Web App"
      title="CHSMitra - Society Management Platform"
      
      desc="•	Engineered a full-stack society management and maintenance billing platform, streamlining resident operations by automating 50–60% of manual workflows across billing, complaints, visitor approvals, and member records.
•	Implemented secure billing logic with automated invoice generation and Razorpay payment integration, reducing payment delays and enabling real-time transaction verification with low-latency callbacks.
•	Optimized MySQL queries and database schema, improving data retrieval speeds by ~35% and enhancing stability for multi-module access.
•	Developed modular PHP backend components for CRUD operations, role-based access, and session-secured actions, increasing maintainability and reducing code redundancy.
•	Designed responsive UI flows using HTML, CSS, Bootstrap, and JavaScript, improving user interaction smoothness and mobile compatibility.
."
      date=""
      attendees="Team of 3"
      skills={['PHP', 'SQL', 'Bootstrap', 'Razorpay API', 'MySQL Optimization', 'Responsive Design', 'Session Management',]}
      link="https://github.com/sudhar25/Chsmitra"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="AI"
      title="Aura Voice: Automatic Pronunciation Error Detector"
      desc=" Developed an AI-based pronunciation evaluation system that analyzes user speech, compares it with correct phoneme patterns, and provides 
real-time corrective feedback for English learning. 
 Implemented speech preprocessing and feature extraction using Librosa, SoundFile, NumPy, and SciPy, enabling accurate detection of pitch, 
MFCCs, and acoustic deviations. Processed audio inputs with SpeechRecognition. 
 Used NLTK and Levenshtein distance algorithms to perform string similarity, phonetic comparison, and error scoring for mispronounced 
words. 
 Built RESTful APIs with Flask 3.1, integrated CORS handling, and used Flask-SQLAlchemy for database operations and structured audio 
feedback history. 
 Integrated with Flutter frontend, for audio upload, error visualization, and interactive pronunciation correction for learners."
      date=""
      attendees="Team of 4"
      skills={['Python', 'SQL', 'Flask', 'Librosa', 'SpeechRecognition', 'NLP', 'Levenshtein Distance', 'Flutter', 'REST API', 'CORS']}
      link="https://github.com/sudhar25/AuraVoice"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="Web App with cloud implementation"
      title="Attendance Tracker using AWS Cloud & Cognito"
      desc=" Developed backend logic using PHP to handle subject creation, attendance marking, percentage calculations, and validation flows with secure 
session management. 
 Designed and structured the database using MySQL, implementing relational tables for users, subjects, and attendance records with optimized 
queries for fast read/write operations. 
 Integrated AWS Cognito authentication, using hosted UI and token verification to enable secure login, protect routes, and maintain user-level 
data isolation. 
 Implemented dynamic attendance dashboards using JavaScript to generate real-time percentage charts and progress summaries for each 
subject. Built a fully responsive frontend using HTML, CSS, and Bootstrap to streamline user interaction."
      date=""
      attendees="Solo Project"
      skills={['PHP', 'MySQL', 'AWS Cognito', 'JavaScript', 'Bootstrap', 'Session Management', 'Database Optimization', 'Data Visualization']}
      link="https://github.com/sudhar25/Attendance-manager"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="NLP Based"
      title="Aathichudi Tamil phrase learning application"
      desc=" Developed a Python full-stack pronunciation learning platform enabling users to view Tamil phrases, listen to reference audio, record their 
own pronunciation, and receive instant correctness feedback. 
 Built a full-stack pronunciation evaluation system with a React frontend (Web Audio API, Axios, modular components) and a 
FastAPI backend supporting audio uploads, real-time scoring, and structured REST responses. 
 Implemented audio preprocessing and analysis pipelines using Pydub, ffmpeg-python, SpeechRecognition, and Levenshtein distance to 
normalize audio, transcribe speech, and compute phonetic similarity. 
 Optimized backend performance with Uvicorn workers, enabling low-latency feedback and a seamless “correct / try again” learning flow 
across the integrated React–FastAPI architecture. "
      date=""
      attendees="Team of 3"
      skills={['Python', 'SQL','NLP','React','FastAPI','Pydub', 'SpeechRecognition', 'Uvicorn']}
      link="https://github.com/sudhar25/Voice-based-learning-app"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="AI Chatbot"
      title="College Admission FAQ Chatbot"
      desc="Developed a Python Flask-based FAQ chatbot using SentenceTransformers for semantic similarity matching.
Implemented spell correction, text preprocessing, and keyword fallback search to improve query accuracy.
Used JSON-based FAQ dataset with cosine similarity to return relevant answers automatically.
 "
      date=""
      attendees="Team of 2"
      skills={['Python', 'TensorFlow', 'SentenceTransformer', 'Json', 'FastAPI']}
      link="https://github.com/sudhar25/semantic_chatbot"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="Android Application"
      title="Farm Land Mapping Application"
      desc="Built Flutter mobile app for real-time GPS-based farm boundary mapping with polygon area calculation
Designed FastAPI REST backend with JWT authentication and geospatial farm data storage using PostGIS
Integrated NeonDB (serverless PostgreSQL) as central database for multi-farmer data isolation
Connected backend to NASNet/ViT ML model for satellite-based crop disaster detection using stored GPS coordinates"
      date=""
      attendees="Team of 4"
      skills={['PostgreSQL', 'Dart', 'Flutter', 'JWT Authentication', 'FastAPI', 'REST API']}
      link="https://github.com/sudhar25/Mapping-app"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />

    <LeadershipCard
      tag="Android application"
      title="Weather & Air Quality App"
      desc=" Developed a cross-platform mobile application using Flutter, enabling users to fetch real-time weather data and AQI details based on GPS 
coordinates or selected cities. 
 Integrated OpenWeatherMap APIs for temperature, humidity, pollution index, and particulate data, with robust JSON parsing and error
handled network calls and trigger dynamic API requests for accurate environmental metrics. 
 Built a reactive UI using Flutter widgets, displaying AQI labels (Good, Moderate, Poor, etc.) with dynamic theme updates driven by air quality 
and weather conditions a structured application logic in Dart with clean state management. 
 Optimized app performance with efficient API handling, caching strategies, and resource-aware widget rendering for smooth user experience 
across devices. "
      date=""
      attendees="Team of 3"
      skills={['Flutter', 'Dart','Json', 'API handling']}
      link="https://github.com/sudhar25/Weather-app"
      images={[
        'https://via.placeholder.com/600x220',
        'https://via.placeholder.com/600x220',
      ]}
    />
  
  </div>
  </div>
</section>



<section id="publications" className="publications reveal">
  <h2><WaveText text="Publications" /></h2>

  <div className="publication-list">

    <PubCard
      title=" Cropsure: A Deep Learning Framework for Crop Damage Assessment and Agricultural Insurance
Support"
      desc=" 2026 IEEE Contemporary Computing Innovations Conference (CCIC 2026) 
      Proposed CropSure, a deep learning–based framework for crop damage assessment using satellite imagery and AI models to detect
and estimate agricultural losses. The system analyzes environmental data to support faster damage evaluation and decision-making for
farmers and insurance authorities."
      link="#"
      images={[
        '/certificates/IEEE_paper.png',
        
      ]}
    />

    <PubCard
      title="AuraVoice – Automatic Pronunciation Error Detection and Correction Application"
      desc=" International Journal of Creative Research Thoughts (IJCRT).
      Developed AuraVoice, an application that uses speech recognition techniques to detect pronunciation errors and provide automatic
correction, helping improve language learning and spoken communication."
      link="#"
      images={[
        '/certificates/journal.png',
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
<b>2nd Runner</b> up in an ARVR hackathon Conducted by KJ Somaiya College Developed a 
Interactive AR WEB application for a art gallery.
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
Presented research work at a technical event Organized by 
<b>University of Mumbai</b> and Reached till Final round representing our college.
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
  <a href="mailto:sudharsannadar1@email.com" className="contact-item">
    <div className="contact-item-icon">✉️</div>
    <div className="contact-item-text">
      <span className="contact-item-label">Email</span>
      <span className="contact-item-value">sudharsannadar1@email.com</span>
    </div>
  </a>

  {/* Social Icons */}
  <div className="social-icons">
    <a href="https://github.com/sudhar25" target="_blank" className="github"
       title="GitHub">
      <i className="fab fa-github"></i>
    </a>
    <a href="https://www.linkedin.com/in/sudharsan-nadar-645145313/" target="_blank" className="linkedin"
       title="LinkedIn">
      <i className="fab fa-linkedin"></i>
    </a>
    <a href="https://www.instagram.com/me_sudhar_?igsh=MTRqcHRrbzc2MDY5bQ==" target="_blank" className="instagram"
       title="Instagram">
      <i className="fab fa-instagram"></i>
    </a>
  </div>


</div>

<div className="feedback-card">

  {/* VISITOR COUNTER */}
  <div className="visitor-counter">
    <div className="visitor-icon">👁️</div>
    <div className="visitor-info">
      <span className="visitor-number"><VisitorCount /></span>
      <span className="visitor-label">Portfolio Views</span>
    </div>
  </div>

  <div className="feedback-divider" />

  <h3>Send me a Message</h3>
  <p className="feedback-sub">Fill in your details and I'll get back to you</p>

  {/* NETLIFY FORM */}
  <form
    name="contact"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
    className="mail-form"
    onSubmit={(e) => {
      e.preventDefault()
      const form = e.target
      const data = new FormData(form)

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
        .then(() => {
          setFormSent(true)
          form.reset()
        })
        .catch(() => alert('Something went wrong. Please try again.'))
    }}
  >

    {/* hidden fields required by Netlify */}
    <input type="hidden" name="form-name" value="contact" />
    <input type="hidden" name="bot-field" />

    {/* TO field — your email shown */}
    <div className="mail-field">
      <span className="mail-label">To</span>
      <span className="mail-value">sudharsannadar1@gmail.com</span>
    </div>

    {/* NAME */}
    <div className="mail-input-group">
      <label>Your Name</label>
      <input
        type="text"
        name="name"
        placeholder="John Doe"
        required
      />
    </div>

    {/* EMAIL */}
    <div className="mail-input-group">
      <label>Your gmail</label>
      <input
        type="email"
        name="email"
        placeholder="sender@example.com"
        required
      />
    </div>

    {/* SUBJECT */}
    <div className="mail-input-group">
      <label>Subject</label>
      <input
        type="text"
        name="subject"
        placeholder="Hiring / Collaboration / Query"
        required
      />
    </div>

    {/* MESSAGE */}
    <div className="mail-input-group">
      <label>Message</label>
      <textarea
        name="message"
        placeholder="Write your message here..."
        rows={4}
        required
      />
    </div>

    {/* SUBMIT */}
    {!formSent ? (
      <button type="submit" className="mail-send-btn">
        Send Message ✉️
      </button>
    ) : (
      <div className="feedback-success">
        ✅ Message sent! I'll get back to you soon.
      </div>
    )}

  </form>

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

