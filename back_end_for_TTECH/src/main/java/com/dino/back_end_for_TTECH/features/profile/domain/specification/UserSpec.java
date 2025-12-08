package com.dino.back_end_for_TTECH.features.profile.domain.specification;

import com.dino.back_end_for_TTECH.features.profile.application.model.UserQuery;
import com.dino.back_end_for_TTECH.features.profile.domain.model.Role;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpec {

    public static Specification<User> hasRole(Role role) {
        return (root, query, builder) -> {
            if (role == null) return null;
            return root.get("roles").in(role);
            // return builder.isMember(role, root.get("roles"));
        };
    }

    public static Specification<User> equalId(Long id) {
        return (root, query, builder) -> {
            if (id == null || id <= 0) return null;
            return builder.equal(root.get("id"), id);
        };
    }

    public static Specification<User> likeName(String name) {
        return (root, query, builder) -> {
            if (name == null || name.trim().isEmpty()) return null;
            return builder.like(
                    builder.lower(root.get("name")),
                    "%" + name.toLowerCase() + "%"
            );
        };
    }

    public static Specification<User> likeEmail(String email) {
        return (root, query, builder) -> {
            if (email == null || email.trim().isEmpty()) return null;
            return builder.like(
                    builder.lower(root.get("email")),
                    "%" + email.toLowerCase() + "%"
            );
        };
    }

    public static Specification<User> likePhone(String phone) {
        return (root, query, builder) -> {
            if (phone == null || phone.trim().isEmpty()) return null;
            return builder.like(root.get("phone"), "%" + phone + "%");
        };
    }

    public static Specification<User> likeUsername(String username) {
        return (root, query, builder) -> {
            if (username == null || username.trim().isEmpty()) return null;
            return builder.like(
                    builder.lower(root.get("username")),
                    "%" + username.toLowerCase() + "%"
            );
        };
    }

    public static Specification<User> fromQuery(UserQuery query) {
        return Specification
                .where(hasRole(Role.CUSTOMER))
                .and(equalId(query.getId()))
                .and(likeName(query.getName()))
                .and(likeEmail(query.getEmail()))
                .and(likePhone(query.getPhone()))
                .and(likeUsername(query.getUsername()));
    }
}
