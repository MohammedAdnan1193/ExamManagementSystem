// AllStudentsPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function AllStudentsPage() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate()  
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:8080/admin/allStudents');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Students</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Branch</th>
              <th>USN</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.studentId}
                style={{
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                }}
              >
                <td style={{ padding: '1rem' }}>{student.studentId}</td>
                <td style={{ padding: '1rem' }}>{student.name}</td>
                <td style={{ padding: '1rem' }}>{student.email}</td>
                <td style={{ padding: '1rem' }}>{student.branch}</td> {/* Use student.branch */}
                <td style={{ padding: '1rem' }}>{student.usn}</td> {/* Assuming 'usn' exists */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={() => navigate('/admin/dashboard')}
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
  );
}

export default AllStudentsPage;
