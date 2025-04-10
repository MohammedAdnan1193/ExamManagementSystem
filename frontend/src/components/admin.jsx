import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAdminByEmail } from '../services/api'
import { UserContext } from '../context/UserContext.jsx'

function AdminLogin() {
  const { setAdmin } = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await getAdminByEmail(email)
      const admin = res.data

      if (admin.password === password) {
        setAdmin(admin) // Save admin in context
        alert(`Welcome, ${admin.name}!`)
        navigate('/admin/dashboard')
      } else {
        setError('Incorrect password')
      }
    } catch (err) {
      setError('Admin not found')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Login</h2>
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
    </div>
  )
}

export default AdminLogin
