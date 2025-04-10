import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

export const registerStudent = (data) => {
  return axios.post(`${BASE_URL}/students/register`, data)
}

export const getStudentByEmail = (email) => {
  return axios.get(`${BASE_URL}/students/${email}`)
}

export const getAdminByEmail =(email) => {
  return axios.get(`${BASE_URL}/admin/${email}`)
}
