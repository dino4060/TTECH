package com.dino.back_end_for_TTECH.features.identity.application.model;

import com.dino.back_end_for_TTECH.features.identity.application.pattern.AuthFacade;
import com.dino.back_end_for_TTECH.features.identity.application.pattern.ILoginBodyStrategy;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record LoginEmailBody(
        @Email(message = "AUTH__EMAIL_VALIDATION")
        String email,

        @Size(message = "AUTH__PASSWORD_VALIDATION", min = 8)
        String password
) implements ILoginBodyStrategy {

        @Override
        public User checkBody(AuthFacade authFacade) {
                var user = authFacade.checkEmail(email);
                authFacade.checkPassword(user, password);
                return user;
        }
}