import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './components/login'
import Register from './components/register'
import Home from './pages/home'
import AdminLogin from './components/admin'
import AdminExamPage from './pages/AdminExamPage'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const [student, setStudent] = useState(null)
  const [admin, setAdmin] = useState(null) // Add this line

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setStudent={setStudent} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home student={student} />} />
        <Route path="/admin" element={<AdminLogin setAdmin={setAdmin} />} />
        <Route path="/admin/exams" element={<AdminExamPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  )
}

export default App
