import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const { admin } = useContext(UserContext)
  const navigate = useNavigate()

  if (!admin) {
    navigate('/admin')
    return null
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to Admin Dashboard</h2>
      <p>Name: {admin.name}</p>
      <p>Email: {admin.email}</p>

      <button
        onClick={() => navigate('/admin/exams')}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          fontSize: '1rem',
        }}
      >
        Go to Exam Management
      </button>
    </div>
  )
}

export default AdminDashboard
