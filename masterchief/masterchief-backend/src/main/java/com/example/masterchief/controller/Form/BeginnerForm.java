package com.example.masterchief.controller.Form;

import com.example.masterchief.controller.abstracts.LoggedController;
import com.example.masterchief.dto.Form.BeginnerFormDTO;
import com.example.masterchief.dto.Form.FormDTO;
import com.example.masterchief.service.Form.BeginnerFormService;
import com.example.masterchief.service.Form.FormService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/forms")
public class BeginnerForm extends LoggedController {
    protected final BeginnerFormService beginnerFormService;
    protected final FormService formService;

    public BeginnerForm(BeginnerFormService beginnerFormService, FormService formService) {
        this.beginnerFormService = beginnerFormService;
        this.formService = formService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<FormDTO>> getForms(@PathVariable Long userId) {
        logger.info("getForms");
        return ResponseEntity.ok(formService.getFormsByUserId(userId));
    }

    @PostMapping("/forms")
    public ResponseEntity<HttpStatus> createBeginnerForm(@RequestBody BeginnerFormDTO beginnerFormDTO) {
        logger.info("createForm");
        return beginnerFormService.createBeginnerForm(beginnerFormDTO)
                .map(form -> new ResponseEntity<HttpStatus>(HttpStatus.CREATED))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
