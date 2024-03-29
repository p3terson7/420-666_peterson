package com.example.masterchief.repository.security;

import com.example.masterchief.model.User;
import com.example.masterchief.model.security.Salt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SaltRepository extends JpaRepository<Salt, Long> {
    Optional<Salt> findByUser(User user);
}
