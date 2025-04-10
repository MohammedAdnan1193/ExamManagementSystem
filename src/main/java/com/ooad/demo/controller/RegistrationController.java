package com.ooad.demo.controller;

import com.ooad.demo.model.Registration;
import com.ooad.demo.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    // Register a student for an exam
    @PostMapping("/register")
    public Registration registerForExam(@RequestBody Registration registration) {
        return registrationService.registerForExam(registration);
    }

    // Get all registrations
    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }
}

