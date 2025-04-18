import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAdmin } from '../services/api' // ✅ updated to use POST login
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
      const res = await loginAdmin({ email, password }) // returns true or false
  
      if (res.data === true) {
        setAdmin({ email }) // Store minimal info; or fetch details if needed
        alert(`Welcome, ${email}!`)
        navigate('/admin/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
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
