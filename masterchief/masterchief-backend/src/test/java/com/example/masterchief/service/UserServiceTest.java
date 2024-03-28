package com.example.masterchief.service;

import com.example.masterchief.dto.UserDTO;
import com.example.masterchief.model.Client;
import com.example.masterchief.model.User;
import com.example.masterchief.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserService userService;

    @Test
    void testGetUser() {
        long userId = 3L;
        User user = new Client(userId, "Kylian", "Mbappe", "km10@email.com", "password", "70 Parc des Princes", "1234567890");

        when(userRepository.findById(any())).thenReturn(Optional.of(user));
        Optional<UserDTO> userDTO = userService.getUser(userId);

        assertTrue(userDTO.isPresent());
    }

    @Test
    void testGetUserNotFound() {
        long userId = 3L;

        when(userRepository.findById(any())).thenReturn(Optional.empty());
        Optional<UserDTO> userDTO = userService.getUser(userId);

        assertTrue(userDTO.isEmpty());
    }
}
