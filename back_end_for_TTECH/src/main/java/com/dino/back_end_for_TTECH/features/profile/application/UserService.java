package com.dino.back_end_for_TTECH.features.profile.application;

import com.dino.back_end_for_TTECH.features.identity.application.model.CurrentUserRes;
import com.dino.back_end_for_TTECH.features.identity.application.provider.IIdentitySecurityProvider;
import com.dino.back_end_for_TTECH.features.profile.application.mapper.IUserMapper;
import com.dino.back_end_for_TTECH.features.profile.application.model.UserBody;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import com.dino.back_end_for_TTECH.features.profile.domain.repository.IUserRepository;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final IUserRepository userRepository;
    private final IUserMapper userMapper;
    private final IIdentitySecurityProvider securityProvider;

    // READ //


    public void checkEmailNotExists(String email) {
        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    throw new AppException(ErrorCode.USER__EMAIL_ALREADY_EXISTS);
                });
    }


    public void checkPhoneNotExists(String phone) {
        userRepository.findByPhone(phone)
                .ifPresent(user -> {
                    throw new AppException(ErrorCode.USER__PHONE_ALREADY_EXISTS);
                });
    }


    public Optional<User> findUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }


    public Optional<User> findUserByPhone(String phone) {
        return this.userRepository.findByPhone(phone);
    }


    public Optional<User> findUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    // WRITE //


    public User createCustomer(String name, String email, String phone, String password) {
        String passHashed = this.securityProvider.hashPassword(password);
        User userToCreate = User.createCustomer(name, email, phone, passHashed);
        return this.userRepository.save(userToCreate);
    }


    public User createCustomer(String name, String email) {
        User user = User.createThirdCustomer(name, email);
        return this.userRepository.save(user);
    }


    public User createAdmin(String username, String email, String password) {
        String passHashed = this.securityProvider.hashPassword(password);
        User user = User.createAdmin(username, email, passHashed);
        return this.userRepository.save(user);
    }


    public CurrentUserRes updateCustomer(UserBody body, CurrentUser currentUser) {
        // 1. get and check
        User user = userRepository.findById(currentUser.id())
                .orElseThrow(() -> new AppException(ErrorCode.USER__NOT_FOUND));

        if (!body.getEmail().equals(user.getEmail())) {
            userRepository.findByEmailAndIdNot(body.getEmail(), user.getId())
                    .ifPresent(otherUser -> {
                        throw new AppException(ErrorCode.USER__EMAIL_ALREADY_EXISTS);
                    });
        }

        if (!body.getPhone().equals(user.getPhone())) {
            userRepository.findByPhoneAndIdNot(body.getPhone(), user.getId())
                    .ifPresent(otherUser -> {
                        throw new AppException(ErrorCode.USER__PHONE_ALREADY_EXISTS);
                    });
        }

        // 2. update
        user.updateCustomer(body.getName(), body.getEmail(), body.getPhone());
        User userUpdated = this.userRepository.save(user);

        return this.userMapper.toCurrentUserRes(userUpdated);
    }

    // LEGACY //


    public User getUserById(Long userId) {
        return this.userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER__NOT_FOUND));
    }


    public User getUser(CurrentUser currentUser) {
        return this.getUserById(currentUser.id());
    }
}
