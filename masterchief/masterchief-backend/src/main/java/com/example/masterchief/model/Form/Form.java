package com.example.masterchief.model.Form;

import com.example.masterchief.dto.Form.FormDTO;
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

    public abstract FormDTO toDTO();
}
