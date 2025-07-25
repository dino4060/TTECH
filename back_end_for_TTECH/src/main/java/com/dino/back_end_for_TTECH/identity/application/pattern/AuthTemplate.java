package com.dino.back_end_for_TTECH.identity.application.pattern;

import com.dino.back_end_for_TTECH.identity.application.model.*;
import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.profile.domain.User;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;

@AllArgsConstructor
@Slf4j
public abstract class AuthTemplate implements IAuthTemplate {

    private final AuthFacade authFacade;

    // TEMPLATE //

    protected abstract Role getRole();

    // COMMAND //

    @Override
    public AuthRes login(ILoginBodyStrategy body, HttpHeaders headers) {
        User user = body.checkBody(authFacade);
        authFacade.checkRole(user, getRole());
        return authFacade.inAuth(user, headers);
    }
}
