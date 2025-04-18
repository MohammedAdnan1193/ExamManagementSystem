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

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student registerStudent(Student student) {
        if (studentRepository.findByEmail(student.getEmail()) != null) {
            throw new IllegalArgumentException("Student with this email already exists");
        }

        int year = LocalDate.now().getYear() % 100;
        String branch = student.getBranch().toLowerCase();
        long count = studentRepository.countByBranchIgnoreCase(branch) + 1;
        String idPart = String.format("%03d", count);

        String generatedId = "pes1ug" + year + branch + idPart;

        student.setStudentId(generatedId);
        return studentRepository.save(student);
    }

    public Optional<Student> getStudentByEmail(String email) {
        return Optional.ofNullable(studentRepository.findByEmail(email));
    }
}
