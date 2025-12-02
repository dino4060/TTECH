package com.dino.back_end_for_TTECH.features.profile.application;

import com.dino.back_end_for_TTECH.features.identity.application.model.CurrentUserRes;
import com.dino.back_end_for_TTECH.features.profile.application.mapper.UserMapper;
import com.dino.back_end_for_TTECH.features.profile.application.model.UserBody;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import com.dino.back_end_for_TTECH.features.profile.domain.repository.UserRepository;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.exception.BadRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;


    public CurrentUserRes updateCustomer(UserBody body, CurrentUser currentUser) {
        User user =  this.userRepository
                .findById(currentUser.id())
                .orElseThrow(() -> new BadRequest("User not found"));

        if (!body.getEmail().equals(user.getEmail())) {
            this.userRepository
                    .findByEmail(body.getEmail())
                    .ifPresent(existingUser -> {
                        if (!existingUser.getId().equals(currentUser.id())) {
                            throw new BadRequest("Email already exists");
                        }
                    });
        }

        if (!body.getPhone().equals(user.getPhone())) {
            this.userRepository
                    .findByPhone(body.getPhone())
                    .ifPresent(existingUser -> {
                        if (!existingUser.getId().equals(currentUser.id())) {
                            throw new BadRequest("Phone already exists.");
                        }
                    });
        }

        this.userMapper.toModel(body, user);
        User editUser = userRepository.save(user);
        return this.userMapper.toCurrentUserRes(editUser);
    }
}
