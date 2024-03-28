package com.example.masterchief.controller;

import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.dto.UserDTO;
import com.example.masterchief.repository.UserRepository;
import com.example.masterchief.security.jwt.TimedJwt;
import com.example.masterchief.service.AuthService;
import com.example.masterchief.service.ClientService;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
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
}
