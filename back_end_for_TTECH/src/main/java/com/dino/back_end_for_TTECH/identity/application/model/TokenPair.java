package com.dino.back_end_for_TTECH.identity.application.model;

import java.time.Duration;
import java.time.Instant;

public record TokenPair(
        String accessToken,
        Duration accessTokenTtl,
        Instant accessTokenExpiry,
        String refreshToken,
        Duration refreshTokenTtl,
        Instant refreshTokenExpiry) {
}
