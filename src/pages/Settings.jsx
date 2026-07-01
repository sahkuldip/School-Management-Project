import { FaCog, FaSchool, FaBell, FaUserShield, FaCalendarAlt, FaBus } from 'react-icons/fa'
import './Settings.css'

const settingsGroups = [
  {
    title: 'School Profile',
    icon: FaSchool,
    description: 'Update school name, address, contact details, and branding.'
  },
  {
    title: 'Notifications',
    icon: FaBell,
    description: 'Control notice alerts for admissions, attendance, and events.'
  },
  {
    title: 'Access Control',
    icon: FaUserShield,
    description: 'Manage administrator roles and login policy for staff accounts.'
  },
  {
    title: 'Academic Calendar',
    icon: FaCalendarAlt,
    description: 'Maintain school terms, holidays, and exam schedules.'
  },
  {
    title: 'Transport & Services',
    icon: FaBus,
    description: 'Track route assignments, pickup points, and school services.'
  }
]

const Settings = () => {
  return (
    <div className="settings-page">
      <div className="container settings-page__container">
        <div className="settings-hero">
          <span className="settings-hero__eyebrow"><FaCog /> Administration</span>
          <h1>Settings</h1>
          <p>Keep your school operations organized with a practical admin panel for real day-to-day management.</p>
        </div>

        <section className="settings-grid">
          {settingsGroups.map((group) => {
            const Icon = group.icon

            return (
              <article key={group.title} className="settings-card">
                <div className="settings-card__icon"><Icon /></div>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </article>
            )
          })}
        </section>
      </div>
    </div>
  )
}

export default Settings