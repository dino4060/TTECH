package com.dino.back_end_for_TTECH.identity.application.pattern;

import com.dino.back_end_for_TTECH.identity.application.mapper.IAuthMapper;
import com.dino.back_end_for_TTECH.identity.application.model.*;
import com.dino.back_end_for_TTECH.identity.application.provider.IIdentityCookieProvider;
import com.dino.back_end_for_TTECH.identity.application.provider.IIdentitySecurityProvider;
import com.dino.back_end_for_TTECH.identity.application.service.ITokenService;
import com.dino.back_end_for_TTECH.identity.domain.Token;
import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.profile.application.UserServiceShared;
import com.dino.back_end_for_TTECH.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.profile.domain.User;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
import com.dino.back_end_for_TTECH.shared.application.utils.Id;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthFacade {

    UserServiceShared userServiceShared;

    ITokenService tokenService;

    IUserService userService;

    IAuthMapper authMapper;

    IIdentitySecurityProvider securityProvider;

    IIdentityCookieProvider cookieProvider;

    // QUERY //

    // checkEmail //
    public User checkEmail(String email) {
        return this.userService.findUserByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.AUTH__IDENTIFIER_NOT_FOUND));
    }

    // checkEmailNotExists //
    public void checkEmailNotExists(String email) {
        if (this.userService.findUserByEmail(email).isPresent())
            throw new AppException(ErrorCode.AUTH__IDENTIFIER_EXISTED);
    }

    // checkPassword //
    public void checkPassword(User user, String password) {
        if (!this.securityProvider.matchPassword(password, user.getPassword()))
            throw new AppException(ErrorCode.AUTH__PASSWORD_INVALID);
    }

    public User checkOrAddRole(User user, Role role) {
        if (user.getRoles().contains(role))
            return user;
        else
            return this.addRole(user, role);
    }

    // checkRefreshToken //
    public Optional<Token> checkRefreshToken(String refreshToken) {
        // 1. check refreshToken is not blank
        if (AppUtils.isBlank(refreshToken)) return Optional.empty();

        // 2. verify & extract user ID
        Id userId = this.securityProvider.verifyRefreshToken(refreshToken).orElse(null);

        if (AppUtils.isNull(userId)) return Optional.empty();

        // 3. check if refresh token matches DB (to prevent reuse)
        Token token = this.tokenService.hasRefreshToken(refreshToken, userId.value()).orElse(null);

        if (AppUtils.isNull(token)) return Optional.empty();

        return Optional.of(token);
    }

    // getCurrentUser //
    public CurrentUserRes getCurrentUser(CurrentUser currentUser) {
        User user = this.userService.getUserById(currentUser.id());

        return this.authMapper.toCurrentUserRes(user);
    }

    // COMMAND //

    // createToken //
    public void createToken(User user) {
        this.tokenService.createToken(user);
    }

    // createEmailUser + AuthEmailReq //
    protected User createSignupUser(AuthEmailReq signup, Role role) {
        User user = this.userServiceShared.createEmailPass(
                signup.getEmail(), signup.getPassword(), role
        );
        this.createToken(user);

        return user;
    }

    // createSignupUser + GoogleUserRes //
    public User createSignupUser(GoogleUserRes signup, Role role) {
        User user = this.userServiceShared.createEmailName(
                signup.getEmail(), signup.getName(), role
        );
        this.tokenService.createToken(user);

        return user;
    }

    // addRole //
    public User addRole(User user, Role role) {
        return this.userServiceShared.addRole(user, role);
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
