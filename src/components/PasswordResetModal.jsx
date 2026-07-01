import React, { useState } from 'react'
import { FaLock, FaTimes, FaEnvelope, FaKey, FaShieldAlt } from 'react-icons/fa'
import { validatePasswordStrength, passwordsMatch, getStrengthIndicator } from '../utils/passwordValidator'
import './PasswordResetModal.css'

const PasswordResetModal = ({ isOpen, onClose, onReset }) => {
  const [resetStep, setResetStep] = useState('email') // 'email', 'verify', 'reset'
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(null)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handlePasswordChange = (e) => {
    const password = e.target.value
    setNewPassword(password)
    if (password) {
      setPasswordStrength(validatePasswordStrength(password))
    } else {
      setPasswordStrength(null)
    }
    if (errors.newPassword) {
      setErrors(prev => ({ ...prev, newPassword: '' }))
    }
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }))
    }
  }

  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailValue)
  }

  const handleSendVerificationCode = () => {
    const newErrors = {}
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate sending verification code
    console.log(`Verification code sent to ${email}`)
    setSuccessMessage(`Verification code sent to ${email}. Check your email.`)
    setTimeout(() => {
      setResetStep('verify')
      setSuccessMessage('')
    }, 2000)
  }

  const handleVerifyCode = () => {
    const newErrors = {}

    if (!verificationCode.trim()) {
      newErrors.verificationCode = 'Verification code is required'
    } else if (verificationCode.length < 6) {
      newErrors.verificationCode = 'Please enter a valid verification code'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate code verification (in real app, verify with backend)
    if (verificationCode === '123456') {
      setSuccessMessage('Verification successful! Now set your new password.')
      setTimeout(() => {
        setResetStep('reset')
        setSuccessMessage('')
      }, 1500)
    } else {
      setErrors({ verificationCode: 'Invalid verification code' })
    }
  }

  const handleResetPassword = () => {
    const newErrors = {}

    if (!newPassword.trim()) {
      newErrors.newPassword = 'New password is required'
    } else if (!passwordStrength || !passwordStrength.isStrong) {
      newErrors.newPassword = 'Password does not meet strength requirements'
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (!passwordsMatch(newPassword, confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate password reset
    console.log('Password reset successful')
    setSuccessMessage('Password reset successful! Redirecting to login...')
    setTimeout(() => {
      if (onReset) onReset()
      handleClose()
    }, 2000)
  }

  const handleClose = () => {
    setResetStep('email')
    setEmail('')
    setVerificationCode('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordStrength(null)
    setErrors({})
    setSuccessMessage('')
    onClose()
  }

  if (!isOpen) return null

  const strengthIndicator = passwordStrength ? getStrengthIndicator(passwordStrength.score) : null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="reset-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <FaTimes />
        </button>

        <h2><FaLock /> Reset Password</h2>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {resetStep === 'email' && (
          <div className="reset-form">
            <p className="step-description">Enter your email address to receive a verification code</p>
            <div className="form-group">
              <label htmlFor="email"><FaEnvelope /> Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
                }}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <button className="btn btn-primary" onClick={handleSendVerificationCode}>
              Send Verification Code
            </button>
            <p className="helper-text">Demo: Any email works. Verification code: 123456</p>
          </div>
        )}

        {resetStep === 'verify' && (
          <div className="reset-form">
            <p className="step-description">Enter the verification code sent to your email</p>
            <div className="form-group">
              <label htmlFor="verificationCode"><FaKey /> Verification Code</label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value)
                  if (errors.verificationCode) setErrors(prev => ({ ...prev, verificationCode: '' }))
                }}
                className={errors.verificationCode ? 'error' : ''}
                placeholder="Enter 6-digit code"
                maxLength="6"
              />
              {errors.verificationCode && <span className="error-message">{errors.verificationCode}</span>}
            </div>
            <button className="btn btn-primary" onClick={handleVerifyCode}>
              Verify Code
            </button>
            <button className="btn btn-secondary" onClick={() => setResetStep('email')}>
              Back
            </button>
            <p className="helper-text">Demo code: 123456</p>
          </div>
        )}

        {resetStep === 'reset' && (
          <div className="reset-form">
            <p className="step-description"><FaShieldAlt /> Enter your new password</p>
            
            <div className="form-group">
              <label htmlFor="newPassword"><FaLock /> New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                className={errors.newPassword ? 'error' : ''}
                placeholder="Enter new password"
              />
              {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}

              {passwordStrength && (
                <div className="password-strength">
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

                  <div className="requirements-list">
                    {passwordStrength.requirements.map((req) => (
                      <div key={req.key} className={`requirement ${req.test ? 'met' : 'unmet'}`}>
                        <span className="requirement-check">
                          {req.test ? '✓' : '✗'}
                        </span>
                        <span className="requirement-text">{req.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword"><FaLock /> Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              {confirmPassword && newPassword === confirmPassword && (
                <span className="success-check">✓ Passwords match</span>
              )}
            </div>

            <button
              className="btn btn-primary"
              onClick={handleResetPassword}
              disabled={!passwordStrength || !passwordStrength.isStrong}
            >
              Reset Password
            </button>
            <button className="btn btn-secondary" onClick={() => setResetStep('verify')}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PasswordResetModal
