package com.ooad.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admin")  // Explicitly defining the table name
@Data  // Lombok generates getters, setters, toString, equals, and hashCode
@NoArgsConstructor  // No-arg constructor for JPA
public class Admin {
    @Id
    private String adminId;

    private String name;
    private String email;
    private String password;
}
