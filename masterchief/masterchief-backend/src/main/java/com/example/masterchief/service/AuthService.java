package com.example.masterchief.service;

import com.example.masterchief.dto.UserDTO;
import com.example.masterchief.model.User;
import com.example.masterchief.model.security.Salt;
import com.example.masterchief.repository.ClientRepository;
import com.example.masterchief.repository.UserRepository;
import com.example.masterchief.repository.security.SaltRepository;
import com.example.masterchief.security.login.SignInRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Data
@AllArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SaltRepository saltRepository;
    private final ClientRepository clientRepository;

    public Optional<UserDTO> signIn(SignInRequest signInRequest) {
        String email = signInRequest.getEmail();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        User user = optionalUser.orElseThrow(() -> new NoSuchElementException("User not found with email: " + email));
        Salt salt = saltRepository.findByUser(user).orElseThrow(() -> new NoSuchElementException("Salt not found for user: " + user.getId()));

        String pw = signInRequest.getPassword();
        String hashedPw = BCrypt.hashpw(pw, salt.getValue());

        if (!BCrypt.checkpw(pw, user.getPassword())) return Optional.empty();

        if (!hashedPw.equals(user.getPassword()))
            return Optional.empty();

        return optionalUser.map(User::toDTO);
    }
}
