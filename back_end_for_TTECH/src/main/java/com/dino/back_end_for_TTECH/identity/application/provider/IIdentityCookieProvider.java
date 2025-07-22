package com.dino.back_end_for_TTECH.identity.application.provider;

import org.springframework.http.HttpHeaders;

import java.time.Duration;

public interface IIdentityCookieProvider {

    void attachRefreshToken(HttpHeaders headers, String refreshToken, Duration ttl);

    void clearRefreshToken(HttpHeaders headers);
}
