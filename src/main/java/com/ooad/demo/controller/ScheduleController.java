package com.ooad.demo.controller;

import com.ooad.demo.model.Exam;
import com.ooad.demo.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    // Schedule an exam
    @PostMapping("/add")
    public Exam scheduleExam(@RequestBody Exam exam) {
        return scheduleService.scheduleExam(exam);
    }

    // Update an exam schedule
    @PutMapping("/{examId}")
    public Exam updateExamSchedule(@PathVariable int examId, @RequestBody Exam updatedExam) {
        return scheduleService.updateExamSchedule(examId, updatedExam);
    }
}
