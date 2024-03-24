package com.example.masterchief.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.masterchief.dto.AdminDTO;
import com.example.masterchief.dto.ClientDTO;
import com.example.masterchief.dto.UserDTO;
import com.example.masterchief.security.config.Authorities;
import com.example.masterchief.security.jwt.TimedJwt;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class JwtManipulator {
    private final String JWT_PREFIX = "Bearer ";
    private final String issuer;
    private final Algorithm signingAlgorithm;
    private final long expirationMs;

    @Autowired
    public JwtManipulator(
            @Value("${jwt.issuer}") String issuer,
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expirationMs}") int expirationMs
    ) {
        this.issuer = issuer;
        this.expirationMs = expirationMs;
        this.signingAlgorithm = Algorithm.HMAC256(secret);
    }

    public TimedJwt generateToken(UserDTO user) {
        return new TimedJwt(
                JWT.create()
                        .withSubject(user.getEmail())
                        .withIssuedAt(new Date())
                        .withClaim("id", user.getId())
                        .withClaim("email", user.getEmail())
                        .withClaim("authorities", determineAuthorities(user))
                        .withExpiresAt(new Date(new Date().getTime() + expirationMs))
                        .withIssuer(issuer)
                        .sign(signingAlgorithm),
                expirationMs
        );
    }

    public List<String> determineAuthorities(UserDTO user) {
        List<String> authorities = new ArrayList<>();

        if (user instanceof AdminDTO)
            authorities.add(Authorities.ADMIN.name());
        if (user instanceof ClientDTO)
            authorities.add(Authorities.CLIENT.name());

        authorities.add(Authorities.USER.name());

        return authorities;
    }

    public DecodedJWT decodeToken(String token) {
        return JWT.require(signingAlgorithm)
                .withIssuer(issuer)
                .build()
                .verify(token);
    }

    public Optional<String> getJwt(HttpServletRequest request) {
        String jwt = request.getHeader("Authorization");
        if (!isValid(jwt))
            return Optional.empty();

        return Optional.of(jwt.substring(JWT_PREFIX.length()));
    }

    private boolean isValid(String jwt) {
        if (jwt == null || jwt.isEmpty())
            return false;

        return jwt.length() > JWT_PREFIX.length() && jwt.startsWith(JWT_PREFIX);
    }
}
