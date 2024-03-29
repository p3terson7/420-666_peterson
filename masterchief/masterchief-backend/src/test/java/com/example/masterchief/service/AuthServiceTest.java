package com.example.masterchief.service;

import com.example.masterchief.dto.UserDTO;
import com.example.masterchief.model.User;
import com.example.masterchief.model.security.Salt;
import com.example.masterchief.repository.UserRepository;
import com.example.masterchief.repository.security.SaltRepository;
import com.example.masterchief.security.login.SignInRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private SaltRepository saltRepository;

    @InjectMocks
    private AuthService authService;

    @Test
    public void testLogin_happyPath() {
        SignInRequest signInRequest = new SignInRequest("email@email.com", "password");
        User mockedUser = mock(User.class);
        Salt salt = createNewSalt(mockedUser);

        String hashedPw = BCrypt.hashpw("password", salt.getValue());

        when(userRepository.findByEmail(signInRequest.getEmail())).thenReturn(Optional.of(mockedUser));
        when(saltRepository.findByUser(mockedUser)).thenReturn(Optional.of(salt));
        when(mockedUser.getPassword()).thenReturn(hashedPw);
        when(mockedUser.toDTO()).thenReturn(mock(UserDTO.class));

        Optional<UserDTO> userDTO = authService.signIn(signInRequest);

        assertThat(userDTO).isPresent();
    }

    @Test
    public void testLogin_invalidEmail() {
        SignInRequest signInRequest = new SignInRequest("email@email.com", "password");

        when(userRepository.findByEmail(signInRequest.getEmail())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.signIn(signInRequest))
                .isInstanceOf(NoSuchElementException.class);
    }

    @Test
    public void testLogin_invalidPassword() {
        SignInRequest signInRequest = new SignInRequest("email@email.com", "password");
        User mockedUser = mock(User.class);

        Salt salt = createNewSalt(mockedUser);

        when(userRepository.findByEmail(signInRequest.getEmail())).thenReturn(Optional.of(mockedUser));
        when(saltRepository.findByUser(mockedUser)).thenReturn(Optional.of(salt));
        when(mockedUser.getPassword()).thenReturn(BCrypt.hashpw("wrongPassword", salt.getValue()));

        assertThat(authService.signIn(signInRequest)).isEmpty();
    }

    private Salt createNewSalt(User user) {
        String generatedSalt = BCrypt.gensalt();
        return new Salt(null, user, generatedSalt);
    }
}
