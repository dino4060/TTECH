package com.dino.back_end_for_TTECH.identity.application.pattern;

import com.dino.back_end_for_TTECH.profile.domain.User;

public interface ILoginBodyStrategy {
    User checkBody(AuthFacade authFacade);
}
