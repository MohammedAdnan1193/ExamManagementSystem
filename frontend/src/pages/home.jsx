// src/pages/Home.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home({ student }) {
  const navigate = useNavigate()

  // Redirect if student data is not present
  useEffect(() => {
    if (!student) {
      navigate('/login')
    }
  }, [student, navigate])

  if (!student) return null // Avoid flickering

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {student.name} 🎉</h1>
      <p><strong>Student ID:</strong> {student.studentId}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Branch:</strong> {student.branch.toUpperCase()}</p>
      <p><strong>Semester:</strong> {student.semester}</p>

      {/* Add navigation or logout below if needed */}
      <button onClick={() => navigate('/login')}>Logout</button>
    </div>
  )
}

export default Home
