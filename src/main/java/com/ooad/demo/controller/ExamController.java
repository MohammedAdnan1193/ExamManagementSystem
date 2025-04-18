package com.ooad.demo.controller;

import com.ooad.demo.dto.ExamDTO;
import com.ooad.demo.mapper.ExamMapper;
import com.ooad.demo.model.Exam;
import com.ooad.demo.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/exams")
public class ExamController {

    @Autowired
    private ExamService examService;

    // Get all exams
    @GetMapping
    public List<ExamDTO> getAllExams() {
        return examService.getAllExams()
                          .stream()
                          .map(ExamMapper::toDTO)  // Convert Exam entities to ExamDTOs
                          .collect(Collectors.toList());
    }

    // Get exam by ID
    @GetMapping("/{examId}")
    public ExamDTO getExamById(@PathVariable int examId) {
        Optional<Exam> exam = examService.getExamById(examId);
        return exam.map(ExamMapper::toDTO).orElse(null);  // Return ExamDTO or null if not found
    }

    // Add an exam
    @PostMapping("/add")
    public ExamDTO addExam(@RequestBody ExamDTO examDTO) {
        Exam exam = ExamMapper.toEntity(examDTO);  // Convert ExamDTO to Exam entity
        Exam savedExam = examService.addExam(exam);
        return ExamMapper.toDTO(savedExam);  // Return the saved Exam as ExamDTO
    }

    // Delete an exam
    @DeleteMapping("/{examId}")
    public void deleteExam(@PathVariable int examId) {
        examService.deleteExam(examId);
    }
}
