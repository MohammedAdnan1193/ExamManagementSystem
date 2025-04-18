import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx'

function Home() {
  const navigate = useNavigate()
  const { student } = useContext(UserContext) // ⬅️ get student from context

  useEffect(() => {
    if (!student) {
      navigate('/login')
    }
  }, [student, navigate])

  if (!student) return null

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {student.name} 🎉</h1>
      <p><strong>Student ID:</strong> {student.studentId}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Branch:</strong> {student.branch.toUpperCase()}</p>
      <p><strong>Semester:</strong> {student.semester}</p>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/student/register')}>
          Go to Exam Registration
        </button>

        <button onClick={() => navigate('/login')}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home
