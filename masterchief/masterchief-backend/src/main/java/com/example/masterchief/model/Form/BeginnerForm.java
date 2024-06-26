package com.example.masterchief.model.Form;

import com.example.masterchief.dto.Form.BeginnerFormDTO;
import com.example.masterchief.model.Client;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class BeginnerForm extends Form {
    private List<String> useCases;
    private String description;
    private List<String> rgbAccessories;
    private String budget;
    private String configuration;
    private String specificRequirements;

    public BeginnerForm(Long id, Client client, List<String> useCases, String description, List<String> rgbAccessories, String budget, String configuration, String specificRequirements) {
        super(id, client);
        this.useCases = useCases;
        this.description = description;
        this.rgbAccessories = rgbAccessories;
        this.budget = budget;
        this.configuration = configuration;
        this.specificRequirements = specificRequirements;
    }

    @Override
    public BeginnerFormDTO toDTO() {
        return new BeginnerFormDTO(id, super.getClient().toDTO(), useCases, description, rgbAccessories, budget, configuration, specificRequirements);
    }
}
