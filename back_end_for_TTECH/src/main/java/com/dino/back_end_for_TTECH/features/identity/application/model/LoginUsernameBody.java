package com.dino.back_end_for_TTECH.identity.application.model;

import com.dino.back_end_for_TTECH.identity.application.pattern.AuthFacade;
import com.dino.back_end_for_TTECH.identity.application.pattern.ILoginBodyStrategy;
import com.dino.back_end_for_TTECH.profile.domain.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginUsernameBody (
        @NotBlank(message = "AUTH__USERNAME_VALIDATION")
        String username,

        @Size(message = "AUTH__PASSWORD_VALIDATION", min = 8)
        String password

) implements ILoginBodyStrategy {
        @Override
        public User checkBody(AuthFacade authFacade) {
                var user = authFacade.checkUsername(username);
                authFacade.checkPassword(user, password);
                return user;
        }
}
