package org.example.kr_backend.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.kr_backend.models.AuthResponse;
import org.example.kr_backend.models.ShoppingCart;
import org.example.kr_backend.models.User;
import org.example.kr_backend.models.dto.UserDto;
import org.example.kr_backend.repos.UserRepo;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepo userRepo;
    private final UserServiceImpl userService;
    private final JwtService jwtService;
    private final DtoConverter dtoConverter;
    private final AuthenticationManager authenticationManager;
    private final ShoppingCartService shoppingCartService;

    public AuthResponse register(User request){
        if (userRepo.findByEmail(request.getEmail()).isPresent()){
            return new AuthResponse(null, "User with such email already exist", null);
        }
        User user = userService.create(request);
        UserDto userDto = dtoConverter.toUserDto(user);
        ShoppingCart shoppingCart = ShoppingCart.builder()
                .userId(user.getId())
                .build();
        shoppingCartService.createCart(shoppingCart);
        String jwt = jwtService.generateToken(user);
        return new AuthResponse(jwt, "User successfully registered", userDto);
    }

    public AuthResponse login(User request){

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepo.findByEmail(request.getEmail()).orElseThrow();
        String jwt = jwtService.generateToken(user);
        UserDto userDto = dtoConverter.toUserDto(user);

        return new AuthResponse(jwt, "User login was successful", userDto);
    }
}
