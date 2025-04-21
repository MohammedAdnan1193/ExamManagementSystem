package com.ooad.demo.controller;

import com.ooad.demo.dto.studentDTO;
import com.ooad.demo.dto.AdminDTO;
import com.ooad.demo.dto.ExamDTO;
import com.ooad.demo.dto.RegistrationDTO;
import com.ooad.demo.model.Admin;
import com.ooad.demo.service.AdminService;
import com.ooad.demo.service.StudentService;
import com.ooad.demo.service.ExamService;
import com.ooad.demo.service.RegistrationService;
import com.ooad.demo.mapper.StudentMapper;
import com.ooad.demo.mapper.ExamMapper;
import com.ooad.demo.mapper.RegistrationMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private ExamService examService;

    @Autowired
    private RegistrationService registrationService;

    @GetMapping
    public String adminHome() {
        return "Welcome to the Admin Page!";
    }

    @PostMapping("/login")
    public boolean login(@RequestBody AdminDTO adminDTO) {
        Optional<Admin> optionalAdmin = adminService.getAdminByEmail(adminDTO.getEmail());
        return optionalAdmin.map(admin -> admin.getPassword().equals(adminDTO.getPassword())).orElse(false);
    }

    @GetMapping("/allStudents")
    public List<studentDTO> getAllStudents() {
        return studentService.getAllStudents()
                .stream()
                .map(StudentMapper::toDTO)
                .collect(Collectors.toList());
    }

    // ✅ GET all exams - returns list of ExamDTO
    @GetMapping("/exams")
    public List<ExamDTO> getAllExams() {
        return examService.getAllExams()
                .stream()
                .map(ExamMapper::toDTO)
                .collect(Collectors.toList());
    }

    // ✅ GET all students registered to a specific exam - returns list of RegistrationDTO
    @GetMapping("/exams/{examId}/students")
public List<RegistrationDTO> getStudentsByExam(@PathVariable int examId) {
    return registrationService.getRegistrationsByExamId(examId)
            .stream()
            .map(RegistrationMapper::toDTO)
            .collect(Collectors.toList());
}

}
