package com.example.masterchief.model;

import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.model.Form.Form;
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
public class Client extends User {
    private String address;
    private String phone;
    private String colorCode;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    protected List<Conversation> conversations = new ArrayList<>();

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    protected List<Form> forms = new ArrayList<>();

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
        this.colorCode = randomColorCode();
    }

    public String randomColorCode() {
        String[] colors = {
                "#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#8e44ad", "#27ae60",
                "#f39c12"
        };
        return colors[(int) (Math.random() * colors.length)];
    }

    public ClientDTO toDTO() {
        return new ClientDTO(id, firstName, lastName, email, password, address, phone, colorCode);
    }
}
