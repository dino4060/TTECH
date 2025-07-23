package com.dino.back_end_for_TTECH.profile.application;

import com.dino.back_end_for_TTECH.identity.application.model.CurrentUserRes;
import com.dino.back_end_for_TTECH.identity.application.provider.IIdentitySecurityProvider;
import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.profile.application.mapper.IUserMapper;
import com.dino.back_end_for_TTECH.profile.application.model.UserToUpdateBody;
import com.dino.back_end_for_TTECH.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.profile.domain.User;
import com.dino.back_end_for_TTECH.profile.domain.repository.IUserRepository;
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
public class UserServiceIm implements IUserService {

    private final IUserRepository userRepository;
    private final IUserMapper userMapper;
    private final IIdentitySecurityProvider securityProvider;

    // READ //

    @Override
    public void checkEmailNotExists(String email) {
        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    throw new AppException(ErrorCode.USER__EMAIL_ALREADY_EXISTS);
                });
    }

    @Override
    public void checkPhoneNotExists(String phone) {
        userRepository.findByPhone(phone)
                .ifPresent(user -> {
                    throw new AppException(ErrorCode.USER__PHONE_ALREADY_EXISTS);
                });
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findUserByPhone(String phone) {
        return this.userRepository.findByPhone(phone);
    }

    // WRITE //

    @Override
    public User createCustomer(String name, String email, String phone, String password) {
        String passHashed = this.securityProvider.hashPassword(password);
        User userToCreate = User.createCustomer(name, email, phone, passHashed);
        return this.userRepository.save(userToCreate);
    }

    @Override
    public CurrentUserRes updateCustomer(UserToUpdateBody body, CurrentUser currentUser) {
        // 1. get and check
        User user = userRepository.findById(currentUser.id())
                .orElseThrow(() -> new AppException(ErrorCode.USER__NOT_FOUND));

        if (!body.email().equals(user.getEmail())) {
            userRepository.findByEmailAndIdNot(body.email(), user.getId())
                    .ifPresent(otherUser -> {
                        throw new AppException(ErrorCode.USER__EMAIL_ALREADY_EXISTS);
                    });
        }

        if (!body.phone().equals(user.getPhone())) {
            userRepository.findByPhoneAndIdNot(body.phone(), user.getId())
                    .ifPresent(otherUser -> {
                        throw new AppException(ErrorCode.USER__PHONE_ALREADY_EXISTS);
                    });
        }

        // 2. update
        user.updateCustomer(body.name(), body.email(), body.phone());
        User userUpdated = this.userRepository.save(user);

        return this.userMapper.toCurrentUserRes(userUpdated);
    }

    // LEGACY //

    @Override
    public User getUserById(Long userId) {
        return this.userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER__NOT_FOUND));
    }

    @Override
    public User getUser(CurrentUser currentUser) {
        return this.getUserById(currentUser.id());
    }

    @Override
    public User createEmailName(String email, String name, Role role) {
        User user = User.createThirdUser(email, name, role);
        return this.userRepository.save(user);
    }

    @Override
    public User createEmailPass(String email, String plainPass, Role role) {
        String hashPass = this.securityProvider.hashPassword(plainPass);
        User user = User.createEmailUser(email, hashPass, role);
        return this.userRepository.save(user);
    }

    @Override
    public User addRole(User user, Role role) {
        user.addRole(role);
        return this.userRepository.save(user);
    }
}
