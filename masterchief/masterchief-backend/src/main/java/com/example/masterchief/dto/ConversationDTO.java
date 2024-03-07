package com.example.masterchief.dto;

import com.example.masterchief.model.Conversation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDTO {
    private Long id;
    private AdminDTO admin;
    private ClientDTO client;

    public Conversation fromDTO() {
        return new Conversation(id, admin.fromDTO(), client.fromDTO());
    }
}
