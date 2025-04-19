package com.ooad.demo.controller;

import com.ooad.demo.dto.studentDTO;
import com.ooad.demo.dto.ExamDTO;
import com.ooad.demo.model.Exam;
import com.ooad.demo.model.Student;
import com.ooad.demo.service.ExamService;
import com.ooad.demo.service.RegistrationService;
import com.ooad.demo.service.StudentService;
import com.ooad.demo.mapper.StudentMapper;

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
    private ExamService examService;

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private StudentService studentService;

    // Endpoint to get all exams
    @GetMapping("/exams")
    public List<ExamDTO> getAllExams() {
        return examService.getAllExams().stream()
                .map(exam -> new ExamDTO(exam.getExamId(), exam.getCourseName(), exam.getBranch(), exam.getExamDate()))
                .collect(Collectors.toList());
    }

    // Endpoint to get registered students for a specific exam
    @GetMapping("/exams/{examId}/students")
    public List<studentDTO> getRegisteredStudents(@PathVariable Long examId) {
        List<Student> students = registrationService.getRegisteredStudentsForExam(examId);
        return students.stream()
                .map(student -> new StudentDTO(student.getStudentId(), student.getName(), student.getEmail()))
                .collect(Collectors.toList());
    }
}
