package com.dino.back_end_for_TTECH.profile.application.service;

import com.dino.back_end_for_TTECH.profile.domain.User;
import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;

import java.util.Optional;

public interface IUserService {

    Optional<User> findUserByEmail(String email);

    User getUserById(Long userId);

    User getUser(CurrentUser currentUser);

    User createEmailName(String email, String name, Role role);

    User createEmailPass(String email, String plainPass, Role role);

    User addRole(User user, Role role);
}
