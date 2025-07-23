package com.dino.back_end_for_TTECH.identity.application.pattern;

import com.dino.back_end_for_TTECH.identity.application.model.AuthRes;
import com.dino.back_end_for_TTECH.identity.application.model.LoginPhoneBody;
import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;

@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public abstract class AuthTemplate implements IAuthTemplate {

    AuthFacade authFacade;

    // TEMPLATE //

    protected abstract Role getRole();

    // COMMAND //

    // login + LoginPhoneBody //
    @Override
    public AuthRes login(LoginPhoneBody body, HttpHeaders headers) {
        // check
        var user = this.authFacade.checkPhone(body.phone());
        this.authFacade.checkPassword(user, body.password());
        this.authFacade.checkRole(user, this.getRole());

        // license token
        return this.authFacade.inAuth(user, headers);
    }
}
