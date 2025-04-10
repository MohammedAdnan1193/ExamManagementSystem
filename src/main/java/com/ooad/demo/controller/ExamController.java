package com.ooad.demo.controller;
import com.ooad.demo.model.Exam;
import com.ooad.demo.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/exams")
public class ExamController {

    @Autowired
    private ExamService examService;

    // Get all exams
    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    // Get exam by ID
    @GetMapping("/{examId}")
    public Optional<Exam> getExamById(@PathVariable int examId) {
        return examService.getExamById(examId);
    }

    // Add an exam
    @PostMapping("/add")
    public Exam addExam(@RequestBody Exam exam) {
        return examService.addExam(exam);
    }

    // Delete an exam
    @DeleteMapping("/{examId}")
    public void deleteExam(@PathVariable int examId) {
        examService.deleteExam(examId);
    }
}
