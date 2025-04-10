package com.ooad.demo.repository;

import com.ooad.demo.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ExamRepository extends JpaRepository<Exam, Integer> {
    // You can define custom methods like:
    List<Exam> findByBranchAndSemester(String branch, int semester);
}
