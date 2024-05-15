package org.example.kr_backend.service.impl;

import org.example.kr_backend.models.User;
import org.example.kr_backend.repos.UserRepo;
import org.example.kr_backend.service.crudService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements crudService<User> {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getAll() {
        return userRepo.findAll();
    }

    @Override
    public User getById(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    @Override
    public User create(User user) {
        User newUser = User.builder()
                .email(user.getEmail())
                .password(passwordEncoder.encode(user.getPassword()))
                .name(user.getName())
                .surname(user.getSurname())
                .roles("ROLE_USER")
                .build();
        return userRepo.save(newUser);
    }

    @Override
    public User update(User newEntity, Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    public User findByEmail(String email){
        return userRepo.findByEmail(email).orElseThrow();
    }
}
