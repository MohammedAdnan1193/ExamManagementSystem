package com.ooad.demo.repository;

import com.ooad.demo.model.Registration;
import com.ooad.demo.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Integer> {

    List<Registration> findByStudentStudentId(String studentId);
    List<Registration> findByExamExamId(int examId);
    List<Registration> findByStudent(Student student);

    @Query("SELECT r.student FROM Registration r WHERE r.exam.examId = :examId")
    List<Student> findStudentsByExamId(@Param("examId") int examId);
    
}
