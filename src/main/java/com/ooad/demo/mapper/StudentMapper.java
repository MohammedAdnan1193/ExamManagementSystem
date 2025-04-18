package com.ooad.demo.mapper;

import com.ooad.demo.dto.studentDTO;
import com.ooad.demo.model.Student;

public class StudentMapper {

    // Entity → DTO
    public static studentDTO toDTO(Student student) {
        studentDTO dto = new studentDTO();
        dto.setId(student.getStudentId());

        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        dto.setBranch(student.getBranch());
        dto.setUsn(student.getStudentId());
        return dto;
    }

    // DTO → Entity
    public static Student toEntity(studentDTO dto) {
        Student student = new Student();
        student.setStudentId(dto.getUsn()); // or dto.getId().toString()
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        student.setBranch(dto.getBranch());
        // Password, semester, blocked status are not part of the DTO, so not set here
        return student;
    }
}
