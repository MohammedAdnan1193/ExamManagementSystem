import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx'
import axios from 'axios'
import './AdminExamPage.css' // Include dark mode styles

function AdminExamPage() {
  const { admin } = useContext(UserContext)
  const navigate = useNavigate()

  const [exams, setExams] = useState([])
  const [form, setForm] = useState({
    courseCode: '',
    courseName: '',
    examDate: '',
    startTime: '',
    endTime: '',
    totalMarks: '',
    semester: '',
    branch: '',
    prerequisites: ''
  })

  useEffect(() => {
    if (!admin) navigate('/admin')
    fetchExams()
  }, [admin])

  const fetchExams = async () => {
    try {
      const res = await axios.get('http://localhost:8080/exams')
      setExams(res.data)
    } catch (err) {
      console.error('Failed to fetch exams:', err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/exams/${id}`)
      fetchExams()
    } catch (err) {
      console.error('Error deleting exam:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8080/exams/add', form)
      setForm({
        courseCode: '',
        courseName: '',
        examDate: '',
        startTime: '',
        endTime: '',
        totalMarks: '',
        semester: '',
        branch: '',
        prerequisites: ''
      })
      fetchExams()
    } catch (err) {
      console.error('Error adding exam:', err)
    }
  }
  console.log('Exams:', exams)

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Exam List</h3>
        {exams.length === 0 ? (
          <p>No exams available. Add one!</p>
        ) : (
          <ul>
            {exams.map((exam) => (
              <li key={exam.examId} className="exam-card">
                <strong>{exam.courseCode}</strong><br />
                {exam.courseName}<br />
                <small>{exam.branch}, Sem {exam.semester}</small><br />
                <small>{exam.examDate}</small>
                <br />
                <button onClick={() => handleDelete(exam.examId)} className="delete-btn">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Main Form Section */}
      <main className="main-content">
        <h2>Admin Exam Management</h2>
        <form onSubmit={handleSubmit} className="exam-form">
          <input placeholder="Course Code" value={form.courseCode} onChange={(e) => setForm({ ...form, courseCode: e.target.value })} required />
          <input placeholder="Course Name" value={form.courseName} onChange={(e) => setForm({ ...form, courseName: e.target.value })} required />
          <input type="date" value={form.examDate} onChange={(e) => setForm({ ...form, examDate: e.target.value })} required />
          <input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} required />
          <input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} required />
          <input placeholder="Total Marks" type="number" value={form.totalMarks} onChange={(e) => setForm({ ...form, totalMarks: e.target.value })} required />
          <input placeholder="Semester" type="number" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} required />
          <input placeholder="Branch" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} required />
          <input placeholder="Prerequisites (optional)" value={form.prerequisites} onChange={(e) => setForm({ ...form, prerequisites: e.target.value })} />
          <button type="submit">Add Exam</button>
        </form>
      </main>
    </div>
  )
}

export default AdminExamPage
