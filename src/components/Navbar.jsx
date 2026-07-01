import { Link } from 'react-router-dom'
import { FaSchool, FaHome, FaInfoCircle, FaTachometerAlt, FaUsers, FaChalkboardTeacher, FaClipboardCheck, FaSignInAlt } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <FaSchool />
          Pashupati Shiksha Mandir
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link"><FaHome /> Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link"><FaInfoCircle /> About Us</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link"><FaTachometerAlt /> Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/students" className="nav-link"><FaUsers /> Students</Link>
          </li>
          <li className="nav-item">
            <Link to="/teachers" className="nav-link"><FaChalkboardTeacher /> Teachers</Link>
          </li>
          <li className="nav-item">
            <Link to="/attendance" className="nav-link"><FaClipboardCheck /> Attendance</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link"><FaSignInAlt /> Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar