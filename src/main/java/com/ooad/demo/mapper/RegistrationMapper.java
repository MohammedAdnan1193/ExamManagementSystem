package com.ooad.demo.mapper;

import com.ooad.demo.dto.RegistrationDTO;
import com.ooad.demo.model.Exam;
import com.ooad.demo.model.Registration;
import com.ooad.demo.model.Student;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class RegistrationMapper {

    // Entity → DTO
    public static RegistrationDTO toDTO(Registration registration) {
        RegistrationDTO dto = new RegistrationDTO();

        dto.setId(registration.getRegistrationId());
        dto.setStudentId(registration.getStudent().getStudentId());
        dto.setExamId(registration.getExam().getExamId());
        dto.setStatus(registration.getStatus());
        dto.setAttempts(registration.getAttempts());

        // Date → LocalDate
        if (registration.getRegistrationDate() != null) {
            LocalDate localDate = registration.getRegistrationDate()
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            dto.setRegistrationDate(localDate);
        }

        // Set paymentDone based on whether payment exists
        dto.setPaymentDone(registration.getPayment() != null);

        return dto;
    }

    // DTO → Entity
    public static Registration toEntity(RegistrationDTO dto, Student student, Exam exam) {
        Registration registration = new Registration();

        registration.setRegistrationId(dto.getId());
        registration.setStudent(student);
        registration.setExam(exam);
        registration.setStatus(dto.getStatus());
        registration.setAttempts(dto.getAttempts());

        // LocalDate → Date
        if (dto.getRegistrationDate() != null) {
            Date date = Date.from(dto.getRegistrationDate()
                    .atStartOfDay(ZoneId.systemDefault())
                    .toInstant());
            registration.setRegistrationDate(date);
        }

        // Do not set payment here — handled separately
        return registration;
    }
}
