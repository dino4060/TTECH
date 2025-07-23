package com.dino.back_end_for_TTECH.identity.application.model;

import jakarta.validation.constraints.Size;

public record LoginPhoneBody(
        @Size(message = "AUTH__PHONE_VALIDATION", min = 10)
        String phone,

        @Size(message = "AUTH__PASSWORD_VALIDATION", min = 8)
        String password
) {
}
