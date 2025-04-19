import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RegisteredStudentsPage() {
  const [students, setStudents] = useState([]);
  const { examId } = useParams(); // Extract the exam ID from the URL

  useEffect(() => {
    fetchRegisteredStudents();
  }, [examId]);

  const fetchRegisteredStudents = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/exams/${examId}/students`); // Replace with actual endpoint
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching registered students:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Registered Students for Exam {examId}</h2>
      {students.length === 0 ? (
        <p>No students registered for this exam.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RegisteredStudentsPage;
