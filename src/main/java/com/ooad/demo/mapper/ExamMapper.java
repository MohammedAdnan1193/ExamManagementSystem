package com.ooad.demo.mapper;
import com.ooad.demo.model.Exam;
import com.ooad.demo.dto.ExamDTO;

public class ExamMapper {

    public static ExamDTO toDTO(Exam exam) {
        ExamDTO dto = new ExamDTO();
        dto.setExamId(exam.getExamId());
        dto.setCourseName(exam.getCourseName());
        dto.setCourseCode(exam.getCourseCode());
        dto.setSemester(exam.getSemester());
        dto.setExamDate(exam.getExamDate());
        dto.setStartTime(exam.getStartTime());
        dto.setEndTime(exam.getEndTime());
        dto.setBranch(exam.getBranch());
        dto.setTotalMarks(exam.getTotalMarks());
        return dto;
    }

    public static Exam toEntity(ExamDTO dto) {
        Exam exam = new Exam();
        exam.setExamId(dto.getExamId());
        exam.setCourseName(dto.getCourseName());
        exam.setCourseCode(dto.getCourseCode());
        exam.setSemester(dto.getSemester());
        exam.setExamDate(dto.getExamDate());
        exam.setStartTime(dto.getStartTime());
        exam.setEndTime(dto.getEndTime());
        exam.setBranch(dto.getBranch());
        exam.setTotalMarks(dto.getTotalMarks());
        return exam;
    }
}
