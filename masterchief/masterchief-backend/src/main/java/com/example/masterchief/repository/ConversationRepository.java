package com.example.masterchief.repository;

import com.example.masterchief.model.Admin;
import com.example.masterchief.model.Client;
import com.example.masterchief.model.Conversation;
import com.example.masterchief.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long>{
    Optional<Conversation> findByAdminAndClient(Admin admin, Client client);

    Optional<List<Conversation>> findByAdmin(Admin admin);
    Optional<List<Conversation>> findByClient(Client client);

    @Query("SELECT c FROM Conversation c WHERE c.admin.id = ?1 OR c.client.id = ?1")
    List<Conversation> findAllByAdminOrClientId(Long userId);
}
