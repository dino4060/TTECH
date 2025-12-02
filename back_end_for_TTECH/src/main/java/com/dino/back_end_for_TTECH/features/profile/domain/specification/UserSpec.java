package com.dino.back_end_for_TTECH.features.profile.domain.specification;

import com.dino.back_end_for_TTECH.features.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpec {

    public static Specification<User> hasRole(Role role) {
        return (root, query, builder) -> {
            if (role == null) return null;
            return root.get("roles").in(role);
        };
    }
}
