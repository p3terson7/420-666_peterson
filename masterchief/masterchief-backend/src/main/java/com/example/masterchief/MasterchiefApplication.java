package com.example.masterchief;

import com.example.masterchief.dto.AdminDTO;
import com.example.masterchief.dto.ConversationDTO;
import com.example.masterchief.service.AdminService;
import com.example.masterchief.service.ConversationService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Optional;

@SpringBootApplication
@AllArgsConstructor
public class MasterchiefApplication implements CommandLineRunner {
	private AdminService adminService;
	private ConversationService conversationService;
	public static void main(String[] args) {
		SpringApplication.run(MasterchiefApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		Optional<AdminDTO> optionalAdminDTO = adminService.createAdmin(new AdminDTO(null, "Karim", "Benzema", "kb9@email.com", "Lolface1232!"));
//		if (optionalAdminDTO.isPresent()) {
//			System.out.println("Admin created successfully");
//		} else {
//			System.out.println("Admin creation failed");
//		}

//		Optional<ConversationDTO> conversation = conversationService.createConversation(25L, 24L);
//		if (conversation.isPresent()) {
//			System.out.println("Conversation created successfully");
//		} else {
//			System.out.println("Conversation creation failed");
//		}
	}
}
