package com.dino.back_end_for_TTECH.infrastructure.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

// NOTE: Lombok Constructors
// @RequiredArgsConstructor: create a constructor excluding @NonFinal and @Nullable fields
// @ConfigurationProperties(prefix = "jwt.access"): detach env util
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PUBLIC)
public class Env {
    // JWT //

    @Value("${jwt.access.secret-key}")
    String ACCESS_SECRET_KEY;

    @Value("${jwt.access.ttl-min}")
    Long ACCESS_TTL_MIN;

    @Value("${jwt.refresh.secret-key}")
    String REFRESH_SECRET_KEY;

    @Value("${jwt.refresh.ttl-days}")
    Long REFRESH_TTL_DAYS;

    // OAUTH2 GOOGLE //

    @Value("${oauth2.google.client-id}")
    String CLIENT_ID;

    @Value("${oauth2.google.client-secret}")
    String CLIENT_SECRET;

    @Value("${oauth2.google.redirect-uri}")
    String REDIRECT_URI;

    @Value("${oauth2.google.grant-type}")
    String GRANT_TYPE;

    // STATIC FILE RESOURCES //

    @Value("${file.location}")
    String FILE_LOCATION;

    @Value("${file.endpoint}")
    String FILE_ENDPOINT;

}
