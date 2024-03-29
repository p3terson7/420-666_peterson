package com.example.masterchief.service;

import com.example.masterchief.dto.AdminDTO;
import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.model.Admin;
import com.example.masterchief.model.Client;
import com.example.masterchief.repository.AdminRepository;
import com.example.masterchief.repository.security.SaltRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService extends GenericUserService<Admin> {
    private final AdminRepository adminRepository;

    public AdminService(SaltRepository saltRepository, AdminRepository adminRepository) {
        super(saltRepository);
        this.adminRepository = adminRepository;
    }

    @Transactional
    public Optional<AdminDTO> createAdmin(AdminDTO adminDTO) {
        if (adminDTO == null) {
            throw new IllegalArgumentException("AdminDTO cannot be null");
        }

        Optional<Admin> clientOptional = adminRepository.findByEmail(adminDTO.getEmail());
        if (clientOptional.isPresent()) {
            throw new IllegalArgumentException("Admin with email " + adminDTO.getEmail() + " already exists");
        }

        Admin admin = adminDTO.fromDTO();
        hashAndSaltPassword(admin);

        return Optional.of(adminRepository.save(admin).toDTO());
    }
}
