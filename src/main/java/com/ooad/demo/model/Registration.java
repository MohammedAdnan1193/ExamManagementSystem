package com.ooad.demo.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data  // Generates getters, setters, toString, equals, and hashCode automatically
@NoArgsConstructor  // Required for JPA
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int registrationId;

    @ManyToOne(fetch = FetchType.LAZY)  // Keep lazy-loading for performance
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    private String status;
    private int attempts;
    private Date registrationDate;

    @OneToOne(mappedBy = "registration", cascade = CascadeType.ALL)
    private Payment payment;
}
