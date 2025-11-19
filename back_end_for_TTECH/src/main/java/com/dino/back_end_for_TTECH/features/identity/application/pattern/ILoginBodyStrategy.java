package com.dino.back_end_for_TTECH.features.identity.application.pattern;

import com.dino.back_end_for_TTECH.features.profile.domain.User;

public interface ILoginBodyStrategy {
    User checkBody(AuthFacade authFacade);
}
