package com.dino.back_end_for_TTECH.features.identity.application;

import com.dino.back_end_for_TTECH.features.identity.application.service.ITokenService;
import com.dino.back_end_for_TTECH.features.identity.domain.Token;
import com.dino.back_end_for_TTECH.features.identity.domain.repository.ITokenRepository;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TokenServiceIm implements ITokenService {

    ITokenRepository tokenRepository;

    // QUERY //

    // getByUser //
    @Override
    public Token getByUserId(Long userId) {
        return this.tokenRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.TOKEN__FIND_FAILED));
    }

    @Override
    public Optional<Token> hasRefreshToken(String refreshToken, Long userId) {
        Token token = this.getByUserId(userId);

        if (!refreshToken.equals(token.getRefreshToken())) return Optional.empty();

        return Optional.of(token);
    }

    // COMMAND //

    @Override
    public void createToken(User user) {
        Token token = Token.createToken(user);
        this.tokenRepository.save(token);
    }

    // updateRefreshToken //
    @Override
    public void updateRefreshToken(String refreshToken, Instant refreshTokenExpiry, Long userId) {
        Token token = this.getByUserId(userId);

        token.updateRefreshToken(refreshToken, refreshTokenExpiry);
        this.tokenRepository.save(token);
    }

    @Override
    public void updateRefreshToken(String refreshToken, Instant refreshTokenExpiry, Token token) {
        token.updateRefreshToken(refreshToken, refreshTokenExpiry);
        this.tokenRepository.save(token);
    }

    @Override
    public void cleanRefreshToken(Token token) {
        this.updateRefreshToken("", null, token);
    }
}
