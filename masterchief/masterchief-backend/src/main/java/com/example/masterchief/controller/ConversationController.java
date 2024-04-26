package com.example.masterchief.controller;


import com.example.masterchief.controller.abstracts.LoggedController;
import com.example.masterchief.dto.ConversationDTO;
import com.example.masterchief.service.ConversationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/conversations")
public class ConversationController extends LoggedController {
    protected final ConversationService service;

    public ConversationController(ConversationService service) {
        this.service = service;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ConversationDTO>> getConversations(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getConversationsByUserId(userId));
    }

    @PostMapping("/{adminId}/{clientId}")
    public ResponseEntity<ConversationDTO> createConversation(@PathVariable Long adminId, @PathVariable Long clientId) {
        return service.createConversation(adminId, clientId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
