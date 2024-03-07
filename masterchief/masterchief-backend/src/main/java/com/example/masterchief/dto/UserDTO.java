package com.example.masterchief.dto;

import com.example.masterchief.model.User;
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
        @JsonSubTypes.Type(value = AdminDTO.class, name = "admin"),
        @JsonSubTypes.Type(value = ClientDTO.class, name = "client"),
})
public abstract class UserDTO {
    protected Long id;
    protected String firstName;
    protected String lastName;
    protected String email;
    protected String password;

    public abstract User fromDTO();
}
