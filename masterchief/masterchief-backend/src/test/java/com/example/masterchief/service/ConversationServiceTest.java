package com.example.masterchief.service;

import com.example.masterchief.dto.AdminDTO;
import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.dto.ConversationDTO;
import com.example.masterchief.model.Admin;
import com.example.masterchief.model.Client;
import com.example.masterchief.model.Conversation;
import com.example.masterchief.repository.AdminRepository;
import com.example.masterchief.repository.ClientRepository;
import static org.assertj.core.api.Assertions.assertThat;
import com.example.masterchief.repository.ConversationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ConversationServiceTest {
    @Mock
    private AdminRepository adminRepository;
    @Mock
    private ClientRepository clientRepository;
    @Mock
    private ConversationRepository conversationRepository;
    @InjectMocks
    private ConversationService conversationService;

    @Test
    void createConversation_HappyPath() {
        Admin admin = createAdminDTO().fromDTO();
        Client client = createClientDTO().fromDTO();
        Conversation conversation = createConversationDTO().fromDTO();

        when(adminRepository.findById(admin.getId())).thenReturn(Optional.of(admin));
        when(clientRepository.findById(client.getId())).thenReturn(Optional.of(client));
        when(conversationRepository.findByAdminAndClient(admin, client)).thenReturn(Optional.empty());
        when(conversationRepository.save(any(Conversation.class))).thenReturn(conversation);

        Optional<ConversationDTO> result = conversationService.createConversation(admin.getId(), client.getId());

        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(conversation.getId());
    }

    @Test
    void createConversation_ConversationExists() {
        Admin admin = createAdminDTO().fromDTO();
        Client client = createClientDTO().fromDTO();
        Conversation conversation = createConversationDTO().fromDTO();

        when(adminRepository.findById(admin.getId
        ())).thenReturn(Optional.of(admin));
        when(clientRepository.findById(client.getId())).thenReturn(Optional.of(client));
        when(conversationRepository.findByAdminAndClient(admin, client)).thenReturn(Optional.of(conversation));

        Optional<ConversationDTO> result = conversationService.createConversation(admin.getId(), client.getId());

        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(conversation.getId());
    }

    @Test
    void createConversation_AdminNotFound() {
        Admin admin = createAdminDTO().fromDTO();
        Client client = createClientDTO().fromDTO();

        when(adminRepository.findById(admin.getId())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> conversationService.createConversation(admin.getId(), client.getId()))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Admin with ID " + admin.getId() + " not found");
    }

    @Test
    void createConversation_ClientNotFound() {
        Admin admin = createAdminDTO().fromDTO();
        Client client = createClientDTO().fromDTO();

        when(adminRepository.findById(admin.getId())).thenReturn(Optional.of(admin));
        when(clientRepository.findById(client.getId())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> conversationService.createConversation(admin.getId(), client.getId()))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Client with ID " + client.getId() + " not found");
    }

    private AdminDTO createAdminDTO() {
        return new AdminDTO(1L, "Karim", "Benzema", "kb9@email.com", "password");
    }
    private ClientDTO createClientDTO() {
        return new ClientDTO(2L, "Kylian", "Mbappe", "km10@email.com", "password", "70 Parc des Princes", "1234567890");
    }
    private ConversationDTO createConversationDTO() {
        return new ConversationDTO(3L, createAdminDTO(), createClientDTO());
    }
}
