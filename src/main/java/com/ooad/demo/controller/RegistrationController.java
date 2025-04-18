package com.ooad.demo.controller;

import com.ooad.demo.dto.RegistrationDTO;
import com.ooad.demo.mapper.RegistrationMapper;
import com.ooad.demo.model.Exam;
import com.ooad.demo.model.Registration;
import com.ooad.demo.model.Student;
import com.ooad.demo.service.ExamService;
import com.ooad.demo.service.RegistrationService;
import com.ooad.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private ExamService examService;

    // Register a student for an exam
    @PostMapping("/register")
    public RegistrationDTO registerForExam(@RequestBody RegistrationDTO registrationDTO) {
        // Fetch the student and exam entities
        Optional<Student> student = studentService.getStudentByEmail(registrationDTO.getStudentId());
        Optional<Exam> exam = examService.getExamById(registrationDTO.getExamId());

        if (student.isEmpty() || exam.isEmpty()) {
            throw new RuntimeException("Invalid student ID or exam ID");
        }

        // Convert DTO to entity
        Registration registration = RegistrationMapper.toEntity(registrationDTO, student.get(), exam.get());

        // Save the registration and convert it back to DTO
        Registration savedRegistration = registrationService.registerForExam(registration);
        return RegistrationMapper.toDTO(savedRegistration);
    }

    // Get all registrations
    @GetMapping
    public List<RegistrationDTO> getAllRegistrations() {
        return registrationService.getAllRegistrations()
                                  .stream()
                                  .map(RegistrationMapper::toDTO)
                                  .collect(Collectors.toList());
    }
}
