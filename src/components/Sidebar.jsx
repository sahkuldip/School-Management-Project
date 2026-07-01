import { NavLink, Link } from 'react-router-dom'
import { FaSchool, FaHome, FaInfoCircle, FaTachometerAlt, FaUsers, FaChalkboardTeacher, FaClipboardCheck, FaCog, FaSignInAlt } from 'react-icons/fa'
import schoolCampus from '../assets/school-campus.svg'
import './Sidebar.css'

const links = [
  { to: '/', label: 'Home', icon: FaHome },
  { to: '/about', label: 'About Us', icon: FaInfoCircle },
  { to: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { to: '/students', label: 'Students', icon: FaUsers },
  { to: '/teachers', label: 'Teachers', icon: FaChalkboardTeacher },
  { to: '/attendance', label: 'Attendance', icon: FaClipboardCheck },
  { to: '/settings', label: 'Settings', icon: FaCog },
  { to: '/login', label: 'Login', icon: FaSignInAlt },
]

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <button type="button" className="sidebar__close" onClick={onClose} aria-label="Close menu">
        ×
      </button>
      <div className="sidebar__brand">
        <Link
          to="/"
          className="sidebar__photo"
          aria-label="Pashupati Shiksha Mandir home"
          style={{ '--sidebar-photo': `url(${schoolCampus})` }}
        >
          <div className="sidebar__photo-overlay">
            <span className="sidebar__photo-icon"><FaSchool /></span>
            <span>School Photo</span>
            <strong>Pashupati Shiksha Mandir</strong>
          </div>
        </Link>

        <div className="sidebar__identity">
          <p className="sidebar__eyebrow">School Management System</p>
          <h1>Pashupati Shiksha Mandir</h1>
          <p>Gadhi Gaupalika, Sunsari, Nepal</p>
          <p className="sidebar__tagline">Admissions, academics, staff, attendance, and school operations.</p>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
          >
            <span className="sidebar__link-icon" aria-hidden="true"><link.icon /></span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__card">
        <span className="sidebar__card-icon" aria-hidden="true"><FaCog /></span>
        <span className="sidebar__card-label">Today</span>
        <strong>School operations at a glance</strong>
        <p>Track attendance, manage staff, and keep student records in one place.</p>
      </div>
    </aside>
  )
}

export default Sidebar