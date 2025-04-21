import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext.jsx';

function PaymentPage() {
  const navigate = useNavigate();
  const { student } = useContext(UserContext);
  const location = useLocation();
  const { examId, examSemester } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);
  const amount = 1500; // 💰 Fixed amount

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Step 1: Register first (needed to get registration ID for payment)
      const registrationRes = await axios.post('http://localhost:8080/registrations/register', {
        studentId: student.email,
        examId: examId,
        status: 'Registered',
        attempts: 1,
        registrationDate: new Date().toISOString().split('T')[0],
        paymentDone: false,
      });

      const registration = registrationRes.data;

      // Step 2: Then, make the payment
      const paymentRes = await axios.post('http://localhost:8080/payments/process', {
        registration: { registrationId: registration.registrationId },
        amount: amount,
        paymentStatus: 'Paid',
        paymentDate: new Date().toISOString().split('T')[0],
      });

      alert('✅ Payment successful and registration completed!');
      navigate('/student/registration');

    } catch (err) {
      console.error('❌ Payment or registration failed:', err);
      alert('❌ Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Payment Required</h2>
      <p>You are registering for an exam earlier than your semester.</p>
      <p>Amount: <strong>₹{amount}</strong></p>

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1.1rem',
          cursor: isProcessing ? 'not-allowed' : 'pointer'
        }}
      >
        {isProcessing ? 'Processing...' : 'Pay & Register'}
      </button>
    </div>
  );
}

export default PaymentPage;
