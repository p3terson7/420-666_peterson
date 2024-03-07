package com.example.masterchief.model;

import com.example.masterchief.dto.MessageDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "message_gen")
    @SequenceGenerator(name = "message_gen", sequenceName = "message_sec", allocationSize = 1)
    @Column(name = "message_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    private String content;
    private String timestamp;

    public MessageDTO toDTO() {
        return new MessageDTO(id, sender.toDTO(), content, timestamp, conversation.toDTO());
    }
}
