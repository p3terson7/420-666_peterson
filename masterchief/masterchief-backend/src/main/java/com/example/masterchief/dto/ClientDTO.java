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
    private String colorCode;

    public ClientDTO(Long id,
                     String firstName,
                     String lastName,
                     String email,
                     String password,
                     String address,
                     String phone,
                     String colorCode)
    {
        super(id, firstName, lastName, email, password);
        this.address = address;
        this.phone = phone;
        this.colorCode = colorCode;
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
