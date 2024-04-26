package com.example.masterchief.controller;

import com.example.masterchief.dto.AdminDTO;
import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.dto.ConversationDTO;
import com.example.masterchief.model.Admin;
import com.example.masterchief.model.Client;
import com.example.masterchief.model.Conversation;
import com.example.masterchief.repository.AdminRepository;
import com.example.masterchief.repository.ClientRepository;
import com.example.masterchief.repository.ConversationRepository;
import com.example.masterchief.repository.Form.BeginnerFormRepository;
import com.example.masterchief.repository.Form.FormRepository;
import com.example.masterchief.repository.UserRepository;
import com.example.masterchief.repository.security.SaltRepository;
import com.example.masterchief.service.*;
import com.example.masterchief.service.Form.BeginnerFormService;
import com.example.masterchief.service.Form.FormService;
import com.example.masterchief.utils.JwtManipulator;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.example.masterchief.dto.ConversationDTO;
import com.example.masterchief.service.ConversationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
    @MockBean
    private BeginnerFormRepository beginnerFormRepository;
    @MockBean
    private BeginnerFormService beginnerFormService;
    @MockBean
    private FormService formService;
    @MockBean
    private FormRepository formRepository;
    @MockBean
    private MessageService messageService;
    @MockBean
    private ClientRepository clientRepository;
    @MockBean
    private ConversationRepository conversationRepository;
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ConversationService conversationService;

    @Test
    @WithMockUser(username = "user")
    void getConversations_Success() throws Exception {
        Long userId = 1L;
        ConversationDTO conversation1 = mock(ConversationDTO.class);
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

