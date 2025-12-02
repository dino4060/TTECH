package com.dino.back_end_for_TTECH.features.profile.application.service;

import com.dino.back_end_for_TTECH.features.profile.domain.User;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;

import java.util.Optional;

public interface IUserService {
    // READ //

    void checkEmailNotExists(String email);

    void checkPhoneNotExists(String phone);

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByPhone(String phone);

    Optional<User> findUserByUsername(String username);

    // WRITE //

    User createCustomer(String name, String email, String phone, String password);

    User createCustomer(String name, String email);

    User createAdmin(String username, String email, String password);

    // LEGACY //

    User getUserById(Long userId);

    User getUser(CurrentUser currentUser);
}
