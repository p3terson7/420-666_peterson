package com.example.masterchief.service;

import com.example.masterchief.model.User;
import com.example.masterchief.model.security.Salt;
import com.example.masterchief.repository.security.SaltRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;

@AllArgsConstructor
public class GenericUserService <T extends User> {
    protected final SaltRepository saltRepository;

    protected void hashAndSaltPassword(T user) {
        String generatedSalt = BCrypt.gensalt();
        String hashedPassword = BCrypt.hashpw(user.getPassword(), generatedSalt);

        user.setPassword(hashedPassword);
        saltRepository.save(new Salt(null, user, generatedSalt));
    }
}