package org.example.kr_backend.service.impl;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.example.kr_backend.models.MyUserDetails;
import org.example.kr_backend.models.User;
import org.example.kr_backend.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepo.findByEmail(email);
        return user.map(MyUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException(email + "not found"));
    }
}
