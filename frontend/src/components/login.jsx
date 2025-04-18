import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginStudent } from '../services/api'
import { UserContext } from '../context/UserContext.jsx'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { setStudent } = useContext(UserContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await loginStudent({ email, password })
      setStudent(response.data)
      navigate('/home')
    } catch (err) {
      setStudent(null)
      setError(err.response?.data?.message || 'Invalid email or password')
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
