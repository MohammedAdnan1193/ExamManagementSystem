package com.ooad.demo.service;

import com.ooad.demo.model.Student;
import com.ooad.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EligibilityService {

    @Autowired
    private StudentRepository studentRepository;

    // Check if a student is eligible for an exam
    public boolean checkEligibility(String studentId) {
        Student student = studentRepository.findById(studentId).orElse(null);
        if (student != null) {
            return !student.isBlocked();
        }
        return false;
    }
}
