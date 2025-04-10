import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx'
import axios from 'axios'

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
    const res = await axios.get('http://localhost:8080/exams')
    setExams(res.data)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/exams/${id}`)
    fetchExams()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:8080/exams/add', form)
    setForm({ courseCode: '', courseName: '', examDate: '', startTime: '', endTime: '', totalMarks: '', semester: '', branch: '', prerequisites: '' })
    fetchExams()
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Exam Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input placeholder="Course Code" value={form.courseCode} onChange={(e) => setForm({ ...form, courseCode: e.target.value })} required />
        <input placeholder="Course Name" value={form.courseName} onChange={(e) => setForm({ ...form, courseName: e.target.value })} required />
        <input type="date" value={form.examDate} onChange={(e) => setForm({ ...form, examDate: e.target.value })} required />
        <input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} required />
        <input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} required />
        <input placeholder="Total Marks" type="number" value={form.totalMarks} onChange={(e) => setForm({ ...form, totalMarks: e.target.value })} required />
        <input placeholder="Semester" type="number" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} required />
        <input placeholder="Branch" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} required />
        <input placeholder="Prerequisites" value={form.prerequisites} onChange={(e) => setForm({ ...form, prerequisites: e.target.value })} />
        <button type="submit">Add Exam</button>
      </form>

      <h3>Exam List</h3>
      <ul>
        {exams.map((exam) => (
          <li key={exam.examId}>
            <strong>{exam.courseCode}</strong> - {exam.courseName} ({exam.branch}, Sem {exam.semester}) - {exam.examDate}
            <button onClick={() => handleDelete(exam.examId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminExamPage
