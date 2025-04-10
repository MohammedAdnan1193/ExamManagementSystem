package com.ooad.demo.controller;

import com.ooad.demo.model.Admin;
import com.ooad.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Show a welcome message when visiting /admin
    @GetMapping
    public String adminHome() {
        return "Welcome to the Admin Page!";
    }

    // Get all admins (Change the endpoint to avoid conflicts)
    @GetMapping("/all")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    // Add an admin
    @PostMapping("/add")
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminService.addAdmin(admin);
    }

    // Get admin by email
    @GetMapping("/{email}")
    public Optional<Admin> getAdminByEmail(@PathVariable String email) {
        return adminService.getAdminByEmail(email);
    }
}
