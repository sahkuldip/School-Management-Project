import { FaSchool, FaEnvelope, FaPhone, FaLink } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3><FaSchool /> Pashupati Shiksha Mandir</h3>
            <p>Gadhi Gaupalika, Sunsari, Nepal</p>
            <p>Providing quality education since 2020</p>
          </div>
          <div className="footer-section">
            <h4><FaEnvelope /> Contact Us</h4>
            <p><FaEnvelope /> Email: info@pashupatischool.edu.np</p>
            <p><FaPhone /> Phone: +977-123-456789</p>
          </div>
          <div className="footer-section">
            <h4><FaLink /> Quick Links</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#admission">Admission</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Pashupati Shiksha Mandir. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer