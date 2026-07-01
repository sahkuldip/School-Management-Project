import { useState, useEffect } from 'react'
import { FaUser, FaAddressCard, FaEnvelope, FaPhone, FaChalkboardTeacher } from 'react-icons/fa'
import { validateUserId, generateUserIdFromName } from '../utils/userIdValidator'
import './StudentForm.css'

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    phone: '',
    class: '',
    address: ''
  })

  const [userIdValidation, setUserIdValidation] = useState(null)
  const [showUserIdRequirements, setShowUserIdRequirements] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (student) {
      setFormData(student)
      if (student.studentId) {
        setUserIdValidation(validateUserId(student.studentId))
      }
    }
  }, [student])

  const validateForm = () => {
    const newErrors = {}
    const studentIdValidation = validateUserId(formData.studentId)

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required'
    } else if (!studentIdValidation.isValid) {
      newErrors.studentId = studentIdValidation.requirements.find(r => !r.test)?.message || 'Invalid Student ID format'
    }

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.class.trim()) newErrors.class = 'Class is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'

    setUserIdValidation(studentIdValidation)
    setShowUserIdRequirements(true)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'studentId' && value) {
      setUserIdValidation(validateUserId(value))
      setShowUserIdRequirements(true)
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleNameBlur = () => {
    if (!formData.studentId && formData.name) {
      const suggested = generateUserIdFromName(formData.name)
      setFormData(prev => ({ ...prev, studentId: suggested }))
      setUserIdValidation(validateUserId(suggested))
      setShowUserIdRequirements(true)
    }
  }

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2><FaUser /> {student ? 'Edit Student' : 'Add Student'}</h2>
        
        <div className="form-group">
          <label htmlFor="studentId"><FaAddressCard /> Student ID *</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className={errors.studentId ? 'error' : ''}
            placeholder="e.g., john_doe or student-001"
          />
          {errors.studentId && <span className="error-message">{errors.studentId}</span>}

          {showUserIdRequirements && userIdValidation && (
            <div className="userid-validation">
              <div className="validation-badge-row">
                <span className={`validation-badge ${userIdValidation.isValid ? 'valid' : 'invalid'}`}>
                  {userIdValidation.isValid ? '✓ Valid' : '✗ Invalid'}
                </span>
              </div>
              <div className="validation-requirements-compact">
                {userIdValidation.requirements.map((req) => (
                  <div key={req.key} className={`req-item ${req.test ? 'met' : 'unmet'}`}>
                    <span className="req-icon">{req.test ? '✓' : '✗'}</span>
                    <span className="req-label">{req.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="name"><FaUser /> Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleNameBlur}
            className={errors.name ? 'error' : ''}
            placeholder="Enter student's full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
          <small className="helper-text">Student ID will be auto-generated from name if left empty</small>
        </div>

        <div className="form-group">
          <label htmlFor="email"><FaEnvelope /> Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone"><FaPhone /> Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="class"><FaChalkboardTeacher /> Class *</label>
          <input
            type="text"
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            className={errors.class ? 'error' : ''}
          />
          {errors.class && <span className="error-message">{errors.class}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
            rows="3"
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {student ? 'Update' : 'Add'} Student
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default StudentForm