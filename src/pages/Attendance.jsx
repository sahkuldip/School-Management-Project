import { useState, useEffect } from 'react'
import { FaClipboardCheck, FaCalendarAlt, FaEye } from 'react-icons/fa'
import AttendanceForm from '../components/AttendanceForm'
import AttendanceRecords from '../components/AttendanceRecords'
import './Attendance.css'

const Attendance = () => {
  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [viewMode, setViewMode] = useState('mark') // 'mark' or 'view'

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students') || '[]')
    const storedAttendance = JSON.parse(localStorage.getItem('attendance') || '[]')
    setStudents(storedStudents)
    setAttendance(storedAttendance)
  }, [])

  const saveAttendance = (updatedAttendance) => {
    setAttendance(updatedAttendance)
    localStorage.setItem('attendance', JSON.stringify(updatedAttendance))
  }

  const markAttendance = (attendanceRecords) => {
    const updatedAttendance = [...attendance]

    attendanceRecords.forEach((attendanceData) => {
      const existingRecordIndex = updatedAttendance.findIndex(
        record => record.studentId === attendanceData.studentId && record.date === attendanceData.date
      )

      if (existingRecordIndex >= 0) {
        updatedAttendance[existingRecordIndex] = attendanceData
      } else {
        updatedAttendance.push(attendanceData)
      }
    })

    saveAttendance(updatedAttendance)
  }

  const getAttendanceForDate = (date) => {
    return attendance.filter(record => record.date === date)
  }

  const getStudentAttendance = (studentId) => {
    return attendance.filter(record => record.studentId === studentId)
  }

  return (
    <div className="attendance">
      <div className="container">
        <h1><FaClipboardCheck /> Attendance Management</h1>
        
        <div className="attendance-controls">
          <div className="date-selector">
            <label htmlFor="date"><FaCalendarAlt /> Select Date:</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          
          <div className="view-toggle">
            <button 
              className={`btn ${viewMode === 'mark' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('mark')}
            >
              <FaClipboardCheck />
              Mark Attendance
            </button>
            <button 
              className={`btn ${viewMode === 'view' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('view')}
            >
              <FaEye />
              View Records
            </button>
          </div>
        </div>

        {viewMode === 'mark' ? (
          <AttendanceForm 
            students={students}
            selectedDate={selectedDate}
            existingAttendance={getAttendanceForDate(selectedDate)}
            onMarkAttendance={markAttendance}
          />
        ) : (
          <AttendanceRecords 
            students={students}
            attendance={attendance}
            selectedDate={selectedDate}
            getAttendanceForDate={getAttendanceForDate}
            getStudentAttendance={getStudentAttendance}
          />
        )}
      </div>
    </div>
  )
}

export default Attendance