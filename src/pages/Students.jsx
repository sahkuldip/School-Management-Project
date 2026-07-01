import { useState, useEffect } from 'react'
import { FaUsers, FaPlus, FaDownload, FaSearch, FaSyncAlt } from 'react-icons/fa'
import StudentForm from '../components/StudentForm'
import StudentList from '../components/StudentList'
import { getStudents, createStudent, updateStudent as updateStudentApi, deleteStudent as deleteStudentApi } from '../services/api'
import './Students.css'

const Students = () => {
  const [students, setStudents] = useState([])
  const [editingStudent, setEditingStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [statusMessage, setStatusMessage] = useState('Connected to local JSON server')

  const loadStudents = async () => {
    try {
      setLoading(true)
      const data = await getStudents()
      setStudents(data)
      setStatusMessage('Student data synced successfully')
    } catch (error) {
      setStatusMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStudents()
  }, [])

  const addStudent = async (student) => {
    try {
      const newStudent = await createStudent(student)
      setStudents(prev => [newStudent, ...prev])
      setShowForm(false)
      setStatusMessage('Student added successfully')
    } catch (error) {
      setStatusMessage(error.message)
    }
  }

  const updateStudent = async (updatedStudent) => {
    try {
      const savedStudent = await updateStudentApi(updatedStudent.id, updatedStudent)
      setStudents(prev => prev.map(student => student.id === savedStudent.id ? savedStudent : student))
      setEditingStudent(null)
      setShowForm(false)
      setStatusMessage('Student updated successfully')
    } catch (error) {
      setStatusMessage(error.message)
    }
  }

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudentApi(id)
        setStudents(prev => prev.filter(student => student.id !== id))
        setStatusMessage('Student deleted successfully')
      } catch (error) {
        setStatusMessage(error.message)
      }
    }
  }

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Class', 'Address']
    const csvContent = [
      headers.join(','),
      ...filteredStudents.map(student => 
        [student.name, student.email, student.phone, student.class, student.address].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'students.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="students">
      <div className="container">
        <div className="students-hero">
          <div>
            <p className="eyebrow">Student administration</p>
            <h1><FaUsers /> Student Management</h1>
            <p className="hero-copy">Maintain a polished student record system with JSON-based CRUD operations for seamless integration with Postman.</p>
          </div>
          <div className="hero-status">
            <span>{loading ? 'Syncing data...' : 'Live'}</span>
            <strong>{statusMessage}</strong>
          </div>
        </div>

        <div className="actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingStudent(null)
              setShowForm(true)
            }}
          >
            <FaPlus />
            Add Student
          </button>
          <button className="btn btn-secondary" onClick={exportToCSV}>
            <FaDownload />
            Export to CSV
          </button>
          <button className="btn btn-secondary" onClick={loadStudents}>
            <FaSyncAlt />
            Refresh
          </button>
        </div>

        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name, email, or class"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {showForm && (
          <StudentForm
            student={editingStudent}
            onSubmit={editingStudent ? updateStudent : addStudent}
            onCancel={() => setShowForm(false)}
          />
        )}

        <StudentList
          students={filteredStudents}
          onEdit={(student) => {
            setEditingStudent(student)
            setShowForm(true)
          }}
          onDelete={deleteStudent}
        />
      </div>
    </div>
  )
}

export default Students