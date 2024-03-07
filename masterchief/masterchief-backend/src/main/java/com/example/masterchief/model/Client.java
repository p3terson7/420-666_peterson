package com.example.masterchief.model;

import com.example.masterchief.dto.ClientDTO;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@ToString(callSuper = true)
@Entity
@Data
@NoArgsConstructor
public class Client extends User{
    private String address;
    private String phone;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    protected List<Conversation> conversations = new ArrayList<>();

    public Client(
            Long id,
            String firstname,
            String lastname,
            String email,
            String password,
            String address,
            String phone
    ) {
        super(id, firstname, lastname, email, password);
        this.address = address;
        this.phone = phone;
    }

    public ClientDTO toDTO() {
        return new ClientDTO(id, firstName, lastName, email, password, address, phone);
    }
}
