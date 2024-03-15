package com.example.masterchief.controller;

import com.example.masterchief.controller.abstracts.LoggedController;
import com.example.masterchief.dto.UserDTO;
import com.example.masterchief.security.login.SignInRequest;
import com.example.masterchief.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController extends LoggedController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<UserDTO> signIn(@RequestBody SignInRequest signInRequest) {
        try {
            UserDTO userDTO = authService.signIn(signInRequest.getEmail(), signInRequest.getPassword());
            return ResponseEntity.ok(userDTO);
        } catch (NoSuchElementException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}
