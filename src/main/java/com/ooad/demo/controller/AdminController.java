package com.ooad.demo.controller;

import com.ooad.demo.dto.AdminDTO;
import com.ooad.demo.model.Admin;
import com.ooad.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// import java.util.List;
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

    
    @PostMapping("/login")
    public boolean login(@RequestBody AdminDTO adminDTO) {
        Optional<Admin> optionalAdmin = adminService.getAdminByEmail(adminDTO.getEmail());
        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();
            return admin.getPassword().equals(adminDTO.getPassword());
        }
        return false;
    }
}
