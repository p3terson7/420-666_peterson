package com.example.masterchief.service;

import com.example.masterchief.dto.UserDTO;
import com.example.masterchief.model.User;
import com.example.masterchief.repository.UserRepository;
import com.example.masterchief.repository.security.SaltRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService extends GenericUserService<User>{
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, SaltRepository saltRepository) {
        super(saltRepository);
        this.userRepository = userRepository;
    }

    public Optional<UserDTO> getUser(Long id) {
        return userRepository.findById(id).map(User::toDTO);
    }

}
