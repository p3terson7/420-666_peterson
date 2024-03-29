package com.example.masterchief.service;

import com.example.masterchief.dto.ConversationDTO;
import com.example.masterchief.model.Admin;
import com.example.masterchief.model.Client;
import com.example.masterchief.model.Conversation;
import com.example.masterchief.repository.AdminRepository;
import com.example.masterchief.repository.ClientRepository;
import com.example.masterchief.repository.ConversationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final AdminRepository adminRepository;
    private final ClientRepository clientRepository;

    // Constructor injection of repositories
    public ConversationService(ConversationRepository conversationRepository, AdminRepository adminRepository, ClientRepository clientRepository) {
        this.conversationRepository = conversationRepository;
        this.adminRepository = adminRepository;
        this.clientRepository = clientRepository;
    }

    @Transactional
    public Optional<ConversationDTO> createConversation(Long adminId, Long clientId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new IllegalArgumentException("Admin with ID " + adminId + " not found"));
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client with ID " + clientId + " not found"));

        Optional<Conversation> existingConversation = conversationRepository.findByAdminAndClient(admin, client);
        if (existingConversation.isPresent()) {
            return Optional.of(existingConversation.get().toDTO());
        }

        Conversation conversation = new Conversation();
        conversation.setAdmin(admin);
        conversation.setClient(client);

        return Optional.of(conversationRepository.save(conversation).toDTO());
    }
}