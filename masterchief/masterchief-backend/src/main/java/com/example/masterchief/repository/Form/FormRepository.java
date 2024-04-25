package com.example.masterchief.repository.Form;

import com.example.masterchief.model.Form.BeginnerForm;
import com.example.masterchief.model.Form.Form;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FormRepository extends JpaRepository<Form, Long> {
    List<Form> findByClientId(Long clientId);

}
