package com.dino.back_end_for_TTECH.features.profile.domain.repository;

import com.dino.back_end_for_TTECH.features.profile.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface UserRepository extends
        JpaRepository<User, Long>,
        JpaSpecificationExecutor<User> {

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    Optional<User> findByEmailAndIdNot(String email, Long excludedId);

    Optional<User> findByPhoneAndIdNot(String phone, Long excludedId);

    // value is NULL, database exists NULL, return EMPTY: O (safe)
    Optional<User> findByUsername(String username);
}
