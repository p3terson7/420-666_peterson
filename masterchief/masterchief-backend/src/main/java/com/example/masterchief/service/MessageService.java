package com.example.masterchief.service;

import com.example.masterchief.dto.MessageDTO;
import com.example.masterchief.repository.MessageRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    @Transactional
    public Optional<MessageDTO> createMessage(MessageDTO messageDTO) {
        if (messageDTO == null) {
            throw new IllegalArgumentException("MessageDTO cannot be null");
        }
        if (messageDTO.getConversation() == null) {
            throw new IllegalArgumentException("This message has no conversation");
        }

        return Optional.of(messageRepository.save(messageDTO.fromDTO()).toDTO());
    }

}
