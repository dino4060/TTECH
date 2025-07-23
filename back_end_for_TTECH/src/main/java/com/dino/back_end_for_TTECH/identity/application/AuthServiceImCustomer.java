package com.dino.back_end_for_TTECH.identity.application;

import com.dino.back_end_for_TTECH.identity.application.model.*;
import com.dino.back_end_for_TTECH.identity.application.pattern.AuthFacade;
import com.dino.back_end_for_TTECH.identity.application.pattern.AuthTemplate;
import com.dino.back_end_for_TTECH.identity.application.provider.IIdentityOauth2Provider;
import com.dino.back_end_for_TTECH.identity.application.service.IAuthServiceForCustomer;
import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.profile.domain.User;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthServiceImCustomer extends AuthTemplate implements IAuthServiceForCustomer {

    AuthFacade authFacade;

    IUserService userService;

    IIdentityOauth2Provider oauth2Provider;

    // CONSTRUCTOR //

    public AuthServiceImCustomer(
            AuthFacade authFacade, IUserService userService, IIdentityOauth2Provider oauth2Provider
    ) {
        super(authFacade);
        this.authFacade = authFacade;
        this.userService = userService;
        this.oauth2Provider = oauth2Provider;
    }

    // INHERITANCE //
    @Override
    protected Role getRole() {
        return Role.CUSTOMER;
    }

    // WRITE //

    // register //
    @Override
    public AuthRes register(RegisterBody body, HttpHeaders headers) {
        this.userService.checkEmailNotExists(body.email());
        this.userService.checkPhoneNotExists(body.phone());

        User user = this.userService.createCustomer(
                body.name(), body.email(), body.phone(), body.password()
        );
        this.authFacade.createToken(user);

        return this.authFacade.inAuth(user, headers);
    }

    // LEGACY //


    // QUERY //

    // lookupEmail //
    @Override
    public LookupEmailRes lookupEmail(String email) {
        User user = this.userService.findUserByEmail(email).orElse(null);

        boolean isEmailProvided = AppUtils.nonNull(user) && AppUtils.nonNull(user.getEmail());
        boolean isPasswordProvided = AppUtils.nonNull(user) && AppUtils.nonNull(user.getPassword());

        return new LookupEmailRes(isEmailProvided, isPasswordProvided);
    }

    // COMMAND //

    // login or signup + AuthGoogleRequest //
    @Override
    public AuthRes loginOrSignup(AuthGoogleReq request, HttpHeaders headers) {
        // authViaGoogle
        var googleUser = this.oauth2Provider.authViaGoogle(request.getCode());

        // get or create
        var user = this.userService
                .findUserByEmail(googleUser.getEmail())
                .orElseGet(() -> this.authFacade.createSignupUser(googleUser, this.getRole()));

        // license token
        return this.authFacade.inAuth(user, headers);
    }
}
