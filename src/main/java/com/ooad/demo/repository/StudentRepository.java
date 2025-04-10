package com.ooad.demo.repository;

import com.ooad.demo.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    Student findByEmail(String email);
    long countByBranchIgnoreCase(String branch);
}
