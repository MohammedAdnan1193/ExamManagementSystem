import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx'
import axios from 'axios'

function Home() {
  const navigate = useNavigate()
  const { student, setStudent } = useContext(UserContext)

  useEffect(() => {
    if (!student) {
      navigate('/login')
      return
    }

    // Fetch full info only if student.id is missing
    if (!student.id) {
      axios
        .get(`http://localhost:8080/students/info/${student.email}`)
        .then((res) => {
          setStudent(res.data) // Update context with full student info
        })
        .catch((err) => {
          console.error('Failed to fetch full student info:', err)
        })
    }
  }, [student, navigate, setStudent])

  if (!student) return null

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {student.name} 🎉</h1>
      <p><strong>Student ID:</strong> {student.id}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Branch:</strong> {student.branch?.toUpperCase()}</p>
      <p><strong>USN:</strong> {student.usn}</p>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/student/register')}>
          Go to Exam Registration
        </button>

        <button onClick={() => {
          setStudent(null)
          navigate('/login')
        }}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home
