package com.dino.back_end_for_TTECH.features.identity.application.service;

import java.time.Instant;
import java.util.Optional;

import com.dino.back_end_for_TTECH.features.identity.domain.Token;
import com.dino.back_end_for_TTECH.features.profile.domain.User;

public interface ITokenService {

    Token getByUserId(Long userId);

    Optional<Token> hasRefreshToken(String refreshToken, Long userId);

    void createToken(User user);

    void updateRefreshToken(String refreshToken, Instant refreshTokenExpiry, Long userId);

    void updateRefreshToken(String refreshToken, Instant refreshTokenExpiry, Token token);

    void cleanRefreshToken(Token token);
}
