package com.example.masterchief.service;

import com.example.masterchief.dto.ConversationDTO;
import com.example.masterchief.model.Admin;
import com.example.masterchief.model.Client;
import com.example.masterchief.model.Conversation;
import com.example.masterchief.repository.AdminRepository;
import com.example.masterchief.repository.ClientRepository;
import com.example.masterchief.repository.ConversationRepository;
import com.example.masterchief.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final AdminRepository adminRepository;
    private final ClientRepository clientRepository;
    private final UserRepository userRepository;

    public ConversationService(ConversationRepository conversationRepository, AdminRepository adminRepository, ClientRepository clientRepository, UserRepository userRepository) {
        this.conversationRepository = conversationRepository;
        this.adminRepository = adminRepository;
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Optional<ConversationDTO> createConversation(ConversationDTO conversationDTO) {
        Admin admin = adminRepository.findById(conversationDTO.getAdmin().getId())
                .orElseThrow(() -> new IllegalArgumentException("Admin with ID " + conversationDTO.getAdmin().getId() + " not found"));
        Client client = clientRepository.findById(conversationDTO.getClient().getId())
                .orElseThrow(() -> new IllegalArgumentException("Client with ID " + conversationDTO.getClient().getId() + " not found"));

        Optional<Conversation> existingConversation = conversationRepository.findByAdminAndClient(admin, client);
        if (existingConversation.isPresent()) {
            return Optional.of(existingConversation.get().toDTO());
        }

        Conversation conversation = new Conversation();
        conversation.setAdmin(admin);
        conversation.setClient(client);

        return Optional.of(conversationRepository.save(conversation).toDTO());
    }

    public List<ConversationDTO> getConversationsByUserId(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));

        return conversationRepository
                .findAllByAdminOrClientId(userId)
                .stream()
                .map(Conversation::toDTO)
                .toList();
    }
}
