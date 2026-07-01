import { useState, useEffect } from 'react'
import { FaTachometerAlt, FaUsers, FaChalkboardTeacher, FaCalendarCheck, FaExclamationTriangle } from 'react-icons/fa'
import './Dashboard.css'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    presentToday: 0,
    absentToday: 0,
    lateToday: 0,
    markedToday: 0
  })

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem('students') || '[]')
    const teachers = JSON.parse(localStorage.getItem('teachers') || '[]')
    const attendance = JSON.parse(localStorage.getItem('attendance') || '[]')

    const today = new Date().toISOString().split('T')[0]
    const todayAttendance = attendance.filter(record => record.date === today)
    const presentToday = todayAttendance.filter(record => record.status === 'present').length
    const absentToday = todayAttendance.filter(record => record.status === 'absent').length
    const lateToday = todayAttendance.filter(record => record.status === 'late').length

    setStats({
      totalStudents: students.length,
      totalTeachers: teachers.length,
      presentToday,
      absentToday,
      lateToday,
      markedToday: todayAttendance.length
    })
  }, [])

  const attendanceBase = stats.markedToday > 0 ? stats.markedToday : 1

  return (
    <div className="dashboard">
      <div className="container">
        <h1><FaTachometerAlt /> Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3><FaUsers /> Total Students</h3>
            <div className="stat-number">{stats.totalStudents}</div>
          </div>
          
          <div className="stat-card">
            <h3><FaChalkboardTeacher /> Total Teachers</h3>
            <div className="stat-number">{stats.totalTeachers}</div>
          </div>
          
          <div className="stat-card">
            <h3><FaCalendarCheck /> Present Today</h3>
            <div className="stat-number">{stats.presentToday}</div>
          </div>
          
          <div className="stat-card">
            <h3><FaExclamationTriangle /> Absent Today</h3>
            <div className="stat-number">{stats.absentToday}</div>
          </div>

          <div className="stat-card">
            <h3><FaExclamationTriangle /> Late Today</h3>
            <div className="stat-number">{stats.lateToday}</div>
          </div>
        </div>

        <div className="attendance-summary">
          <h2><FaCalendarCheck /> Attendance Summary</h2>
          <div className="summary-meta">
            <div>
              <span className="summary-label">Students Marked</span>
              <strong>{stats.markedToday}</strong>
            </div>
            <div>
              <span className="summary-label">Total Students</span>
              <strong>{stats.totalStudents}</strong>
            </div>
          </div>
          <div className="summary-chart">
            <div className="chart-bar">
              <div 
                className="bar present" 
                style={{height: `${(stats.presentToday / attendanceBase) * 100}%`}}
              >
                Present: {stats.presentToday}
              </div>
              <div 
                className="bar absent" 
                style={{height: `${(stats.absentToday / attendanceBase) * 100}%`}}
              >
                Absent: {stats.absentToday}
              </div>
              <div 
                className="bar late" 
                style={{height: `${(stats.lateToday / attendanceBase) * 100}%`}}
              >
                Late: {stats.lateToday}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard