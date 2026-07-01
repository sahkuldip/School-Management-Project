import { useState, useEffect } from 'react'
import { FaClipboardCheck, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa'
import './AttendanceForm.css'

const AttendanceForm = ({ students, selectedDate, existingAttendance, onMarkAttendance }) => {
  const [attendanceData, setAttendanceData] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const initialData = {}
    students.forEach(student => {
      const existing = existingAttendance.find(record => record.studentId === student.id)
      initialData[student.id] = existing ? existing.status : 'present'
    })
    setAttendanceData(initialData)
  }, [students, existingAttendance])

  const handleStatusChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const records = Object.entries(attendanceData).map(([studentId, status]) => ({
      studentId: Number(studentId),
      date: selectedDate,
      status,
      timestamp: new Date().toISOString()
    }))

    onMarkAttendance(records)
    setSuccessMessage('Attendance has been saved successfully.')
  }

  if (students.length === 0) {
    return (
      <div className="no-students-message">
        <p>No students available. Please add students first.</p>
      </div>
    )
  }

  return (
    <div className="attendance-form-container">
      <form onSubmit={handleSubmit}>
        <h2><FaClipboardCheck /> Mark Attendance for {new Date(selectedDate).toLocaleDateString()}</h2>
        {successMessage && <div className="form-success-message">{successMessage}</div>}
        
        <div className="attendance-list">
          {students.map(student => (
            <div key={student.id} className="attendance-item">
              <div className="student-details">
                <span className="student-name">{student.name}</span>
                <span className="student-class">{student.class}</span>
              </div>
              
              <div className="status-options">
                <label>
                  <input
                    type="radio"
                    name={`status-${student.id}`}
                    value="present"
                    checked={attendanceData[student.id] === 'present'}
                    onChange={() => handleStatusChange(student.id, 'present')}
                  />
                  <FaCheckCircle /> Present
                </label>
                <label>
                  <input
                    type="radio"
                    name={`status-${student.id}`}
                    value="absent"
                    checked={attendanceData[student.id] === 'absent'}
                    onChange={() => handleStatusChange(student.id, 'absent')}
                  />
                  <FaTimesCircle /> Absent
                </label>
                <label>
                  <input
                    type="radio"
                    name={`status-${student.id}`}
                    value="late"
                    checked={attendanceData[student.id] === 'late'}
                    onChange={() => handleStatusChange(student.id, 'late')}
                  />
                  <FaClock /> Late
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save Attendance
          </button>
        </div>
      </form>
    </div>
  )
}

export default AttendanceForm