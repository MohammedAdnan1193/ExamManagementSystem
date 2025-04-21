import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RegisteredStudentsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [studentsInfo, setStudentsInfo] = useState({});
  const { examId } = useParams();

  useEffect(() => {
    fetchRegisteredStudents();
  }, [examId]);

  const fetchRegisteredStudents = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/exams/${examId}/students`);
      setRegistrations(res.data);
      fetchAllStudentInfo(res.data);
    } catch (err) {
      console.error('Error fetching registered students:', err);
    }
  };

  const fetchAllStudentInfo = async (registrationsList) => {
    try {
      const studentRequests = registrationsList.map((reg) =>
        // Updated to use the new route for fetching student by studentId
        axios.get(`http://localhost:8080/students/id/${reg.studentId}`)
      );

      const responses = await Promise.all(studentRequests);

      const infoMap = {};
      responses.forEach((response, index) => {
        const reg = registrationsList[index];
        infoMap[reg.studentId] = response.data;
      });

      setStudentsInfo(infoMap);
    } catch (err) {
      console.error('Error fetching student info:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Registered Students for Exam {examId}</h2>
      {registrations.length === 0 ? (
        <p>No students registered for this exam.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {registrations.map((reg) => {
            const student = studentsInfo[reg.studentId];
            return (
              <div
                key={reg.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '1rem',
                  backgroundColor: '#f4f4f4',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}
              >
                <h3>{student ? student.name : 'Loading...'}</h3>
                <p><strong>Student ID:</strong> {reg.studentId}</p>
                <p><strong>Email:</strong> {student ? student.email : 'Loading...'}</p>
                <p><strong>Branch:</strong> {student ? student.branch : 'Loading...'}</p>
                <p><strong>Status:</strong> {reg.status}</p>
                <p><strong>Attempts:</strong> {reg.attempts}</p>
                <p><strong>Registered On:</strong> {reg.registrationDate}</p>
                <p><strong>Payment Done:</strong> {reg.paymentDone ? 'Yes' : 'No'}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RegisteredStudentsPage;
