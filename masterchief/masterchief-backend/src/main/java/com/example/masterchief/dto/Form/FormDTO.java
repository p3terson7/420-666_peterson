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
        @JsonSubTypes.Type(value = BeginnerFormDTO.class, name = "beginner"),
})
public abstract class FormDTO {
    protected Long id;
    protected ClientDTO client;

    public abstract Form fromDTO();
}
