package com.example.masterchief;

import com.example.masterchief.dto.*;
import com.example.masterchief.service.AdminService;
import com.example.masterchief.service.ConversationService;
import com.example.masterchief.service.MessageService;
import com.example.masterchief.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
@AllArgsConstructor
public class MasterchiefApplication implements CommandLineRunner {
	private AdminService adminService;
	private ConversationService conversationService;
	private MessageService messageService;
	private UserService userService;
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

//		Optional<ConversationDTO> conversation = conversationService.createConversation(48L, 24L);
//		if (conversation.isPresent()) {
//			System.out.println("Conversation created successfully");
//		} else {
//			System.out.println("Conversation creation failed");
//		}
		List<ConversationDTO> conversations = new ArrayList<>();
		conversations.add(conversationService.getConversationsByUserId(24L).get(0));

		Optional<UserDTO> client = userService.getUser(24L);
		Optional<UserDTO> admin = userService.getUser(48L);

//		Optional<MessageDTO> message = messageService.createMessage(new MessageDTO(null, client.get(), "Took a walk in the park", LocalDateTime.now().toString(), conversations.get(0)));
//		Optional<MessageDTO> message3 = messageService.createMessage(new MessageDTO(null, client.get(), "These dogs didn't dare to bark", LocalDateTime.now().toString(), conversations.get(0)));
//		Optional<MessageDTO> message2 = messageService.createMessage(new MessageDTO(null, admin.get(), "The shit you say is very dark", LocalDateTime.now().toString(), conversations.get(0)));

//		Optional<MessageDTO> message = messageService.createMessage(new MessageDTO(null, admin.get(), "Hold on let me check the stats", LocalDateTime.now().toString(), conversations.get(0)));
//		Optional<MessageDTO> message3 = messageService.createMessage(new MessageDTO(null, client.get(), "I got hella cheese and my pockets full of racks", LocalDateTime.now().toString(), conversations.get(0)));
//		Optional<MessageDTO> message2 = messageService.createMessage(new MessageDTO(null, admin.get(), "I been in the trap, you been hanging with the rats", LocalDateTime.now().toString(), conversations.get(0)));

	}
}
