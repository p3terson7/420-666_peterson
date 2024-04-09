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
}
