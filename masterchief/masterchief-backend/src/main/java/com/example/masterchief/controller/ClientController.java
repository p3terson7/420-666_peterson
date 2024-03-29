package com.example.masterchief.controller;

import com.example.masterchief.controller.abstracts.GenericUserController;
import com.example.masterchief.model.Client;
import com.example.masterchief.service.ClientService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/clients")
public class ClientController extends GenericUserController<Client, ClientService> {
    public ClientController(ClientService clientService) {
        super(clientService);
    }
}

