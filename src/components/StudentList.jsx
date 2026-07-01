import React from 'react'
import { FaUsers, FaEdit, FaTrash } from 'react-icons/fa'
import './StudentList.css'

const StudentList = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return (
      <div className="no-students">
        <p><FaUsers /> No students found.</p>
      </div>
    )
  }

  return (
    <div className="student-list">
      <div className="list-header">
        <span><FaUsers /> Name</span>
        <span>Email</span>
        <span>Class</span>
        <span>Actions</span>
      </div>
      
      {students.map(student => (
        <div key={student.id} className="student-item">
          <div className="student-info">
            <span className="student-name">{student.name}</span>
            <span className="student-email">{student.email}</span>
            <span className="student-class">{student.class}</span>
          </div>
          <div className="student-actions">
            <button 
              className="btn btn-primary btn-small"
              onClick={() => onEdit(student)}
            >
              <FaEdit />
              Edit
            </button>
            <button 
              className="btn btn-danger btn-small"
              onClick={() => onDelete(student.id)}
            >
              <FaTrash />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StudentList