package com.example.masterchief;

import com.example.masterchief.dto.AdminDTO;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Optional;

@SpringBootApplication
public class MasterchiefApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(MasterchiefApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Optional<AdminDTO> optionalAdminDTO = Optional.empty();
	}
}
