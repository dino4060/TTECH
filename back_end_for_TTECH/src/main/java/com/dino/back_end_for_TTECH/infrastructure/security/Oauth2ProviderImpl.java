package com.dino.back_end_for_TTECH.infrastructure.security;

import org.springframework.stereotype.Service;

import com.dino.back_end_for_TTECH.identity.application.model.GoogleUserRes;
import com.dino.back_end_for_TTECH.identity.application.provider.IIdentityOauth2Provider;
import com.dino.back_end_for_TTECH.infrastructure.common.Env;
import com.dino.back_end_for_TTECH.infrastructure.httpclient.oauth2.GoogleTokenClient;
import com.dino.back_end_for_TTECH.infrastructure.httpclient.oauth2.GoogleUserClient;
import com.dino.back_end_for_TTECH.infrastructure.security.model.GoogleTokenRequest;
import com.dino.back_end_for_TTECH.infrastructure.security.model.GoogleTokenResponse;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class Oauth2ProviderImpl implements IIdentityOauth2Provider {

    Env env;

    GoogleTokenClient googleTokenClient;

    GoogleUserClient googleUserClient;

    /**
     * // getGoogleToken //
     * 
     * @des To exchange authorizationCode for authorizationCode with GOOGLE
     * @param authorizationCode: String
     * @return accessToken,...: GoogleTokenResponse
     */
    private GoogleTokenResponse getGoogleToken(String authorizationCode) {
        try {
            return this.googleTokenClient.getToken(
                    GoogleTokenRequest.builder()
                            .code(authorizationCode)
                            .clientId(this.env.CLIENT_ID)
                            .clientSecret(this.env.CLIENT_SECRET)
                            .redirectUri(this.env.REDIRECT_URI)
                            .grantType(this.env.GRANT_TYPE)
                            .build());

        } catch (Exception e) {
            log.error(">>> INTERNAL: getGoogleToken: {}", e.getMessage());
            throw new AppException(ErrorCode.OAUTH2__GET_GOOGLE_TOKEN_FAILED);
        }
    }

    /**
     * // getGoogleUser //
     * 
     * @des To get information of user of GOOGLE
     * @param accessToken: String
     * @return user: GoogleUserResponse
     */
    private GoogleUserRes getGoogleUser(String accessToken) {
        try {
            return this.googleUserClient.getUser("json", accessToken);

        } catch (Exception e) {
            log.error(">>> INTERNAL: getGoogleUser: {}", e.getMessage());
            throw new AppException(ErrorCode.OAUTH2__GET_GOOGLE_USER_FAILED);
        }
    }

    @Override
    public GoogleUserRes authViaGoogle(String code) {
        // 1. exchange code for token
        var googleToken = this.getGoogleToken(code);

        // 2. exchange token for user
        return this.getGoogleUser(googleToken.getAccessToken());
    }
}
