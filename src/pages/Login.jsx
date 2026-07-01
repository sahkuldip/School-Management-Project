import { useState } from 'react'
import { FaSchool, FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa'
import { validatePasswordStrength, getStrengthIndicator } from '../utils/passwordValidator'
import { validateUserId } from '../utils/userIdValidator'
import PasswordResetModal from '../components/PasswordResetModal'
import './Login.css'

const credentialsByRole = {
  admin: {
    title: 'Administrator Login',
    subtitle: 'Manage staff, students, attendance, and school settings.',
    usernameLabel: 'Admin Username',
    demoUsername: 'admin',
    demoPassword: 'Admin@123',
    buttonLabel: 'Enter Admin Dashboard'
  },
  student: {
    title: 'Student Login',
    subtitle: 'Check notices, attendance, and student-facing school information.',
    usernameLabel: 'Student ID',
    demoUsername: 'S-1001',
    demoPassword: 'Student@123',
    buttonLabel: 'Enter Student Portal'
  }
}

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [userIdValidation, setUserIdValidation] = useState(null)
  const [passwordStrength, setPasswordStrength] = useState(null)
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState('')
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)
  const [showStrengthRequirements, setShowStrengthRequirements] = useState(false)
  const [showUserIdRequirements, setShowUserIdRequirements] = useState(false)
  const [activeRole, setActiveRole] = useState('admin')

  const roleConfig = credentialsByRole[activeRole]

  const resetFormState = () => {
    setFormData({ username: '', password: '' })
    setErrors({})
    setFeedback('')
    setUserIdValidation(null)
    setPasswordStrength(null)
    setShowStrengthRequirements(false)
    setShowUserIdRequirements(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'username') {
      if (value) {
        setUserIdValidation(validateUserId(value))
        setShowUserIdRequirements(true)
      } else {
        setUserIdValidation(null)
        setShowUserIdRequirements(false)
      }
    }

    if (name === 'password') {
      if (value) {
        setPasswordStrength(validatePasswordStrength(value))
        setShowStrengthRequirements(true)
      } else {
        setPasswordStrength(null)
        setShowStrengthRequirements(false)
      }
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    if (feedback) {
      setFeedback('')
    }
  }

  const handleRoleChange = (role) => {
    setActiveRole(role)
    resetFormState()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = `${roleConfig.usernameLabel} is required`
    } else {
      const validation = validateUserId(formData.username)
      if (!validation.isValid) {
        newErrors.username = validation.requirements.find(r => !r.test)?.message || 'Invalid username format'
        setUserIdValidation(validation)
        setShowUserIdRequirements(true)
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (!passwordStrength?.isStrong) {
      newErrors.password = 'Password must meet all strength requirements'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const isValidCredentials =
      formData.username === roleConfig.demoUsername &&
      formData.password === roleConfig.demoPassword

    if (isValidCredentials) {
      setFeedback('Login successful. Redirecting to the dashboard...')
      resetFormState()
      return
    }

    setFeedback(`Invalid credentials for ${activeRole}. Please use the demo username and password.`)
  }

  const strengthIndicator = passwordStrength ? getStrengthIndicator(passwordStrength.score) : { text: '', color: '#97a6b4' }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          <h1><FaSchool /> Pashupati Shiksha Mandir</h1>
          <p>School Management System</p>
        </div>

        <div className="login-role-switch">
          <button
            type="button"
            className={`role-btn ${activeRole === 'admin' ? 'active' : ''}`}
            onClick={() => handleRoleChange('admin')}
          >
            Administrator
          </button>
          <button
            type="button"
            className={`role-btn ${activeRole === 'student' ? 'active' : ''}`}
            onClick={() => handleRoleChange('student')}
          >
            Student
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2><FaSignInAlt /> {roleConfig.title}</h2>
          <p className="login-subtitle">{roleConfig.subtitle}</p>

          {feedback && <div className="feedback-message">{feedback}</div>}

          <div className="form-group">
            <label htmlFor="username"><FaUser /> {roleConfig.usernameLabel}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              placeholder={`Enter ${roleConfig.usernameLabel.toLowerCase()}`}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}

            {showUserIdRequirements && userIdValidation && (
              <div className="userid-validation-info">
                <div className="validation-status">
                  <span className={`validation-badge ${userIdValidation.isValid ? 'valid' : 'invalid'}`}>
                    {userIdValidation.isValid ? '✓ Valid' : '✗ Invalid'}
                  </span>
                  <span className="validation-count">{userIdValidation.passed}/{userIdValidation.total} requirements met</span>
                </div>

                <div className="validation-requirements">
                  {userIdValidation.requirements.map((req) => (
                    <div key={req.key} className={`validation-requirement ${req.test ? 'met' : 'unmet'}`}>
                      <span className="req-check">{req.test ? '✓' : '✗'}</span>
                      <span className="req-text">{req.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password"><FaLock /> Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}

            {showStrengthRequirements && passwordStrength && (
              <div className="password-strength-info">
                <div className="strength-bar">
                  <div
                    className="strength-bar-fill"
                    style={{
                      width: `${passwordStrength.score}%`,
                      backgroundColor: strengthIndicator.color
                    }}
                  />
                </div>
                <span className="strength-text" style={{ color: strengthIndicator.color }}>
                  Strength: {strengthIndicator.text} ({passwordStrength.score}%)
                </span>

                <div className="mini-requirements-list">
                  {passwordStrength.requirements.map((req) => (
                    <div key={req.key} className={`mini-requirement ${req.test ? 'met' : 'unmet'}`}>
                      <span className="req-check">{req.test ? '✓' : '✗'}</span>
                      <span className="req-text">{req.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            {roleConfig.buttonLabel}
          </button>

          <div className="forgot-password-section">
            <button
              type="button"
              className="forgot-password-btn"
              onClick={() => setIsResetModalOpen(true)}
            >
              Forgot Password?
            </button>
          </div>

          <div className="demo-info">
            <p><strong>Demo Credentials:</strong></p>
            <p>{roleConfig.usernameLabel}: {roleConfig.demoUsername}</p>
            <p>Password: {roleConfig.demoPassword}</p>
          </div>
        </form>
      </div>

      <PasswordResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onReset={() => {
          console.log('Password has been reset. User can now login with new password.')
        }}
      />
    </div>
  )
}

export default Login