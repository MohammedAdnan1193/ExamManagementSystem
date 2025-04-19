package com.ooad.demo.controller;

import com.ooad.demo.dto.studentDTO;
import com.ooad.demo.dto.AdminDTO;
import com.ooad.demo.model.Admin;
import com.ooad.demo.service.AdminService;
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
    private AdminService adminService;

    @Autowired
    private StudentService studentService;

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

}
