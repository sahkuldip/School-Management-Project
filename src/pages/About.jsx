import { FaSchool, FaLandmark, FaCompass, FaBookOpen, FaRunning, FaLaptopCode } from 'react-icons/fa'
import './About.css'

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-hero">
          <div className="hero-copy">
            <span className="eyebrow">About Us</span>
            <h1><FaSchool /> Welcome to Pashupati Shiksha Mandir</h1>
            <p>At the heart of Sunsari, our school nurtures every student with academic excellence, character building, and community responsibility.</p>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <h3>2020</h3>
              <p>Founded to empower learners in Gadhi Gaupalika.</p>
            </div>
            <div className="stat-card">
              <h3>300+</h3>
              <p>Active students growing every year.</p>
            </div>
            <div className="stat-card">
              <h3>25+</h3>
              <p>Experienced teachers dedicated to student success.</p>
            </div>
          </div>
        </div>

        <section className="about-grid">
          <div className="about-card">
            <h2><FaLandmark /> Our History</h2>
            <p>Founded in 2020, Pashupati Shiksha Mandir has delivered quality education in Gadhi Gaupalika, Sunsari, Nepal. The school began with a vision of building a safe, supportive environment where every student can flourish.</p>
          </div>
          <div className="about-card feature-card">
            <h2><FaCompass /> Our Vision</h2>
            <p>To become a leading institution that shapes confident, creative, and compassionate citizens ready to serve Nepal and the world.</p>
          </div>
        </section>

        <section className="values">
          <h2><FaBookOpen /> Our Core Values</h2>
          <div className="value-grid">
            <div className="value-item">
              <h3><FaRunning /> Excellence</h3>
              <p>High-quality teaching and learning, every day.</p>
            </div>
            <div className="value-item">
              <h3>Integrity</h3>
              <p>Honesty and fairness are central to our school culture.</p>
            </div>
            <div className="value-item">
              <h3>Respect</h3>
              <p>Celebrating diversity through empathy and inclusion.</p>
            </div>
            <div className="value-item">
              <h3>Community</h3>
              <p>Strong partnerships with parents and local families.</p>
            </div>
          </div>
        </section>

        <section className="about-section facilities-section">
          <h2><FaLaptopCode /> Campus Facilities</h2>
          <div className="facilities-grid">
            <div className="facility">
              <h3>Modern Classrooms</h3>
              <p>Bright, smart rooms designed for active learning.</p>
            </div>
            <div className="facility">
              <h3>Library</h3>
              <p>Quiet study spaces with books, digital resources, and research support.</p>
            </div>
            <div className="facility">
              <h3>Sports Ground</h3>
              <p>Open fields and safe play areas for physical fitness.</p>
            </div>
            <div className="facility">
              <h3>Computer Lab</h3>
              <p>Technology-enabled classrooms for computer literacy and projects.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About