const API_BASE_URL = 'http://localhost:5000'

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'Request failed')
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const getStudents = () => request('/students')
export const createStudent = (student) => request('/students', {
  method: 'POST',
  body: JSON.stringify(student)
})
export const updateStudent = (id, student) => request(`/students/${id}`, {
  method: 'PUT',
  body: JSON.stringify(student)
})
export const deleteStudent = (id) => request(`/students/${id}`, {
  method: 'DELETE'
})

export const getTeachers = () => request('/teachers')
export const createTeacher = (teacher) => request('/teachers', {
  method: 'POST',
  body: JSON.stringify(teacher)
})
export const updateTeacher = (id, teacher) => request(`/teachers/${id}`, {
  method: 'PUT',
  body: JSON.stringify(teacher)
})
export const deleteTeacher = (id) => request(`/teachers/${id}`, {
  method: 'DELETE'
})
