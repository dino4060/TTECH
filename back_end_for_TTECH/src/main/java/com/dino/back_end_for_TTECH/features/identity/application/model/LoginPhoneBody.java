package com.dino.back_end_for_TTECH.identity.application.model;

import com.dino.back_end_for_TTECH.identity.application.pattern.AuthFacade;
import com.dino.back_end_for_TTECH.identity.application.pattern.ILoginBodyStrategy;
import com.dino.back_end_for_TTECH.profile.domain.User;
import jakarta.validation.constraints.Size;

public record LoginPhoneBody(
        @Size(message = "AUTH__PHONE_VALIDATION", min = 10)
        String phone,

        @Size(message = "AUTH__PASSWORD_VALIDATION", min = 8)
        String password
) implements ILoginBodyStrategy {

        @Override
        public User checkBody(AuthFacade authFacade) {
                var user = authFacade.checkPhone(phone);
                authFacade.checkPassword(user, password);
                return user;
        }
}