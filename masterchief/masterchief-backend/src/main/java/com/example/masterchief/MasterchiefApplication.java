package com.example.masterchief;

import com.example.masterchief.dto.AdminDTO;
import com.example.masterchief.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Optional;

@SpringBootApplication
@AllArgsConstructor
public class MasterchiefApplication implements CommandLineRunner {
	private AdminService adminService;
	public static void main(String[] args) {
		SpringApplication.run(MasterchiefApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Optional<AdminDTO> optionalAdminDTO = adminService.createAdmin(new AdminDTO(null, "Karim", "Benzema", "kb9@email.com", "Lolface1232!"));
		if (optionalAdminDTO.isPresent()) {
			System.out.println("Admin created successfully");
		} else {
			System.out.println("Admin creation failed");
		}
	}
}
