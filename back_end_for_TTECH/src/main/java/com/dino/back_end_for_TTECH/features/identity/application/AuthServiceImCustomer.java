package com.dino.back_end_for_TTECH.features.identity.application;

import com.dino.back_end_for_TTECH.features.identity.application.model.AuthRes;
import com.dino.back_end_for_TTECH.features.identity.application.model.RegisterBody;
import com.dino.back_end_for_TTECH.features.identity.application.pattern.AuthFacade;
import com.dino.back_end_for_TTECH.features.identity.application.pattern.AuthTemplate;
import com.dino.back_end_for_TTECH.features.identity.application.service.IAuthServiceForCustomer;
import com.dino.back_end_for_TTECH.features.identity.application.service.ITokenService;
import com.dino.back_end_for_TTECH.features.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.features.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthServiceImCustomer extends AuthTemplate implements IAuthServiceForCustomer {

    private final AuthFacade authFacade;

    private final IUserService userService;

    private final ITokenService tokenService;

    // CONSTRUCTOR //

    public AuthServiceImCustomer(
            AuthFacade authFacade, IUserService userService, ITokenService tokenService
    ) {
        super(authFacade);
        this.authFacade = authFacade;
        this.userService = userService;
        this.tokenService = tokenService;
    }

    // TEMPLATE //

    @Override
    protected Role getRole() {
        return Role.CUSTOMER;
    }

    // WRITE //

    // register //
    @Override
    public AuthRes registerCustomer(RegisterBody body, HttpHeaders headers) {
        this.userService.checkEmailNotExists(body.email());
        this.userService.checkPhoneNotExists(body.phone());

        User user = this.userService.createCustomer(
                body.name(), body.email(), body.phone(), body.password()
        );
        this.tokenService.createToken(user);

        return this.authFacade.inAuth(user, headers);
    }
}
