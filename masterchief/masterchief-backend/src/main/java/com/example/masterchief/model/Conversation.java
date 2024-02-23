package com.example.masterchief.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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

}
