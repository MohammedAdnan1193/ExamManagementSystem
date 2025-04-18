package com.ooad.demo.controller;

import com.ooad.demo.dto.studentDTO;
import com.ooad.demo.mapper.StudentMapper;
import com.ooad.demo.model.Student;
import com.ooad.demo.service.StudentService;
import com.ooad.demo.dto.LoginRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Get all students
    @GetMapping
    public List<studentDTO> getAllStudents() {
        return studentService.getAllStudents()
                .stream()
                .map(StudentMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Register a student
    @PostMapping("/register")
    public studentDTO registerStudent(@RequestBody studentDTO studentDto) {
        Student savedStudent = studentService.registerStudent(StudentMapper.toEntity(studentDto));
        return StudentMapper.toDTO(savedStudent);
    }

    // Get student by email
    @GetMapping("/{email}")
    public ResponseEntity<studentDTO> getStudentByEmail(@PathVariable String email) {
        Optional<Student> studentOpt = studentService.getStudentByEmail(email);
        return studentOpt
                .map(student -> ResponseEntity.ok(StudentMapper.toDTO(student)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping("/login")
    public ResponseEntity<studentDTO> login(@RequestBody LoginRequest request) {
        Optional<Student> studentOpt = studentService.getStudentByEmail(request.getEmail());

        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            if (student.getPassword().equals(request.getPassword())) {
                return ResponseEntity.ok(StudentMapper.toDTO(student));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
