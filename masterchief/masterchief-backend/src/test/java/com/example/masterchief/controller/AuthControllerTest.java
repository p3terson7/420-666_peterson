package com.example.masterchief.controller;

import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.dto.UserDTO;
import com.example.masterchief.repository.AdminRepository;
import com.example.masterchief.repository.ConversationRepository;
import com.example.masterchief.repository.Form.BeginnerFormRepository;
import com.example.masterchief.repository.Form.FormRepository;
import com.example.masterchief.repository.MessageRepository;
import com.example.masterchief.repository.UserRepository;
import com.example.masterchief.repository.security.SaltRepository;
import com.example.masterchief.security.jwt.TimedJwt;
import com.example.masterchief.service.*;
import com.example.masterchief.service.Form.BeginnerFormService;
import com.example.masterchief.service.Form.FormService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import com.example.masterchief.utils.JwtManipulator;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private AuthService authService;
    @MockBean
    private ClientService clientService;
    @MockBean
    private JwtManipulator jwtManipulator;
    @MockBean
    private UserRepository userRepository;
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
    @MockBean
    private SaltRepository saltRepository;
    @MockBean
    private BeginnerFormRepository beginnerFormRepository;
    @MockBean
    private BeginnerFormService beginnerFormService;
    @MockBean
    private FormService formService;
    @MockBean
    private FormRepository formRepository;
    @MockBean
    private UserService userService;
    @Test
    @WithMockUser
    public void testLogin_happyPath() throws Exception {
        UserDTO mockedUserDTO = mock(UserDTO.class);

        when(authService.signIn(any())).thenReturn(Optional.of(mockedUserDTO));
        when(jwtManipulator.generateToken(mockedUserDTO)).thenReturn(mock(TimedJwt.class));

        RequestBuilder request = MockMvcRequestBuilders
                .post("/auth/signIn").with(csrf())
                .accept(MediaType.APPLICATION_JSON)
                .content("{\"identification\":\"identification\",\"password\":\"password\"}")
                .contentType(MediaType.APPLICATION_JSON);

        mockMvc.perform(request).andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    public void testLogin_UserNotFound_soUnauthorized() throws Exception {
        when(authService.signIn(any())).thenReturn(Optional.empty());

        RequestBuilder request = MockMvcRequestBuilders
                .post("/auth/signIn").with(csrf())
                .accept(MediaType.APPLICATION_JSON)
                .content("{\"identification\":\"identification\",\"password\":\"password\"}")
                .contentType(MediaType.APPLICATION_JSON);

        mockMvc.perform(request).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    public void testClientSignup_happyPath() throws Exception {

        when(clientService.createClient(any())).thenReturn(Optional.of(mock(ClientDTO.class)));

        RequestBuilder request = MockMvcRequestBuilders
                .post("/auth/signUp").with(csrf())
                .content(createJsonOfClientDTO("existing@email.com"))
                .contentType(MediaType.APPLICATION_JSON);

        mockMvc.perform(request).andExpect(status().isCreated());
    }

    @Test
    @WithMockUser
    public void testSignupWithExistingEmailReturnsBadRequest() throws Exception {
        when(clientService.createClient(argThat(clientDto -> "existing@email.com".equals(clientDto.getEmail()))))
                .thenReturn(Optional.empty());

        RequestBuilder request = MockMvcRequestBuilders
                .post("/auth/signUp").with(csrf())
                .content(createJsonOfClientDTO("existing@email.com"))
                .contentType(MediaType.APPLICATION_JSON);

        mockMvc.perform(request)
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    public void testSignup_InvalidClient() throws Exception {
        ClientDTO mockedClientDTO = mock(ClientDTO.class);

        when(clientService.createClient(mockedClientDTO)).thenReturn(Optional.empty());

        RequestBuilder request = MockMvcRequestBuilders
                .post("/auth/signUp").with(csrf())
                .content(createJsonOfClientDTO(""))
                .contentType(MediaType.APPLICATION_JSON);
        mockMvc.perform(request).andExpect(status().isBadRequest());
    }

    // TODO: Use strings instead
    private String createJsonOfClientDTO(String mail) {
        return "{" +
                "\"firstName\":\"\"," +
                "\"lastName\":\"\"," +
                "\"email\":\"\"," +
                "\"password\":\"\"," +
                "\"address\":\"\"," +
                "\"phone\":\"\"," +
                "\"type\":\"client\"" +
                "}";
    }
}
