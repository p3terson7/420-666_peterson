package com.example.masterchief.controller;

import com.example.masterchief.controller.abstracts.LoggedController;
import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/clients")
@AllArgsConstructor
public class ClientController extends LoggedController {
    private final ClientService clientService;

    @PostMapping("/signup")
    public ResponseEntity<?> createClient(@RequestBody ClientDTO clientDTO) {
        logger.info("createClient");
        try {
            return clientService.createClient(clientDTO)
                    .map(client -> ResponseEntity.status(HttpStatus.CREATED).body(client))
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}

