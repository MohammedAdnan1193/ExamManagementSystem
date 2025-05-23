import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/login'
import Register from './components/register'
import Home from './pages/home'
import AdminLogin from './components/admin'
import AdminExamPage from './pages/AdminExamPage'
import AdminDashboard from './pages/AdminDashboard'
import StudentRegistrationPage from './pages/StudentRegistrationPage'
import AllStudentsPage from './pages/AllStudentsPage'
import ExamsPage from './pages/ExamsPage'
import RegisteredStudentsPage from './pages/RegisteredStudentsPage'
import PaymentPage from './pages/PaymentPage'
function App() {
  const [student, setStudent] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark-theme', dark)
  }, [dark])

  return (
    <Router>
      <div
        className="flex-center"
        style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}
      >
        <button onClick={() => setDark(prev => !prev)}>
          {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login setStudent={setStudent} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home student={student} />} />
        <Route path="/admin" element={<AdminLogin setAdmin={setAdmin} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/addexams" element={<AdminExamPage />} />
        <Route path="/student/register" element={<StudentRegistrationPage />} />
        <Route path="/admin/students" element={<AllStudentsPage />} />
        <Route path="/admin/exams" element={<ExamsPage />} />
        <Route path="/admin/exams/:examId/students" element={<RegisteredStudentsPage />} />
        <Route path="/payment" element={<PaymentPage />} />

      </Routes>
    </Router>
  )
}

export default App
