import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'

function StudentRegistrationPage() {
  const { student } = useContext(UserContext)
  const [exams, setExams] = useState([])
  const [registeredExamIds, setRegisteredExamIds] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!student) {
      navigate('/login')
    } else {
      fetchExams()
      fetchMyRegistrations()
    }
  }, [student])

  const fetchExams = async () => {
    const res = await axios.get('http://localhost:8080/exams')
    setExams(res.data)
  }

  const fetchMyRegistrations = async () => {
    const res = await axios.get(`http://localhost:8080/students/${student.studentId}/registrations`)
    const ids = res.data.map((reg) => reg.exam.examId)
    setRegisteredExamIds(ids)
  }

  const handleRegister = async (examId) => {
    const registration = {
      student: { studentId: student.studentId },
      exam: { examId },
      status: 'Registered',
      attempts: 1,
      registrationDate: new Date()
    }

    try {
      await axios.post('http://localhost:8080/registrations/register', registration)
      fetchMyRegistrations()
    } catch (err) {
      console.error(err)
      alert('Registration failed')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Register for Exams</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {exams.map((exam) => (
          <li
            key={exam.examId}
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#f0f8ff'
            }}
          >
            <div>
              <strong>{exam.courseCode}</strong> - {exam.courseName}<br />
              {exam.branch}, Semester {exam.semester}<br />
              Date: {exam.examDate}, Time: {exam.startTime} - {exam.endTime}
            </div>
            <button
              onClick={() => handleRegister(exam.examId)}
              disabled={registeredExamIds.includes(exam.examId)}
              style={{
                marginTop: '0.5rem',
                backgroundColor: registeredExamIds.includes(exam.examId) ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: registeredExamIds.includes(exam.examId) ? 'not-allowed' : 'pointer'
              }}
            >
              {registeredExamIds.includes(exam.examId) ? 'Registered' : 'Register'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentRegistrationPage
