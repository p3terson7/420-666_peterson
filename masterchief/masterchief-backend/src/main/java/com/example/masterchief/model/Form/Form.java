package com.example.masterchief.model.Form;

import com.example.masterchief.dto.Form.FormDTO;
import com.example.masterchief.model.Client;
import com.example.masterchief.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQUENCE_FORM")
    @SequenceGenerator(name = "SEQUENCE_FORM", sequenceName = "FORM_SEC", allocationSize = 1)
    protected Long id;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    public abstract FormDTO toDTO();
}
