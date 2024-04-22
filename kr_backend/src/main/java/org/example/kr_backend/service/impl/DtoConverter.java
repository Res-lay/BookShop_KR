package org.example.kr_backend.service.impl;

import org.example.kr_backend.models.User;
import org.example.kr_backend.models.dto.UserDto;
import org.example.kr_backend.service.DtoConverterInterface;
import org.springframework.stereotype.Service;

@Service
public class DtoConverter implements DtoConverterInterface {
    @Override
    public UserDto toUserDto(User user) {
        return new UserDto(user.getName(), user.getRoles(), user.getSurname(), user.getEmail(), user.getId());
    }
}
