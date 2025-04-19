import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ExamsPage() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await axios.get('http://localhost:8080/admin/exams'); // Replace with your actual API endpoint
      setExams(res.data);
    } catch (err) {
      console.error('Error fetching exams:', err);
    }
  };

  const viewRegisteredStudents = (examId) => {
    navigate(`/admin/exams/${examId}/students`); // Navigate to the registered students page for that exam
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Exams</h2>
      {exams.length === 0 ? (
        <p>No exams available.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Exam ID</th>
              <th>Course Name</th>
              <th>Branch</th>
              <th>Exam Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.examId} style={{ backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
                <td>{exam.examId}</td>
                <td>{exam.courseName}</td>
                <td>{exam.branch}</td>
                <td>{exam.examDate}</td>
                <td>
                  <button
                    onClick={() => viewRegisteredStudents(exam.examId)}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    View Registered Students
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExamsPage;
