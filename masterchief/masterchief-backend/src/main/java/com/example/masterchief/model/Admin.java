package com.example.masterchief.model;

import com.example.masterchief.dto.AdminDTO;
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
public class Admin extends User{

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    protected List<Conversation> conversations = new ArrayList<>();

    public Admin(
            Long id,
            String firstname,
            String lastname,
            String email,
            String password
    ) {
        super(id, firstname, lastname, email, password);
    }

    public AdminDTO toDTO() {
        return new AdminDTO(id, firstName, lastName, email, password);
    }
}
