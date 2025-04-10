package com.ooad.demo.service;

import com.ooad.demo.model.Admin;
import com.ooad.demo.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Get all admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Add a new admin
    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Get admin by ID
    public Optional<Admin> getAdminById(String adminId) {
        return adminRepository.findById(adminId);
    }
    public Optional<Admin> getAdminByEmail(String email) {
        return Optional.ofNullable(adminRepository.findByEmail(email));
    }
    
}

