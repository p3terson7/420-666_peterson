package com.example.masterchief.dto.Form;

import com.example.masterchief.dto.AdminDTO;
import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.model.Form.Form;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = AdminDTO.class, name = "beginner"),
        @JsonSubTypes.Type(value = ClientDTO.class, name = "advanced"),
})
public abstract class FormDTO {
    protected Long id;

    public abstract Form fromDTO();
}
