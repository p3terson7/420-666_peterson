package com.example.masterchief.dto;

import com.example.masterchief.model.Admin;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdminDTO extends UserDTO {

    public AdminDTO(Long id,
                    String firstName,
                    String lastName,
                    String email,
                    String password)
    {
        super(id, firstName, lastName, email, password);
    }
    @Override
    public Admin fromDTO() {
        return new Admin(
                id,
                firstName,
                lastName,
                email,
                password
        );
    }
}
