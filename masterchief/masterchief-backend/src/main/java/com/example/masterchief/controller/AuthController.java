package com.example.masterchief.controller;

import com.example.masterchief.controller.abstracts.LoggedController;
import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.dto.UserDTO;
import com.example.masterchief.security.jwt.TimedJwt;
import com.example.masterchief.security.login.SignInRequest;
import com.example.masterchief.service.AuthService;
import com.example.masterchief.service.ClientService;
import com.example.masterchief.utils.JwtManipulator;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController extends LoggedController {
    private AuthService authService;
    private final ClientService clientService;
    private final JwtManipulator jwtManipulator;


    @PostMapping("/signin")
    public ResponseEntity<UserDTO> signIn(@RequestBody SignInRequest signInRequest) {
        try {
            UserDTO userDTO = authService.signIn(signInRequest.getEmail(), signInRequest.getPassword());
            return ResponseEntity.ok(userDTO);
        } catch (NoSuchElementException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<TimedJwt> login(@RequestBody SignInRequest signInRequest) {
        logger.info("login");

        Optional<UserDTO> loggedUser = authService.login(signInRequest);

        if (loggedUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        TimedJwt jwt = jwtManipulator.generateToken(loggedUser.get());
        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createClient(@RequestBody ClientDTO clientDTO) {
        logger.info("createClient");
        try {
            return clientService.createClient(clientDTO)
                    .map(client -> ResponseEntity.status(HttpStatus.CREATED).body(client))
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
