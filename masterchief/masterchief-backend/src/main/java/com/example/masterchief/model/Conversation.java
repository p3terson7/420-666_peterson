package com.example.masterchief.model;

import com.example.masterchief.dto.ConversationDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "conversation_gen")
    @SequenceGenerator(name = "conversation_gen", sequenceName = "conversation_sec", allocationSize = 1)
    @Column(name = "conversation_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL)
    private List<Message> messages = new ArrayList<>();

    public Conversation(Long id, Admin admin, Client client) {
        this.id = id;
        this.admin = admin;
        this.client = client;
    }

    public ConversationDTO toDTO() {
        return new ConversationDTO(id, admin.toDTO(), client.toDTO());
    }
}
