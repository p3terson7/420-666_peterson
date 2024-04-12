package com.example.masterchief.controller;

import com.example.masterchief.controller.abstracts.LoggedController;
import com.example.masterchief.dto.MessageDTO;
import com.example.masterchief.service.MessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/messages")
public class MessageController extends LoggedController {
    protected final MessageService service;

    public MessageController(MessageService service) {
        this.service = service;
    }

    @GetMapping("/{conversationId}")
    public ResponseEntity<List<MessageDTO>> getMessages(@PathVariable Long conversationId) {
        logger.info("getMessages");
        return ResponseEntity.ok(service.getAllMessagesByConversationIdSortedByTimestamp(conversationId));
    }

    @PostMapping("/messages")
    public ResponseEntity<HttpStatus> sendMessage(@RequestBody MessageDTO messageDTO) {
        logger.info("sendMessage");
        return service.createMessage(messageDTO)
                .map(message -> new ResponseEntity<HttpStatus>(HttpStatus.CREATED))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
