package org.example.kr_backend.models.dto;

import lombok.Data;

@Data
public class UserDto {
    private String name;
    private String surname;
    private String email;
    private String roles;
    private Long id;

    public UserDto(String name, String roles, String surname, String email, Long id) {
        this.name = name;
        this.roles = roles;
        this.surname = surname;
        this.email = email;
        this.id = id;
    }
}
