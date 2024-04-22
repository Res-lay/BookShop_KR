package org.example.kr_backend.service;

import org.example.kr_backend.models.User;
import org.example.kr_backend.models.dto.UserDto;

public interface DtoConverterInterface {
    UserDto toUserDto(User user);
}
