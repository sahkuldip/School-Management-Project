/**
 * User ID Validation Utility
 * Validates user IDs according to industry standards
 */

// User ID validation requirements
export const USERID_REQUIREMENTS = {
  minLength: 3,
  maxLength: 20,
  pattern: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
  description: 'Must start with a letter, followed by letters, numbers, underscores, or hyphens'
}

/**
 * Validate user ID format
 * @param {string} userId - User ID to validate
 * @returns {object} - Validation result with status and details
 */
export const validateUserId = (userId) => {
  const validations = {
    notEmpty: {
      test: userId.trim().length > 0,
      message: 'User ID is required'
    },
    minLength: {
      test: userId.length >= USERID_REQUIREMENTS.minLength,
      message: `At least ${USERID_REQUIREMENTS.minLength} characters`
    },
    maxLength: {
      test: userId.length <= USERID_REQUIREMENTS.maxLength,
      message: `Maximum ${USERID_REQUIREMENTS.maxLength} characters`
    },
    startsWithLetter: {
      test: /^[a-zA-Z]/.test(userId),
      message: 'Must start with a letter (A-Z, a-z)'
    },
    validCharacters: {
      test: USERID_REQUIREMENTS.pattern.test(userId),
      message: 'Only letters, numbers, underscores (_), and hyphens (-) allowed'
    },
    noSpaces: {
      test: !/\s/.test(userId),
      message: 'No spaces allowed'
    }
  }

  const passed = Object.values(validations).filter(v => v.test).length
  const total = Object.keys(validations).length

  return {
    isValid: Object.values(validations).every(v => v.test),
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
 * Check if user ID is available (simulated check)
 * In a real app, this would check against a database
 * @param {string} userId - User ID to check
 * @param {array} existingUserIds - List of existing user IDs
 * @returns {boolean} - True if user ID is available
 */
export const isUserIdAvailable = (userId, existingUserIds = []) => {
  return !existingUserIds.some(id => id.toLowerCase() === userId.toLowerCase())
}

/**
 * Format and normalize user ID
 * @param {string} userId - User ID to format
 * @returns {string} - Formatted user ID
 */
export const normalizeUserId = (userId) => {
  return userId.toLowerCase().trim()
}

/**
 * Generate a suggested user ID from a name
 * @param {string} name - Full name
 * @returns {string} - Suggested user ID
 */
export const generateUserIdFromName = (name) => {
  if (!name) return ''
  
  // Remove extra spaces and convert to lowercase
  let suggested = name.toLowerCase().trim()
  
  // Replace spaces with underscores
  suggested = suggested.replace(/\s+/g, '_')
  
  // Remove special characters except _ and -
  suggested = suggested.replace(/[^a-z0-9_-]/g, '')
  
  // Ensure it doesn't start with a number or special char
  suggested = suggested.replace(/^[^a-z]+/, '')
  
  // Limit length
  suggested = suggested.substring(0, USERID_REQUIREMENTS.maxLength)
  
  return suggested || 'user'
}

/**
 * Validate user ID uniqueness and format
 * @param {string} userId - User ID to validate
 * @param {array} existingUserIds - List of existing user IDs
 * @returns {object} - Comprehensive validation result
 */
export const validateUserIdComplete = (userId, existingUserIds = []) => {
  const formatValidation = validateUserId(userId)
  
  const uniquenessValidation = {
    test: isUserIdAvailable(userId, existingUserIds),
    message: 'This user ID is already taken'
  }

  const allValid = formatValidation.isValid && uniquenessValidation.test

  return {
    isValid: allValid,
    formatValidation,
    uniquenessValidation,
    message: !allValid ? (
      !formatValidation.isValid ? 
        formatValidation.requirements.find(r => !r.test)?.message :
        uniquenessValidation.message
    ) : 'Valid user ID'
  }
}
