package com.dino.back_end_for_TTECH.features.identity.application.pattern;

import com.dino.back_end_for_TTECH.features.identity.application.model.AuthRes;
import com.dino.back_end_for_TTECH.features.identity.application.model.TokenPair;
import com.dino.back_end_for_TTECH.features.identity.application.provider.IIdentityCookieProvider;
import com.dino.back_end_for_TTECH.features.identity.application.provider.IIdentityOauth2Provider;
import com.dino.back_end_for_TTECH.features.identity.application.provider.IIdentitySecurityProvider;
import com.dino.back_end_for_TTECH.features.identity.application.service.ITokenService;
import com.dino.back_end_for_TTECH.features.identity.domain.Token;
import com.dino.back_end_for_TTECH.features.profile.application.mapper.UserMapper;
import com.dino.back_end_for_TTECH.features.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import com.dino.back_end_for_TTECH.features.profile.domain.model.Role;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

/*
NOTE: @RequiredArgsConstructor
The annotation applies to fields which are:
- instance
- final or nonnull
 */

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthFacade {

    private final static boolean CAN_CREATE_GOOGLE_USER_WHEN_LOGIN = true;

    private final ITokenService tokenService;

    private final IUserService userService;


    private final UserMapper userMapper;

    private final IIdentitySecurityProvider securityProvider;

    private final IIdentityOauth2Provider oauth2Provider;

    private final IIdentityCookieProvider cookieProvider;

    // checkUsername //
    public User checkUsername(String username) {
        return this.userService.findUserByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.AUTH__USERNAME_NOT_FOUND));
    }

    // checkEmail //
    public User checkEmail(String email) {
        return this.userService.findUserByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.AUTH__PHONE_NOT_FOUND));
    }

    // checkPhone //
    public User checkPhone(String phone) {
        return this.userService.findUserByPhone(phone)
                .orElseThrow(() -> new AppException(ErrorCode.AUTH__EMAIL_NOT_FOUND));
    }

    // checkGoogleAuthCode //
    public User checkGoogleAuthCode(String code) {
        var googleUser = this.oauth2Provider.authViaGoogle(code);

        // find or create/error
        if (CAN_CREATE_GOOGLE_USER_WHEN_LOGIN) {
            return this.userService
                    .findUserByEmail(googleUser.getEmail())
                    .orElseGet(() -> {
                        User userCreated = this.userService.createCustomer(
                                googleUser.getName(), googleUser.getEmail()
                        );
                        this.tokenService.createToken(userCreated);
                        return userCreated;
                    });
        } else {
            return this.userService
                    .findUserByEmail(googleUser.getEmail())
                    .orElseThrow(() -> new AppException(ErrorCode.AUTH__GOOGLE_NOT_FOUND));
        }
    }

    // checkPassword //
    public void checkPassword(User user, String password) {
        if (!this.securityProvider.matchPassword(password, user.getPassword()))
            throw new AppException(ErrorCode.AUTH__PASSWORD_NOT_MATCH);
    }

    // checkRole //
    public void checkRole(User user, Role role) {
        if (!user.getRoles().contains(role))
            throw new AppException(ErrorCode.AUTH__ROLE_NOT_PERMIT);
    }

    // inAuth //
    public AuthRes inAuth(User user, HttpHeaders headers) {
        // get tokens
        TokenPair tokenPair = this.securityProvider.genTokenPair(user);

        // update refresh token to database
        this.tokenService.updateRefreshToken(
                tokenPair.refreshToken(), tokenPair.refreshTokenExpiry(), user.getId());

        // set refresh token to cookie
        this.cookieProvider.attachRefreshToken(
                headers, tokenPair.refreshToken(), tokenPair.refreshTokenTtl());

        return AuthRes.builder()
                .isAuthenticated(true)
                .accessToken(tokenPair.accessToken())
                .currentUser(this.userMapper.toData(user))
                .build();
    }

    // unAuth //
    public AuthRes unAuth(HttpHeaders headers) {
        this.cookieProvider.clearRefreshToken(headers);

        return AuthRes.builder().isAuthenticated(false).build();
    }

    // outAuth //
    public AuthRes outAuth(Token token, HttpHeaders headers) {
        // 1. clean refresh token from DB
        this.tokenService.cleanRefreshToken(token);

        // 2. clean refresh token from cookies
        this.cookieProvider.clearRefreshToken(headers);

        return AuthRes.builder().isAuthenticated(true).build();
    }
}
