import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaLinkedin,
  FaGitAlt,
  FaInstagram
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiJavascript,
  SiPython,
  SiChatbot,
  SiMysql
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import "./App.css";
import myPhoto from "./assets/photo.jpg";

/* ================= HEADER ================= */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header-simple">
        <div className="header-left">
          <h1>Ashish Kumar Jha</h1>
          <p>MERN Stack Developer • AI Engineer • GenAI & Prompt Engineering</p>
        </div>

        <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      </header>

      <nav className={`side-menu ${menuOpen ? "open" : ""}`}>
        {[
          "About",
          "Education",
          "Experience",
          "Skills",
          "Tools",
          "Projects",
          "Achievements",
          "Extra-Curricular",
          "Contact"
        ].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </nav>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}

/* ================= CONTACT FORM ================= */
function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value
    };

    try {
      const res = await fetch("https://portfoliobackend-psah.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSent(true);
        e.target.reset();
        setTimeout(() => setSent(false), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
        </div>

        <textarea placeholder="Your Message" rows="5" required />
        <button type="submit">Send Message</button>
      </form>

      {sent && <p className="success-message">✅ Message sent successfully!</p>}
    </>
  );
}

/* ================= MAIN APP ================= */
export default function App() {
  return (
    <>
      <Header />

      {/* ================= HERO ================= */}
      <section className="hero-modern">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="hero-badge">Welcome to my portfolio 👋 <br /><br />
Glad you're here — let's build something awesome together 🚀
</p>

          <h1>
            I build <span>Web Apps</span>
            <br />& Automate Systems 💻
          </h1>

          <p className="hero-desc">
            I’m a MERN Stack Developer passionate about building clean, scalable,
            and intelligent web applications 🚀
          </p>

          <div className="hero-tools">
            <span>🛠 Tools I use daily</span>
           <div className="tool-icons">
  {/* Core Stack */}
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    alt="React"
    title="React.js"
  />

  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    alt="Node.js"
    title="Node.js"
  />

  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    alt="MongoDB"
    title="MongoDB"
  />

  {/* Developer Tools */}
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
    alt="VS Code"
    title="Visual Studio Code"
  />

  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
    alt="Git"
    title="Git"
  />

  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
    alt="GitHub"
    title="GitHub"
  />

  {/* AI & Deployment */}
  <img
    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg"
    alt="ChatGPT"
    title="ChatGPT"
    style={{ filter: "invert(1)" }}
  />

  <img
    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vercel.svg"
    alt="Vercel"
    title="Vercel"
    style={{ filter: "invert(1)" }}
  />

  <img
    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/render.svg"
    alt="Render"
    title="Render"
    style={{ filter: "invert(1)" }}
  />
</div>

          </div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={myPhoto} alt="Profile" className="hero-photo main" />
          <img src={myPhoto} alt="Preview" className="hero-photo secondary" />
        </motion.div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about">
        <h2>About Me</h2>
        <p>
          I am a passionate MERN Stack Developer focused on creating efficient,
          scalable, and user-centric web applications.
        </p>
        <p>
          I aim to blend full-stack development with AI-driven automation to
          build impactful digital solutions.
        </p>
      </section>

      {/* ================= EDUCATION ================= */}
      <section id="education">
        <h2>Education</h2>
        <div className="education-list">
          <div className="education-card">
            <h3>Class 10</h3>
            <p>Jagriti Vidyapeeth High School</p>
            <p>2021</p>
          </div>
          <div className="education-card">
            <h3>Class 12</h3>
            <p>Patha Bhavan, Kolkata</p>
            <p>2023</p>
          </div>
          <div className="education-card">
            <h3>B.Tech</h3>
            <p>UEM Jaipur</p>
            <p>Currently Pursuing</p>
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section id="experience">
        <h2>Experience</h2>
        <div className="experience-list">
          <div className="experience-card">
            <h3>Personal Projects</h3>
            <p>
              Built multiple MERN stack applications including portfolio
              websites, REST APIs, and real-time chat systems.
            </p>
          </div>
          <div className="experience-card">
            <h3>Internship (Upcoming)</h3>
            <p>Actively seeking real-world development opportunities.</p>
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills">
        <h2>Skills</h2>
        <div className="skills-list">
          <div className="skill-card"><FaReact size={40} /><h3>React</h3></div>
          <div className="skill-card"><SiMongodb size={40} /><h3>MongoDB</h3></div>
          <div className="skill-card"><SiExpress size={40} /><h3>Express</h3></div>
          <div className="skill-card"><FaNodeJs size={40} /><h3>Node.js</h3></div>
          <div className="skill-card"><SiJavascript size={40} /><h3>JavaScript</h3></div>
          <div className="skill-card"><SiPython size={40} /><h3>Python</h3></div>
          <div className="skill-card"><SiMysql size={40} /><h3>SQL</h3></div>
        </div>
      </section>

      {/* ================= TOOLS ================= */}
      <section id="tools">
        <h2>Tools</h2>
        <div className="tools-list">
          <div className="tool-card"><FaGitAlt size={40} /><h3>Git</h3></div>
          <div className="tool-card"><FaGithub size={40} /><h3>GitHub</h3></div>
          <div className="tool-card"><DiVisualstudio size={40} /><h3>VS Code</h3></div>
          <div className="tool-card"><SiChatbot size={40} /><h3>ChatGPT</h3></div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects">
        <h2>Projects</h2>
        <div className="project-list">
          <div className="project-card">
            <h3>To-Do Application</h3>
            <p>MERN-based task manager with authentication and REST APIs.</p>
            <a href="https://to-do-frontend-roan-phi.vercel.app">Check Out</a>
          </div>
          <div className="project-card">
            <h3>Bharat Tradition</h3>
            <p>
              A digital initiative showcasing India’s cultural heritage through
              a modern web platform.
            </p>
            <a href="https://traditionalfrontend.vercel.app">Check Out</a>
          </div>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section id="achievements">
        <h2>Achievements 🏅</h2>
        <div className="achievement-list">
          <div className="achievement-card">
            <h3>📄 IEEE Research Paper</h3>
            <p>
              Published a research paper on an FPGA-based vehicle accident
              reporting system, officially indexed in IEEE Xplore.
            </p>
            <a href="https://ieeexplore.ieee.org/document/11101305" target="_blank">
              View Publication
            </a>
          </div>
        </div>
      </section>

      {/* ================= EXTRA-CURRICULAR ================= */}
      <section id="extra-curricular">
        <h2>Extra-Curricular Activities 🌟</h2>
        <div className="achievement-list">
          <div className="achievement-card">
            <h3>🚀 Hackathon Organizer (4 Events)</h3>
            <p>
              Led a 20+ member team to organize hackathons with participation of
              3000+ students.
            </p>
          </div>

          <div className="achievement-card">
            <h3>🏆 Sports Fest Organizer (2 Events)</h3>
            <p>
              Headed a 40+ member team to organize Sangram Sports Fest with
              1500+ participants.
            </p>
          </div>

          <div className="achievement-card">
            <h3>🏠 Mess & Hostel Secretary</h3>
            <p>
              Managed operations, budgeting, and student welfare for 500+
              residents.
            </p>
          </div>

          <div className="achievement-card">
            <h3>💡 Coding Club Coordinator</h3>
            <p>
              Organized workshops, competitions, and guest lectures to promote a
              strong coding culture.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact">
        <h2>Contact Me</h2>
        <ContactForm />
        <p className="contact-email">
          Email: <a href="mailto:aj5249308@gmail.com">aj5249308@gmail.com</a>
        </p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="socials">
          <a href="https://github.com/ismartashish" target="_blank"><FaGithub /></a>
          <a href="https://linkedin.com" target="_blank"><FaLinkedin /></a>
          <a href="https://instagram.com/ismartashish2.0" target="_blank"><FaInstagram /></a>
        </div>
        <p>Always for You - Ashish Kumar Jha </p>
      </footer>
    </>
  );
}
