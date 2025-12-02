package com.dino.back_end_for_TTECH.features.profile.application.model;

import jakarta.validation.constraints.NotBlank;

public record UserToUpdateBody(
        @NotBlank(message = "Phone is not empty")
        String phone,
        @NotBlank(message = "Email is not empty")
        String email,
        @NotBlank(message = "Name is not empty")
        String name,
        
        Integer provinceId,
        Integer wardId,
        String street
) {
}
