package com.dino.back_end_for_TTECH.infrastructure.security;

import com.dino.back_end_for_TTECH.features.identity.application.model.TokenPair;
import com.dino.back_end_for_TTECH.features.identity.application.provider.IIdentitySecurityProvider;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import com.dino.back_end_for_TTECH.infrastructure.common.Env;
import com.dino.back_end_for_TTECH.infrastructure.security.model.JwtType;
import com.dino.back_end_for_TTECH.shared.application.utils.Id;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.crypto.spec.SecretKeySpec;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;
import java.util.Set;
import java.util.StringJoiner;
import java.util.stream.Collectors;

// NOTE: RequiredArgsConstructor
// create a constructor for final and @NonNull fields

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SecurityProviderImpl implements IIdentitySecurityProvider {

    Env env;

    PasswordEncoder passwordEncoder;

    /**
     * // buildScope //
     *
     * @param roles: Set<String>
     * @return scope: String. Example "ADMIN_SELLER_USER"
     * @des It means to build roles. Scope is a claim of jwt payload
     */
    private String buildScope(Set<String> roles) {
        StringJoiner stringJoiner = new StringJoiner(" ");

        if (!CollectionUtils.isEmpty(roles))
            roles.forEach(stringJoiner::add);

        return stringJoiner.toString();
    }

    // getSecretKey //
    private byte[] getSecretKey(JwtType jwtType) {
        return switch (jwtType) {
            case REFRESH_TOKEN -> this.env.REFRESH_SECRET_KEY.getBytes();
            case ACCESS_TOKEN -> this.env.ACCESS_SECRET_KEY.getBytes();
        };
    }

    // getTimeToLive //
    private Duration getTtl(JwtType jwtType) {
        return switch (jwtType) {
            case REFRESH_TOKEN -> Duration.ofDays(this.env.REFRESH_TTL_DAYS);
            case ACCESS_TOKEN -> Duration.ofMinutes(this.env.ACCESS_TTL_MIN);
        };
    }

    // getExpiry //
    private Instant getExpiry(JwtType jwtType) {
        return switch (jwtType) {
            case REFRESH_TOKEN -> Instant.now().plus(this.env.REFRESH_TTL_DAYS, ChronoUnit.DAYS);
            case ACCESS_TOKEN -> Instant.now().plus(this.env.ACCESS_TTL_MIN, ChronoUnit.MINUTES);
        };
    }

    // genToken //
    // NOTE: sign a JWT
    // - header json, payload json => base 64 url => header string, payload string
    // - header string, payload string, secret string => HMAC +
    // header.algorithm.HS512 => signature bytes
    // - signature bytes => base 64 url => signature string
    // - header string, payload string, signature string => "." => token
    // NOTE:
    // - HMAC: Hash-based Message Authentication Code
    // - 1 byte = 8 bit. 1 bit = 1 binary
    // - serialize: chuyển đổi dữ liệu thành định dạng có thể lưu trữ hoặc gửi đi
    private String genToken(User user, JwtType jwtType) {
        // 1. create a header: algorithm HS512 + type JWT
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        // 2. create a payload: set of claims, must have the subject
        Payload payload = new Payload(
                new JWTClaimsSet.Builder()
                        .subject(user.getId().toString())
                        .issuer("deal.dino.com")
                        .issueTime(new Date())
                        .expirationTime(new Date(this.getExpiry(jwtType).toEpochMilli()))
                        .claim("scope",
                                this.buildScope(user.getRoles().stream()
                                        .map(role -> role.toString())
                                        .collect(Collectors.toSet())))
                        .build()
                        .toJSONObject());

        // 3. sign a jwt: HMAC + header + payload + secret
        try {
            JWSObject jwsObject = new JWSObject(header, payload);
            jwsObject.sign(new MACSigner(this.getSecretKey(jwtType)));
            return jwsObject.serialize();

        } catch (JOSEException e) {
            log.error(">>> INTERNAL: genToken 1: {}", e.getMessage());
            throw new AppException(ErrorCode.SECURITY__GEN_TOKEN_FAILED);
        }
    }

    // verifyToken //
    // NOTE:
    // - should log errors and return optional or boolean => clean code, because of
    // less try-catch in the services
    // - should only throw internal system errors => safe code
    // - for the services will process logic => single responsibility
    private Optional<Id> verifyToken(String token, JwtType jwtType) {
        SecretKeySpec secretKeySpec = new SecretKeySpec(
                this.getSecretKey(jwtType),
                JWSAlgorithm.HS512.getName());

        JwtDecoder jwtDecoder = NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();

        try {
            Jwt jwt = jwtDecoder.decode(token);

            String subject = jwt.getSubject();

            return Id.from(subject);

        } catch (JwtException e) {
            log.warn(">>> WARNING: verifyToken: {}", e.getMessage());
            return Optional.empty();
        }
    }

    // IMPLEMENT IIdentitySecurityProvider //

    // hashPassword //
    @Override
    public String hashPassword(String plain) {
        return this.passwordEncoder.encode(plain);
    }

    // matchPassword //
    @Override
    public boolean matchPassword(String plain, String hash) {
        return this.passwordEncoder.matches(plain, hash);
    }

    @Override
    public TokenPair genTokenPair(User user) {
        String accessToken = this.genToken(user, JwtType.ACCESS_TOKEN);
        Duration accessTokenTtl = this.getTtl(JwtType.ACCESS_TOKEN);
        Instant accessTokenExpiry = this.getExpiry(JwtType.ACCESS_TOKEN);
        String refreshToken = this.genToken(user, JwtType.REFRESH_TOKEN);
        Duration refreshTokenTtl = this.getTtl(JwtType.REFRESH_TOKEN);
        Instant refreshTokenExpiry = this.getExpiry(JwtType.REFRESH_TOKEN);

        return new TokenPair(
                accessToken, accessTokenTtl, accessTokenExpiry,
                refreshToken, refreshTokenTtl, refreshTokenExpiry);
    }

    @Override
    public Optional<Id> verifyRefreshToken(String refreshToken) {
        return this.verifyToken(refreshToken, JwtType.REFRESH_TOKEN);
    }
}
