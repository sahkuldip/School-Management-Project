import React from 'react'
import { FaChalkboardTeacher, FaEdit, FaTrash } from 'react-icons/fa'
import './TeacherList.css'

const TeacherList = ({ teachers, onEdit, onDelete }) => {
  if (teachers.length === 0) {
    return (
      <div className="no-teachers">
        <p><FaChalkboardTeacher /> No teachers found.</p>
      </div>
    )
  }

  return (
    <div className="teacher-list">
      <div className="list-header">
        <span><FaChalkboardTeacher /> Name</span>
        <span>Email</span>
        <span>Subject</span>
        <span>Actions</span>
      </div>
      
      {teachers.map(teacher => (
        <div key={teacher.id} className="teacher-item">
          <div className="teacher-info">
            <span className="teacher-name">{teacher.name}</span>
            <span className="teacher-email">{teacher.email}</span>
            <span className="teacher-subject">{teacher.subject}</span>
          </div>
          <div className="teacher-actions">
            <button 
              className="btn btn-primary btn-small"
              onClick={() => onEdit(teacher)}
            >
              <FaEdit />
              Edit
            </button>
            <button 
              className="btn btn-danger btn-small"
              onClick={() => onDelete(teacher.id)}
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

export default TeacherList