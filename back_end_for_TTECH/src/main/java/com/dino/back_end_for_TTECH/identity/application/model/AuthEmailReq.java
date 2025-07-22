package com.dino.back_end_for_TTECH.identity.application.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthEmailReq {
    // @Pattern(message = "ACCOUNT__EMAIL_NOT_MATCHED", regexp =
    // "^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\\.[a-zA-Z]{2,}$")
    @Email(message = "AUTH__EMAIL_NOT_MATCHED")
    String email;

    @Size(message = "AUTH__PASSWORD_MIN", min = 6)
    String password;
}
