package com.ooad.demo.dto;

public class studentDTO {
    private String id;
    private String name;
    private String email;
    private String branch;
    private String usn;
    private int semester; // ✅ Add this field
    private String password; 

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getUsn() {
        return usn;
    }

    public void setUsn(String usn) {
        this.usn = usn;
    }

    public int getSemester() {        // ✅ Getter
        return semester;
    }

    public void setSemester(int semester) {  // ✅ Setter
        this.semester = semester;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
