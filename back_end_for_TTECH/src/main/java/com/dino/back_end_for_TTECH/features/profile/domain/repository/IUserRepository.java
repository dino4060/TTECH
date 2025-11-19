package com.dino.back_end_for_TTECH.features.profile.domain.repository;

import com.dino.back_end_for_TTECH.features.profile.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, Long> {
    // READ //

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    Optional<User> findByEmailAndIdNot(String email, Long excludedId);

    Optional<User> findByPhoneAndIdNot(String phone, Long excludedId);

    Optional<User> findByUsername(String username);
    // value is NULL, database exists NULL, return EMPTY: O (safe)
}
