package com.example.masterchief.service.Form;

import com.example.masterchief.dto.Form.FormDTO;
import com.example.masterchief.model.Form.Form;
import com.example.masterchief.repository.Form.FormRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FormService {
    private final FormRepository formRepository;

    public FormService(FormRepository formRepository) {
        this.formRepository = formRepository;
    }

    public List<FormDTO> getFormByUserId(Long userId) {
        return formRepository.findByUserId(userId).stream()
                .map(Form::toDTO)
                .collect(Collectors.toList());
    }
}
