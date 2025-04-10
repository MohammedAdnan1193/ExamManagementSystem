package com.ooad.demo.service;

import com.ooad.demo.model.Payment;
import com.ooad.demo.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    // Process a payment
    public Payment processPayment(Payment payment) {
        if (payment.getRegistration() == null) {
            throw new IllegalArgumentException("Payment must be associated with a valid registration.");
        }
        return paymentRepository.save(payment);
    }

    // Get all payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Get payment by ID
    public Optional<Payment> getPaymentById(int paymentId) {
        return paymentRepository.findById(paymentId);
    }

    // Get payment by Registration ID
    public Optional<Payment> getPaymentByRegistrationId(int registrationId) {
        return Optional.ofNullable(paymentRepository.findByRegistrationRegistrationId(registrationId));
    }
}
