import { useState } from 'react'
import { FaCalendarCheck, FaUser } from 'react-icons/fa'
import './AttendanceRecords.css'

const AttendanceRecords = ({ students, selectedDate, getAttendanceForDate, getStudentAttendance }) => {
  const [viewType, setViewType] = useState('daily') // 'daily' or 'student'

  const dailyAttendance = getAttendanceForDate(selectedDate)

  const getAttendanceStats = (studentId) => {
    const studentAttendance = getStudentAttendance(studentId)
    const total = studentAttendance.length
    const present = studentAttendance.filter(record => record.status === 'present').length
    const absent = studentAttendance.filter(record => record.status === 'absent').length
    const late = studentAttendance.filter(record => record.status === 'late').length
    
    return { total, present, absent, late, percentage: total > 0 ? Math.round((present / total) * 100) : 0 }
  }

  return (
    <div className="attendance-records">
      <div className="view-toggle">
        <button 
          className={`btn ${viewType === 'daily' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setViewType('daily')}
        >
          Daily View
        </button>
        <button 
          className={`btn ${viewType === 'student' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setViewType('student')}
        >
          Student View
        </button>
      </div>

      {viewType === 'daily' ? (
        <div className="daily-view">
          <h3><FaCalendarCheck /> Attendance for {new Date(selectedDate).toLocaleDateString()}</h3>
          
          {dailyAttendance.length === 0 ? (
            <p className="no-records">No attendance records found for this date.</p>
          ) : (
            <div className="attendance-summary">
              <div className="summary-stats">
                <div className="stat">
                  <span className="stat-label">Total Students:</span>
                  <span className="stat-value">{students.length}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Present:</span>
                  <span className="stat-value present">
                    {dailyAttendance.filter(record => record.status === 'present').length}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Absent:</span>
                  <span className="stat-value absent">
                    {dailyAttendance.filter(record => record.status === 'absent').length}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Late:</span>
                  <span className="stat-value late">
                    {dailyAttendance.filter(record => record.status === 'late').length}
                  </span>
                </div>
              </div>

              <div className="attendance-table">
                <div className="table-header">
                  <span>Student Name</span>
                  <span>Class</span>
                  <span>Status</span>
                  <span>Time</span>
                </div>
                
                {dailyAttendance.map(record => {
                  const student = students.find(s => s.id === record.studentId)
                  return (
                    <div key={`${record.studentId}-${record.date}`} className="table-row">
                      <span>{student ? student.name : 'Unknown'}</span>
                      <span>{student ? student.class : 'N/A'}</span>
                      <span className={`status ${record.status}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                      <span>{new Date(record.timestamp).toLocaleTimeString()}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="student-view">
          <h3><FaUser /> Student Attendance Overview</h3>
          
          <div className="student-attendance-table">
            <div className="table-header">
              <span>Student Name</span>
              <span>Class</span>
              <span>Total Days</span>
              <span>Present</span>
              <span>Absent</span>
              <span>Late</span>
              <span>Percentage</span>
            </div>
            
            {students.map(student => {
              const stats = getAttendanceStats(student.id)
              return (
                <div key={student.id} className="table-row">
                  <span>{student.name}</span>
                  <span>{student.class}</span>
                  <span>{stats.total}</span>
                  <span className="present">{stats.present}</span>
                  <span className="absent">{stats.absent}</span>
                  <span className="late">{stats.late}</span>
                  <span className={`percentage ${stats.percentage >= 75 ? 'good' : stats.percentage >= 60 ? 'average' : 'poor'}`}>
                    {stats.percentage}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default AttendanceRecords