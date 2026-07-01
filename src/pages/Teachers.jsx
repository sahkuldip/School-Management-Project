import { useState, useEffect } from 'react'
import { FaChalkboardTeacher, FaPlus, FaSyncAlt } from 'react-icons/fa'
import TeacherForm from '../components/TeacherForm'
import TeacherList from '../components/TeacherList'
import { getTeachers, createTeacher, updateTeacher as updateTeacherApi, deleteTeacher as deleteTeacherApi } from '../services/api'
import './Teachers.css'

const Teachers = () => {
  const [teachers, setTeachers] = useState([])
  const [editingTeacher, setEditingTeacher] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [statusMessage, setStatusMessage] = useState('Connected to local JSON server')

  const loadTeachers = async () => {
    try {
      setLoading(true)
      const data = await getTeachers()
      setTeachers(data)
      setStatusMessage('Teacher data synced successfully')
    } catch (error) {
      setStatusMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTeachers()
  }, [])

  const addTeacher = async (teacher) => {
    try {
      const newTeacher = await createTeacher(teacher)
      setTeachers(prev => [newTeacher, ...prev])
      setShowForm(false)
      setStatusMessage('Teacher added successfully')
    } catch (error) {
      setStatusMessage(error.message)
    }
  }

  const updateTeacher = async (updatedTeacher) => {
    try {
      const savedTeacher = await updateTeacherApi(updatedTeacher.id, updatedTeacher)
      setTeachers(prev => prev.map(teacher => teacher.id === savedTeacher.id ? savedTeacher : teacher))
      setEditingTeacher(null)
      setShowForm(false)
      setStatusMessage('Teacher updated successfully')
    } catch (error) {
      setStatusMessage(error.message)
    }
  }

  const deleteTeacher = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await deleteTeacherApi(id)
        setTeachers(prev => prev.filter(teacher => teacher.id !== id))
        setStatusMessage('Teacher deleted successfully')
      } catch (error) {
        setStatusMessage(error.message)
      }
    }
  }

  return (
    <div className="teachers">
      <div className="container">
        <div className="teachers-hero">
          <div>
            <p className="eyebrow">Staff administration</p>
            <h1><FaChalkboardTeacher /> Teacher Management</h1>
            <p className="hero-copy">Coordinate faculty records through a professional interface backed by JSON endpoints.</p>
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
              setEditingTeacher(null)
              setShowForm(true)
            }}
          >
            <FaPlus />
            Add Teacher
          </button>
          <button className="btn btn-secondary" onClick={loadTeachers}>
            <FaSyncAlt />
            Refresh
          </button>
        </div>

        {showForm && (
          <TeacherForm
            teacher={editingTeacher}
            onSubmit={editingTeacher ? updateTeacher : addTeacher}
            onCancel={() => setShowForm(false)}
          />
        )}

        <TeacherList
          teachers={teachers}
          onEdit={(teacher) => {
            setEditingTeacher(teacher)
            setShowForm(true)
          }}
          onDelete={deleteTeacher}
        />
      </div>
    </div>
  )
}

export default Teachers