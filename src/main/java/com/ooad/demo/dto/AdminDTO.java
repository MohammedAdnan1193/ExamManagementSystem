// src/main/java/com/ooad/demo/dto/AdminDTO.java
package com.ooad.demo.dto;

public class AdminDTO {
    private String email;
    private String password;

    public AdminDTO() {
    }

    public AdminDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
