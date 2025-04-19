// StudentDetail.jsx
import React from 'react';

function StudentDetail({ student }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1rem',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <h3 style={{ margin: 0 }}>{student.name}</h3>
      <p><strong>Student ID:</strong> {student.studentId}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Course:</strong> {student.course}</p>
    </div>
  );
}

export default StudentDetail;
