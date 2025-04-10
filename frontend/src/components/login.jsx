import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStudentByEmail } from '../services/api'
import { UserContext } from '../context/UserContext.jsx'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // ✅ Moved useContext inside component
  const { student, setStudent, admin, setAdmin } = useContext(UserContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await getStudentByEmail(email)
      if (password === response.data.password) {
        setStudent(response.data)
      } else {
        setStudent(null)
        setError('Password did not match!')
      }
    } catch (err) {
      setStudent(null)
      setError('Student not found')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {student && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Welcome, {student.name}</h3>
          <p>Student ID: {student.studentId}</p>
          <p>Branch: {student.branch}</p>
          <p>Semester: {student.semester}</p>
        </div>
      )}

      <button
        onClick={() => navigate('/register')}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '2rem',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
          cursor: 'default',
          zIndex: 1000
        }}
      >
        Register
      </button>
    </div>
  )
}

export default Login
