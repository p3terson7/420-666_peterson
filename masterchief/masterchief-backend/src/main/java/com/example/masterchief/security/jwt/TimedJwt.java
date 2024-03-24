package com.example.masterchief.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TimedJwt {
    private String jwt;
    private long expiration;
}