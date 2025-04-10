package com.ooad.demo.service;

import com.ooad.demo.model.Student;
import com.ooad.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Register a new student
    public Student registerStudent(Student student) {
        // Check for existing email
        if (studentRepository.findByEmail(student.getEmail()) != null) {
            throw new IllegalArgumentException("Student with this email already exists");
        }
    
        // Extract year — either from email or system (here, dummy "22")
        int year = LocalDate.now().getYear() % 100;  // e.g., 2025 % 100 = 25

    
        // Extract branch — ensure it's in lowercase
        String branch = student.getBranch().toLowerCase(); // e.g., "cs"
    
        // Get count of existing students in that year-branch
        long count = studentRepository.countByBranchIgnoreCase(branch) + 1;
    
        // Format number (e.g., 351 → 351)
        String idPart = String.format("%03d", count); // pad to 3 digits
    
        // Combine all parts
        String generatedId = "pes1ug" + year + branch + idPart;
    
        // Set and save
        student.setStudentId(generatedId);
        return studentRepository.save(student);
    }
    

    // Get student by email
    public Optional<Student> getStudentByEmail(String email) {
        return Optional.ofNullable(studentRepository.findByEmail(email));
    }
}
