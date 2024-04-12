package com.example.masterchief.controller;

import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.dto.UserDTO;
import com.example.masterchief.repository.AdminRepository;
import com.example.masterchief.repository.ConversationRepository;
import com.example.masterchief.repository.MessageRepository;
import com.example.masterchief.repository.UserRepository;
import com.example.masterchief.repository.security.SaltRepository;
import com.example.masterchief.service.*;
import com.example.masterchief.utils.JwtManipulator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private JwtManipulator jwtManipulator;
    @MockBean
    private AuthService authService;
    @MockBean
    private ClientService clientService;
    @MockBean
    private UserService userService;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private SaltRepository saltRepository;
    @MockBean
    private AdminRepository adminRepository;
    @MockBean
    private AdminService adminService;
    @MockBean
    private ConversationRepository conversationRepository;
    @MockBean
    private ConversationService conversationService;
    @MockBean
    private MessageRepository messageRepository;
    @MockBean
    private MessageService messageService;


    @Test
    @WithMockUser(username = "user")
    void testGetUser() throws Exception {
        long userId = 1L;
        ClientDTO userDTO = new ClientDTO(userId, "peterson", "sara", "lesun@live.com", "password", "3 York St", "4387253892");
        Optional<UserDTO> userOptional = Optional.of(userDTO);
        when(userService.getUser(userId)).thenReturn(userOptional);

        mockMvc.perform(get("/users/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(userDTO.getId().intValue())))
                .andExpect(jsonPath("$.firstName", is(userDTO.getFirstName())))
                .andExpect(jsonPath("$.lastName", is(userDTO.getLastName())))
                .andExpect(jsonPath("$.email", is(userDTO.getEmail())))
                .andExpect(jsonPath("$.address", is(userDTO.getAddress())))
                .andExpect(jsonPath("$.phone", is(userDTO.getPhone())));
    }

    @Test
    @WithMockUser(username = "user")
    void testGetUserNotFound() throws Exception {
        when(userService.getUser(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/users/{id}", 1L))
                .andExpect(status().isNotFound());
    }
}
