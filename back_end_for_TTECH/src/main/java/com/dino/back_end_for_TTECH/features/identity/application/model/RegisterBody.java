package com.dino.back_end_for_TTECH.features.identity.application.model;

public record RegisterBody(
        String name,
        String phone,
        String email,
        String password
) {
}