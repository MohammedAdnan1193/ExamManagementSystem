package com.ooad.demo.service;

import com.ooad.demo.model.Exam;
import com.ooad.demo.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    // Get all exams
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    // Get a single exam by ID
    public Optional<Exam> getExamById(int examId) { 
        return examRepository.findById(examId);
    }

    // Add a new exam
    public Exam addExam(Exam exam) {
        return examRepository.save(exam);
    }

    // Delete an exam
    public void deleteExam(int examId) { 
        examRepository.deleteById(examId);
    }

    // Get exams based on branch and semester
    public List<Exam> getExamsByBranchAndSemester(String branch, int semester) {
        return examRepository.findByBranchAndSemester(branch, semester);
    }
}
