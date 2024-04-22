package org.example.kr_backend.models;

import org.example.kr_backend.models.dto.UserDto;

public class AuthResponse {
    private final String token;
    private final String message;
    private final UserDto user;

    public UserDto getUser() {
        return user;
    }

    public AuthResponse(String token, String message, UserDto user){
        this.message = message;
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }
    public String getMessage() {
        return message;
    }
}
