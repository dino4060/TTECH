package com.dino.back_end_for_TTECH.identity.application.pattern;

import com.dino.back_end_for_TTECH.identity.application.mapper.IAuthMapper;
import com.dino.back_end_for_TTECH.identity.application.model.AuthRes;
import com.dino.back_end_for_TTECH.identity.application.model.TokenPair;
import com.dino.back_end_for_TTECH.identity.application.provider.IIdentityCookieProvider;
import com.dino.back_end_for_TTECH.identity.application.provider.IIdentitySecurityProvider;
import com.dino.back_end_for_TTECH.identity.application.service.ITokenService;
import com.dino.back_end_for_TTECH.identity.domain.Token;
import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.profile.domain.User;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthFacade {

    ITokenService tokenService;

    IUserService userService;

    IAuthMapper authMapper;

    IIdentitySecurityProvider securityProvider;

    IIdentityCookieProvider cookieProvider;

    // checkEmail //
    public User checkEmail(String email) {
        return this.userService.findUserByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.AUTH__PHONE_NOT_FOUND));
    }

    // checkEmail //
    public User checkPhone(String phone) {
        return this.userService.findUserByPhone(phone)
                .orElseThrow(() -> new AppException(ErrorCode.AUTH__EMAIL_NOT_FOUND));
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
                .currentUser(this.authMapper.toCurrentUserRes(user))
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
