package com.dino.back_end_for_TTECH.shared.api.model;

import java.util.Set;

import com.dino.back_end_for_TTECH.profile.domain.User;
import lombok.NonNull;

public record CurrentUser(
        @NonNull Long id,
        Set<String> roles
) {
    public User toUser() {
        return User.builder().id(this.id).build();
    }
}