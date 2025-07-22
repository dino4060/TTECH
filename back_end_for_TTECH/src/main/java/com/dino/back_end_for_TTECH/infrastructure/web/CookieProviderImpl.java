package com.dino.back_end_for_TTECH.infrastructure.web;

import java.time.Duration;

import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import com.dino.back_end_for_TTECH.identity.application.provider.IIdentityCookieProvider;
import com.dino.back_end_for_TTECH.infrastructure.security.model.JwtType;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CookieProviderImpl implements IIdentityCookieProvider {
    @Override
    public void attachRefreshToken(HttpHeaders headers, String refreshToken, Duration ttl) {
        // Set new cookie
        HttpCookie newCookie = ResponseCookie.from(JwtType.REFRESH_TOKEN.name(), refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(ttl)
                .build();
        headers.add(HttpHeaders.SET_COOKIE, newCookie.toString());
    }

    @Override
    public void clearRefreshToken(HttpHeaders headers) {
        // Set expired cookie
        ResponseCookie expiredCookie = ResponseCookie.from(JwtType.REFRESH_TOKEN.name(), "")
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(0)
                .build();

        headers.add(HttpHeaders.SET_COOKIE, expiredCookie.toString());
    }
}
