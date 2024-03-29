package com.example.masterchief.repository;

import com.example.masterchief.model.Admin;
import com.example.masterchief.model.Client;
import com.example.masterchief.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long>{
    Optional<Conversation> findByAdminAndClient(Admin admin, Client client);
}
