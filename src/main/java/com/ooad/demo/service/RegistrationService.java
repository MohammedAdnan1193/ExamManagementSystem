package com.ooad.demo.service;

import com.ooad.demo.model.Registration;
import com.ooad.demo.model.Student;
import com.ooad.demo.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    // Register a student for an exam
    public Registration registerForExam(Registration registration) {
        return registrationRepository.save(registration);
    }

    // Get all registrations
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }
    public List<Registration> getRegistrationsByStudent(Student student) {
        return registrationRepository.findByStudent(student);
    }

}
