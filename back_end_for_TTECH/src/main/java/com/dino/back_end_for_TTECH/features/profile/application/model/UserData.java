package com.dino.back_end_for_TTECH.features.profile.application.model;

import com.dino.back_end_for_TTECH.features.profile.domain.model.Role;

import java.time.Instant;
import java.util.Set;

public record UserData(
        Long id,
        String name,
        String username,
        String email,
        String phone,
        String status,
        Set<Role> roles,
        Integer provinceId,
        Integer wardId,
        String street,
        Instant createdAt,
        Instant updatedAt
) {
}
