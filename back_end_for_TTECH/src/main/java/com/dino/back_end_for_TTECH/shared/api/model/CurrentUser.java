package com.dino.back_end_for_TTECH.shared.api.model;

import java.util.Set;

import com.dino.back_end_for_TTECH.features.profile.domain.User;
import lombok.NonNull;

public record CurrentUser(
        @NonNull Long id,
        Set<String> roles
) {
    public User toUser() {
        var user = new User();
        user.setId(this.id);
        return user;
    }
}