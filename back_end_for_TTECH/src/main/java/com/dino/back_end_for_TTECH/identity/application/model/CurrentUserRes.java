package com.dino.back_end_for_TTECH.identity.application.model;

public record CurrentUserRes(
        String username,
        String name,
        String photo,
        String status,
        String email,
        String phone,
        Boolean isEmailVerified,
        Boolean isPhoneVerified
) {
}
