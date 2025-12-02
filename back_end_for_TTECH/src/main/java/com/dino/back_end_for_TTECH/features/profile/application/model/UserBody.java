package com.dino.back_end_for_TTECH.features.profile.application.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserBody {
        @NotBlank(message = "Phone is not empty")
        String phone;

        @NotBlank(message = "Email is not empty")
        String email;

        @NotBlank(message = "Name is not empty")
        String name;

        Integer provinceId;
        Integer wardId;
        String street;
}
