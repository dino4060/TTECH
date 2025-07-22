package com.dino.back_end_for_TTECH.identity.application.model;

public record CurrentUserRes(
        Long id,
        String name,
        String username,
        String email,
        String phone,
        Boolean isEmailVerified,
        Boolean isPhoneVerified,
        String status
) {
}
