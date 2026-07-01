import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import Attendance from './pages/Attendance'
import Settings from './pages/Settings'
import Login from './pages/Login'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen((value) => !value)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <Router>
      <div className={`app-shell ${sidebarOpen ? 'app-shell--sidebar-open' : ''}`}>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <div className="app-shell__content">
          <button
            type="button"
            className="app-shell__toggle"
            onClick={toggleSidebar}
            aria-expanded={sidebarOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="app-shell__toggle-icon">☰</span>
            Menu
          </button>
          {sidebarOpen && <div className="app-shell__overlay" onClick={closeSidebar} />}
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App