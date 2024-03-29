package com.example.masterchief.controller.abstracts;

import com.example.masterchief.model.User;
import com.example.masterchief.service.GenericUserService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public abstract class GenericUserController <E extends User, T extends GenericUserService<E>> extends LoggedController {
    protected final T service;
}

