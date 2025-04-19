package com.ooad.demo.repository;
import com.ooad.demo.model.Registration;
import com.ooad.demo.model.Student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration,Integer>{
    List<Registration> findByStudentStudentId(String studentId);
    List<Registration> findByExamExamId(int examId);
    List<Registration> findByStudent(Student student);
    
} 
