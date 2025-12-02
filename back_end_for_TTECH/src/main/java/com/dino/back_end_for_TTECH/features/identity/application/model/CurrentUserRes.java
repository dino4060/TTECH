package com.dino.back_end_for_TTECH.features.identity.application.model;

import com.dino.back_end_for_TTECH.features.identity.domain.model.Role;

import java.util.Set;

public record CurrentUserRes(
        Long id,
        String name,
        String username,
        String email,
        String phone,
        String status,
        Set<Role> roles,
        Integer provinceId,
        Integer wardId,
        String street
) {
}
