package com.example.masterchief.service;

import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.model.Client;
import com.example.masterchief.repository.ClientRepository;
import com.example.masterchief.repository.security.SaltRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class ClientService extends GenericUserService<Client> {
    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository, SaltRepository saltRepository) {
        super(saltRepository);
        this.clientRepository = clientRepository;
    }

    @Transactional
    public Optional<ClientDTO> createClient(ClientDTO clientDTO) {
        if (clientDTO == null) {
            throw new IllegalArgumentException("ClientDTO cannot be null");
        }

        Optional<Client> clientOptional = clientRepository.findByEmail(clientDTO.getEmail());
        if (clientOptional.isPresent()) {
            throw new IllegalArgumentException("Client with email " + clientDTO.getEmail() + " already exists");
        }

        Client client = clientDTO.fromDTO();
        hashAndSaltPassword(client);

        return Optional.of(clientRepository.save(client).toDTO());
    }

    public Optional<ClientDTO> getClientByEmail(String email) {
        if (email == null) {
            throw new IllegalArgumentException("Email cannot be null");
        }

        return clientRepository.findByEmail(email).map(Client::toDTO);
    }
}
