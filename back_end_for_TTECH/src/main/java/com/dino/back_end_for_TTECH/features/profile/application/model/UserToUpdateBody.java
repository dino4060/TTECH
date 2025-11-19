package com.dino.back_end_for_TTECH.profile.application.model;

import org.springframework.lang.NonNull;

public record UserToUpdateBody(
        @NonNull
        String phone,
        @NonNull
        String email,
        @NonNull
        String name
) {
}
