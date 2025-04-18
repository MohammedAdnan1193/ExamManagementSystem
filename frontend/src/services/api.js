import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

// 🧑‍🎓 Student APIs
export const registerStudent = (data) => {
  return axios.post(`${BASE_URL}/students/register`, data)
}

export const getStudentByEmail = (email) => {
  return axios.get(`${BASE_URL}/students/${email}`)
}

export const loginStudent = (credentials) => {
  return axios.post(`${BASE_URL}/students/login`, credentials)
}

// 👨‍💼 Admin APIs
export const getAdminByEmail = (email) => {
  return axios.get(`${BASE_URL}/admin/${email}`)
}

export const loginAdmin = (adminData) => {
  return axios.post('http://localhost:8080/admin/login', adminData)
}
