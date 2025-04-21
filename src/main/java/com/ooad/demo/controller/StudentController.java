package com.ooad.demo.controller;

import com.ooad.demo.dto.studentDTO;
import com.ooad.demo.mapper.StudentMapper;
import com.ooad.demo.model.Student;
import com.ooad.demo.service.StudentService;
import com.ooad.demo.dto.LoginRequest;
import com.ooad.demo.dto.ErrorResponse;

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
    //Register
    @PostMapping("/register")
    public studentDTO registerStudent(@RequestBody studentDTO studentDto) {
        Student savedStudent = studentService.registerStudent(StudentMapper.toEntity(studentDto));
        return StudentMapper.toDTO(savedStudent); // Ensure 'studentId' is in the DTO
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
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    Optional<Student> studentOpt = studentService.getStudentByEmail(request.getEmail());

    if (studentOpt.isPresent()) {
        Student student = studentOpt.get();
        if (student.getPassword() != null && student.getPassword().equals(request.getPassword())) {
            studentDTO dto = StudentMapper.toDTO(student);
            return ResponseEntity.ok(dto);
        }
    }

    // Return proper error message
    return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(new ErrorResponse("Invalid email or password"));
}

    // Get student by studentId (updated to fetch student based on studentId)
    @GetMapping("/id/{studentId}")
    public ResponseEntity<studentDTO> getStudentById(@PathVariable String studentId) {
        Optional<Student> studentOpt = studentService.getStudentById(studentId); // Fetch student by studentId
        return studentOpt
                .map(student -> ResponseEntity.ok(StudentMapper.toDTO(student))) // Return studentDTO
                .orElseGet(() -> ResponseEntity.notFound().build()); // If not found, return 404
    }

    // Get student info by email (retaining this method)
    @GetMapping("/info/{email}")
    public ResponseEntity<studentDTO> getStudentInfo(@PathVariable String email) {
        Optional<Student> studentOpt = studentService.getStudentByEmail(email);
        return studentOpt
                .map(student -> ResponseEntity.ok(StudentMapper.toDTO(student)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
