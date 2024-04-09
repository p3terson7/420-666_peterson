package com.example.masterchief.controller;

import com.example.masterchief.dto.ConversationDTO;
import com.example.masterchief.repository.AdminRepository;
import com.example.masterchief.repository.UserRepository;
import com.example.masterchief.repository.security.SaltRepository;
import com.example.masterchief.service.*;
import com.example.masterchief.utils.JwtManipulator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ConversationController.class)
public class ConversationControllerTest {
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
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ConversationService conversationService;

    @Test
    @WithMockUser(username = "user")
    void getConversations_Success() throws Exception {
        Long userId = 1L;
        ConversationDTO conversation1 =  mock(ConversationDTO.class);
        ConversationDTO conversation2 = mock(ConversationDTO.class);
        List<ConversationDTO> conversations = Arrays.asList(conversation1, conversation2);

        when(conversationService.getConversationsByUserId(userId)).thenReturn(conversations);

        mockMvc.perform(get("/conversations/{userId}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(conversation1.getId().intValue())))
                .andExpect(jsonPath("$[1].id", is(conversation2.getId().intValue())));
    }
}
