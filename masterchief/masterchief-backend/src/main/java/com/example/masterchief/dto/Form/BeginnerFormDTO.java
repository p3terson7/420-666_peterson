package com.example.masterchief.dto.Form;

import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.model.Form.BeginnerForm;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BeginnerFormDTO extends FormDTO {
    private List<String> useCases;
    private String description;
    private List<String> rgbAccessories;
    private String budget;
    private String configuration;
    private String specificRequirements;

    public BeginnerFormDTO(
            Long id,
            ClientDTO client,
            List<String> useCases,
            String description,
            List<String> rgbAccessories,
            String budget,
            String configuration,
            String specificRequirements
    ) {
        super(id, client);
        this.client = client;
        this.useCases = useCases;
        this.description = description;
        this.rgbAccessories = rgbAccessories;
        this.budget = budget;
        this.configuration = configuration;
        this.specificRequirements = specificRequirements;
    }

    @Override
    public BeginnerForm fromDTO() {
        return new BeginnerForm(
                id,
                client.fromDTO(),
                useCases,
                description,
                rgbAccessories,
                budget,
                configuration,
                specificRequirements
        );
    }
}
