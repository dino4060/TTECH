package com.dino.back_end_for_TTECH.features.identity.application.model;

import com.dino.back_end_for_TTECH.features.identity.application.pattern.AuthFacade;
import com.dino.back_end_for_TTECH.features.identity.application.pattern.ILoginBodyStrategy;
import com.dino.back_end_for_TTECH.features.profile.domain.User;

public record LoginGoogleBody(
        String code
) implements ILoginBodyStrategy {

    @Override
    public User checkBody(AuthFacade authFacade) {
        return authFacade.checkGoogleAuthCode(code);
    }
}