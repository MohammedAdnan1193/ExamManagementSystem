import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserContext.jsx'

function StudentRegistrationPage() {
  const { student } = useContext(UserContext)
  const [exams, setExams] = useState([])
  const [registeredExamIds, setRegisteredExamIds] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!student) {
      navigate('/login')
      return
    }
    fetchExams()
    fetchMyRegistrations()
  }, [student])

  const fetchExams = async () => {
    try {
      const res = await axios.get('http://localhost:8080/exams')
      setExams(res.data)
    } catch (err) {
      console.error('Error fetching exams:', err)
    }
  }

  const fetchMyRegistrations = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/registrations/student/${student.email}`)
      const ids = res.data.map((reg) => reg.examId)
      setRegisteredExamIds(ids)
    } catch (err) {
      console.error('Error fetching registrations:', err)
    }
  }

  const handleRegister = async (exam) => {
    const examId = exam.examId

    if (registeredExamIds.includes(examId)) {
      alert('⚠️ You have already registered for this exam.')
      return
    }

    // Repeater: student semester > exam semester
    if (student.semester > exam.semester) {
      const repeaterFee = 1500
      navigate('/payment', {
        state: {
          examId: examId,
          examSemester: exam.semester,
          studentEmail: student.email,
          fee: repeaterFee
        }
      })
      return
    }

    const registration = {
      studentId: student.email,
      examId: examId,
      status: 'Registered',
      attempts: 1,
      registrationDate: new Date().toISOString().split('T')[0],
      paymentDone: false
    }

    try {
      await axios.post('http://localhost:8080/registrations/register', registration)
      await fetchMyRegistrations()
      alert('✅ Registration completed successfully!')
    } catch (err) {
      console.error(err)
      alert('❌ Registration failed')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Register for Exams</h2>
      {exams.length === 0 ? (
        <p>No exams available.</p>
      ) : (
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

              {registeredExamIds.includes(exam.examId) && (
                <p style={{ color: 'green', marginTop: '0.5rem' }}>
                  ✔️ You have already registered for this exam
                </p>
              )}

              <button
                onClick={() => handleRegister(exam)}
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
      )}
      <button
        onClick={() => navigate('/home')}
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
        Back
      </button>
    </div>
  )
}

export default StudentRegistrationPage
