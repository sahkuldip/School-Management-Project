/**
 * Password Validation Utility
 * Validates password strength based on specific criteria
 */

// Password strength criteria
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUpperCase: true,
  requireLowerCase: true,
  requireNumbers: true,
  requireSpecialChar: true
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with status and details
 */
export const validatePasswordStrength = (password) => {
  const validations = {
    minLength: {
      test: password.length >= PASSWORD_REQUIREMENTS.minLength,
      message: `At least ${PASSWORD_REQUIREMENTS.minLength} characters`
    },
    hasUpperCase: {
      test: /[A-Z]/.test(password),
      message: 'At least one uppercase letter (A-Z)'
    },
    hasLowerCase: {
      test: /[a-z]/.test(password),
      message: 'At least one lowercase letter (a-z)'
    },
    hasNumbers: {
      test: /[0-9]/.test(password),
      message: 'At least one number (0-9)'
    },
    hasSpecialChar: {
      test: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      message: 'At least one special character (!@#$%^&* etc.)'
    }
  }

  const passed = Object.values(validations).filter(v => v.test).length
  const total = Object.keys(validations).length

  return {
    isStrong: Object.values(validations).every(v => v.test),
    score: Math.round((passed / total) * 100),
    passed,
    total,
    validations,
    requirements: Object.entries(validations).map(([key, value]) => ({
      key,
      ...value
    }))
  }
}

/**
 * Generate password strength indicator text
 * @param {number} score - Strength score (0-100)
 * @returns {object} - Indicator text and color
 */
export const getStrengthIndicator = (score) => {
  if (score < 40) {
    return { text: 'Weak', color: '#e74c3c', level: 'weak' }
  } else if (score < 70) {
    return { text: 'Medium', color: '#f39c12', level: 'medium' }
  } else if (score < 90) {
    return { text: 'Strong', color: '#27ae60', level: 'strong' }
  } else {
    return { text: 'Very Strong', color: '#16a085', level: 'very-strong' }
  }
}

/**
 * Check if two passwords match
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirm password
 * @returns {boolean} - True if passwords match
 */
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword && password.length > 0
}
