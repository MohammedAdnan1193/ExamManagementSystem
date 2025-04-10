package com.ooad.demo.service;

import com.ooad.demo.model.Exam;
import com.ooad.demo.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ExamRepository examRepository;

    // Schedule a new exam
    public Exam scheduleExam(Exam exam) {
        return examRepository.save(exam);
    }

    // Update an exam schedule
    public Exam updateExamSchedule(int examId, Exam updatedExam) {  // Changed String to int
        Optional<Exam> existingExam = examRepository.findById(examId);
        if (existingExam.isPresent()) {
            Exam exam = existingExam.get();
            exam.setExamDate(updatedExam.getExamDate());  // Corrected method name
            exam.setStartTime(updatedExam.getStartTime()); // Corrected method name
            exam.setEndTime(updatedExam.getEndTime()); // Corrected method name
            return examRepository.save(exam);
        }
        return null;
    }
}
