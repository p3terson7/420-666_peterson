package com.example.masterchief.controller;

import com.example.masterchief.controller.abstracts.GenericUserController;
import com.example.masterchief.controller.abstracts.LoggedController;
import com.example.masterchief.dto.UserDTO;
import com.example.masterchief.model.User;
import com.example.masterchief.security.login.SignInRequest;
import com.example.masterchief.service.AuthService;
import com.example.masterchief.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController extends GenericUserController<User, UserService> {
    public UserController(UserService userService) {
        super(userService);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable long id) {
        Optional<UserDTO> userOptional = service.getUser(id);

        if (userOptional.isPresent()) {
            UserDTO userDTO = userOptional.get();
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
