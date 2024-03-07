package com.example.masterchief.dto;

import com.example.masterchief.model.Client;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO extends UserDTO {
    private String address;
    private String phone;

    public ClientDTO(Long id,
                     String firstName,
                     String lastName,
                     String email,
                     String password,
                     String address,
                     String phone)
    {
        super(id, firstName, lastName, email, password);
        this.address = address;
        this.phone = phone;
    }
    @Override
    public Client fromDTO() {
        return new Client(
                id,
                firstName,
                lastName,
                email,
                password,
                address,
                phone
        );
    }
}
