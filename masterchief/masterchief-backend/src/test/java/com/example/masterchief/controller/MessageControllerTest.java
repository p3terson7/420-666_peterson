package com.example.masterchief.controller;

import com.example.masterchief.controller.MessageController;
import com.example.masterchief.dto.MessageDTO;
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
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(MessageController.class)
public class MessageControllerTest {
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
    private ClientRepository clientRepository;
    @MockBean
    private ConversationRepository conversationRepository;
    @MockBean
    private ConversationService conversationService;
    @MockBean
    private MessageService messageService;
    @InjectMocks
    private MessageController messageController;
    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser
    public void testGetMessages_Success() throws Exception {
        Long conversationId = 1L;
        List<MessageDTO> messageDTOList = new ArrayList<>();

        when(messageService.getAllMessagesByConversationIdSortedByTimestamp(conversationId)).thenReturn(messageDTOList);

        mockMvc.perform(MockMvcRequestBuilders.get("/messages/{conversationId}", conversationId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    public void testSendMessage_Success() throws Exception {
        MessageDTO messageDTO = new MessageDTO();

        when(messageService.createMessage(any())).thenReturn(Optional.of(messageDTO));

        mockMvc.perform(MockMvcRequestBuilders.post("/messages/messages").with(csrf())
                        .content(asJsonString(messageDTO))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser
    public void testSendMessage_MessageNotCreated() throws Exception {
        MessageDTO messageDTO = new MessageDTO();

        when(messageService.createMessage(any())).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.post("/messages/messages").with(csrf())
                        .content(asJsonString(messageDTO))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }


    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
