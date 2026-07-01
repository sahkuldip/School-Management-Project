import { useState, useEffect } from 'react'
import { FaUser, FaAddressCard, FaEnvelope, FaPhone, FaBookOpen, FaChalkboardTeacher } from 'react-icons/fa'
import { validateUserId, generateUserIdFromName } from '../utils/userIdValidator'
import './TeacherForm.css'

const TeacherForm = ({ teacher, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    teacherId: '',
    name: '',
    email: '',
    phone: '',
    subject: '',
    qualification: ''
  })

  const [userIdValidation, setUserIdValidation] = useState(null)
  const [showUserIdRequirements, setShowUserIdRequirements] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (teacher) {
      setFormData(teacher)
    }
  }, [teacher])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.teacherId.trim()) newErrors.teacherId = 'Teacher ID is required'
    else if (!userIdValidation?.isValid) {
      newErrors.teacherId = userIdValidation?.requirements.find(r => !r.test)?.message || 'Invalid Teacher ID format'
    }
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required'

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
    
    if (name === 'teacherId' && value) {
      setUserIdValidation(validateUserId(value))
      setShowUserIdRequirements(true)
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleNameBlur = () => {
    // Auto-generate teacherId from name if not already set
    if (!formData.teacherId && formData.name) {
      const suggested = generateUserIdFromName(formData.name)
      setFormData(prev => ({ ...prev, teacherId: suggested }))
      setUserIdValidation(validateUserId(suggested))
      setShowUserIdRequirements(true)
    }
  }

  return (
    <div className="teacher-form-container">
      <form className="teacher-form" onSubmit={handleSubmit}>
        <h2><FaChalkboardTeacher /> {teacher ? 'Edit Teacher' : 'Add Teacher'}</h2>
        
        <div className="form-group">
          <label htmlFor="teacherId"><FaAddressCard /> Teacher ID *</label>
          <input
            type="text"
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            className={errors.teacherId ? 'error' : ''}
            placeholder="e.g., john_doe or teacher-001"
          />
          {errors.teacherId && <span className="error-message">{errors.teacherId}</span>}

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
            placeholder="Enter teacher's full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
          <small className="helper-text">Teacher ID will be auto-generated from name if left empty</small>
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
          <label htmlFor="subject"><FaBookOpen /> Subject *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={errors.subject ? 'error' : ''}
          />
          {errors.subject && <span className="error-message">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="qualification">Qualification *</label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className={errors.qualification ? 'error' : ''}
          />
          {errors.qualification && <span className="error-message">{errors.qualification}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {teacher ? 'Update' : 'Add'} Teacher
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default TeacherForm