import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerStudent } from '../services/api'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    semester: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await registerStudent(formData)
      alert(`Registered successfully! Student ID: ${response.data.studentId}`)
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Register</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '300px'
        }}
      >
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="branch" placeholder="Branch (e.g. CS)" onChange={handleChange} required />
        <input name="semester" placeholder="Semester" type="number" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>

      {/* Floating Login Button */}
      <button
        onClick={() => navigate('/login')}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '2rem',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        Go to Login
      </button>
    </div>
  )
}

export default Register
