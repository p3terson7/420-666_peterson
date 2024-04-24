package com.example.masterchief.service.Form;

import com.example.masterchief.dto.Form.BeginnerFormDTO;
import com.example.masterchief.model.Form.BeginnerForm;
import com.example.masterchief.repository.Form.BeginnerFormRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BeginnerFormService {
    private final BeginnerFormRepository beginnerFormRepository;

    public BeginnerFormService(BeginnerFormRepository beginnerFormRepository) {
        this.beginnerFormRepository = beginnerFormRepository;
    }

    @Transactional
    public Optional<BeginnerFormDTO> createBeginnerForm(BeginnerFormDTO beginnerFormDTO) {
        if (beginnerFormDTO == null) {
            throw new IllegalArgumentException("BeginnerFormDTO cannot be null");
        }

        return Optional.of(beginnerFormRepository.save(beginnerFormDTO.fromDTO()).toDTO());
    }
}
