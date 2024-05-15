package org.example.kr_backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.kr_backend.models.AuthResponse;
import org.example.kr_backend.models.User;
import org.example.kr_backend.service.impl.AuthService;
import org.example.kr_backend.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthService authService;


    @PostMapping("/registration")
    public ResponseEntity<AuthResponse> register(@RequestBody User user){
        return ResponseEntity.ok(authService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody User user){
        log.info("form controller");
        return ResponseEntity.ok(authService.login(user));
    }
}
