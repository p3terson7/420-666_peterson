package com.example.masterchief.service;

import com.example.masterchief.dto.AdminDTO;
import com.example.masterchief.model.security.Salt;
import com.example.masterchief.repository.AdminRepository;
import com.example.masterchief.repository.security.SaltRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {
    @Mock
    private SaltRepository saltRepository;
    @Mock
    private AdminRepository adminRepository;
    @InjectMocks
    private AdminService adminService;

    @Test
    void createAdmin_HappyPath() {
        AdminDTO adminDTO = createAdminDTO();

        when(adminRepository.save(any())).thenReturn(adminDTO.fromDTO());
        when(saltRepository.save(any())).thenReturn(mock(Salt.class));

        Optional<AdminDTO> optionalStudentDTO = adminService.createAdmin(adminDTO);

        assertThat(optionalStudentDTO).isPresent();
    }

    private AdminDTO createAdminDTO() {
        return new AdminDTO(1L, "Karim", "Benzema", "kb9@email.com", "password");
    }
}
