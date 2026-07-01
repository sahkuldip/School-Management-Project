import React from 'react'
import { FaSchool, FaBullhorn, FaBullseye, FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaShieldAlt, FaChartLine } from 'react-icons/fa'
import './Home.css'
import schoolCampus from '../assets/school-campus.svg'

const Home = () => {
  return (
    <div className="home">
      <section className="hero" style={{ '--hero-photo': `url(${schoolCampus})` }}>
        <div className="hero-content">
          <p className="eyebrow">Trusted school management platform</p>
          <h1><FaSchool /> Pashupati Shiksha Mandir</h1>
          <p className="hero-subtitle">A future-ready academic institution built on excellence, transparency, and digitally streamlined administration.</p>
          <p className="hero-location">Gadhi Gaupalika, Sunsari, Nepal</p>
          <div className="hero-actions">
            <a href="/students" className="btn btn-primary">Explore Student Management</a>
            <a href="/teachers" className="btn btn-secondary">View Academic Staff</a>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <FaUserGraduate />
            <strong>1,200+</strong>
            <span>Students enrolled</span>
          </div>
          <div className="stat-card">
            <FaChalkboardTeacher />
            <strong>85</strong>
            <span>Qualified educators</span>
          </div>
          <div className="stat-card">
            <FaCalendarAlt />
            <strong>98%</strong>
            <span>Attendance consistency</span>
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="container">
          <div className="highlight-grid">
            <div className="highlight-card">
              <FaShieldAlt />
              <h3>Reliable Operations</h3>
              <p>Professional systems for attendance, records, and day-to-day school coordination.</p>
            </div>
            <div className="highlight-card">
              <FaChartLine />
              <h3>Data-led Decisions</h3>
              <p>Actionable insights that help school leadership plan with clarity and confidence.</p>
            </div>
            <div className="highlight-card">
              <FaBullseye />
              <h3>Future-focused Growth</h3>
              <p>Modern infrastructure designed to support long-term institutional success and reputation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="container mission-shell">
          <div className="section-heading">
            <p className="eyebrow">Our commitment</p>
            <h2><FaBullseye /> Our Mission</h2>
          </div>
          <p className="mission-text">To deliver exceptional education through disciplined learning, innovation, and a culture of excellence that prepares students for a successful future.</p>
          <div className="mission-grid">
            <div className="mission-card">
              <h3>Student-centered education</h3>
              <p>Personalized academic support, strong values, and measurable growth for every learner.</p>
            </div>
            <div className="mission-card">
              <h3>Professional administration</h3>
              <p>Streamlined processes for admissions, staff, attendance, and school records.</p>
            </div>
            <div className="mission-card">
              <h3>Community trust</h3>
              <p>Transparent communication and dependable systems that strengthen parent and stakeholder confidence.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="notices">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Latest updates</p>
            <h2><FaBullhorn /> Latest Notices</h2>
          </div>
          <div className="notice-list">
            <div className="notice-card">
              <h3>School Reopening</h3>
              <p>School will reopen on April 15, 2024. All students must report by 9 AM.</p>
              <span className="date">April 10, 2024</span>
            </div>
            <div className="notice-card">
              <h3>Parent-Teacher Meeting</h3>
              <p>PTM scheduled for April 20, 2024. Parents are requested to attend.</p>
              <span className="date">April 5, 2024</span>
            </div>
            <div className="notice-card">
              <h3>Annual Examination</h3>
              <p>Final exams begin next month. Students should review class schedules and timetables.</p>
              <span className="date">March 28, 2024</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home