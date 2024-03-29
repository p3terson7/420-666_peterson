package com.example.masterchief.service;

import com.example.masterchief.dto.AdminDTO;
import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.dto.ConversationDTO;
import com.example.masterchief.dto.MessageDTO;
import com.example.masterchief.model.Message;
import com.example.masterchief.repository.MessageRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class MessageServiceTest {
    @Mock
    private MessageRepository messageRepository;
    @InjectMocks
    private MessageService messageService;

    @Test
    void createMessage_WithValidMessageDTO_ReturnsMessageDTO() {
        AdminDTO adminDTO = createAdminDTO();
        ConversationDTO conversationDTO = createConversationDTO();
        MessageDTO messageDTO = createMessageDTO();
        Message message = messageDTO.fromDTO();

        when(messageRepository.save(any(Message.class))).thenReturn(message);

        Optional<MessageDTO> result = messageService.createMessage(messageDTO);

        assertThat(result).isPresent();
        verify(messageRepository).save(any(Message.class));
    }

    @Test
    void createMessage_WithNullMessageDTO_ThrowsIllegalArgumentException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> messageService.createMessage(null));
        assertThat(exception.getMessage()).contains("MessageDTO cannot be null");
    }

    @Test
    void createMessage_WithMessageDTOHavingNoConversation_ThrowsIllegalArgumentException() {
        MessageDTO messageDTO = new MessageDTO(null, createAdminDTO(), "Content without conversation", "2023-03-29T12:00:00", null);

        Exception exception = assertThrows(IllegalArgumentException.class, () -> messageService.createMessage(messageDTO));
        assertThat(exception.getMessage()).contains("This message has no conversation");
    }

    private AdminDTO createAdminDTO() {
        return new AdminDTO(null, "Karim", "Benzema", "kb11@email.com", "password");
    }
    private ClientDTO createClientDTO() {
        return new ClientDTO(null, "Kylian", "Mbappe", "km10@email.com", "password", "70 Parc des Princes", "1234567890");
    }
    private ConversationDTO createConversationDTO() {
        return new ConversationDTO(null, createAdminDTO(), createClientDTO());
    }
    private MessageDTO createMessageDTO() {
        return new MessageDTO(null, createAdminDTO(), "Hello, World!", "2023-03-29T12:00:00", createConversationDTO());
    }

}
