package com.example.masterchief.dto;

import com.example.masterchief.model.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private Long id;
    private UserDTO sender;
    private String content;
    private String timestamp;
    private ConversationDTO conversation;

    public Message fromDTO() {
        return new Message(
                id, sender.fromDTO(), conversation.fromDTO(), content, timestamp);
    }
}
