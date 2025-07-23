package com.dino.back_end_for_TTECH.identity.application;

import com.dino.back_end_for_TTECH.identity.application.model.AuthRes;
import com.dino.back_end_for_TTECH.identity.application.model.LoginGoogleBody;
import com.dino.back_end_for_TTECH.identity.application.model.RegisterBody;
import com.dino.back_end_for_TTECH.identity.application.pattern.AuthFacade;
import com.dino.back_end_for_TTECH.identity.application.pattern.AuthTemplate;
import com.dino.back_end_for_TTECH.identity.application.provider.IIdentityOauth2Provider;
import com.dino.back_end_for_TTECH.identity.application.service.IAuthServiceForCustomer;
import com.dino.back_end_for_TTECH.identity.application.service.ITokenService;
import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.profile.domain.User;
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

    ITokenService tokenService;

    IIdentityOauth2Provider oauth2Provider;

    // CONSTRUCTOR //

    public AuthServiceImCustomer(
            AuthFacade authFacade, IUserService userService, ITokenService tokenService,
            IIdentityOauth2Provider oauth2Provider
    ) {
        super(authFacade);
        this.authFacade = authFacade;
        this.userService = userService;
        this.tokenService = tokenService;
        this.oauth2Provider = oauth2Provider;
    }

    // TEMPLATE //

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
        this.tokenService.createToken(user);

        return this.authFacade.inAuth(user, headers);
    }

    // login via google //
    @Override
    public AuthRes login(LoginGoogleBody body, HttpHeaders headers) {
        // authViaGoogle
        var googleUser = this.oauth2Provider.authViaGoogle(body.code());

        // get or create
        var user = this.userService
                .findUserByEmail(googleUser.getEmail())
                .orElseGet(() -> {
                    User userCreated = this.userService.createCustomer(
                            googleUser.getName(), googleUser.getEmail()
                            );
                    this.tokenService.createToken(userCreated);
                    return userCreated;
                });

        // license token
        return this.authFacade.inAuth(user, headers);
    }
}
