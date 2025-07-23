package com.dino.back_end_for_TTECH.profile.application.service;

import com.dino.back_end_for_TTECH.identity.application.model.CurrentUserRes;
import com.dino.back_end_for_TTECH.profile.application.model.UserToUpdateBody;
import com.dino.back_end_for_TTECH.profile.domain.User;
import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;

import java.util.Optional;

public interface IUserService {
    // READ //

    void checkEmailNotExists(String email);

    void checkPhoneNotExists(String phone);

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByPhone(String phone);

    // WRITE //

    User createCustomer(String name, String email, String phone, String password);

    CurrentUserRes updateCustomer(UserToUpdateBody body, CurrentUser currentUser);

    // LEGACY //

    User getUserById(Long userId);

    User getUser(CurrentUser currentUser);

    User createEmailName(String email, String name, Role role);

    User createEmailPass(String email, String plainPass, Role role);

    User addRole(User user, Role role);
}
