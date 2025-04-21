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
      const res = await axios.get('http://localhost:8080/admin/exams');
      setExams(res.data);
    } catch (err) {
      console.error('Error fetching exams:', err);
    }
  };

  const viewRegisteredStudents = (examId) => {
    navigate(`/admin/exams/${examId}/students`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Exams</h2>
      {exams.length === 0 ? (
        <p>No exams available.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {exams.map((exam) => (
            <div
              key={exam.examId}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <h3>{exam.courseName}</h3>
              <p><strong>Exam ID:</strong> {exam.examId}</p>
              <p><strong>Branch:</strong> {exam.branch}</p>
              <p><strong>Exam Date:</strong> {exam.examDate}</p>
              <button
                onClick={() => viewRegisteredStudents(exam.examId)}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                View Registered Students
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExamsPage;
