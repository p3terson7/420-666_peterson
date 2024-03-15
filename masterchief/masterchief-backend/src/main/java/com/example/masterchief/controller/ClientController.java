package com.example.masterchief.controller;

import com.example.masterchief.controller.abstracts.LoggedController;
import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/clients")
@AllArgsConstructor
public class ClientController extends LoggedController {
    private final ClientService clientService;

    @PostMapping("/signup")
    public ResponseEntity<HttpStatus> createClient(@RequestBody ClientDTO clientDTO) {
        logger.info("createClient");
        return clientService.createClient(clientDTO)
                .map(client -> new ResponseEntity<HttpStatus>(HttpStatus.CREATED))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }
}
