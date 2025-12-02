package com.dino.back_end_for_TTECH.features.profile.application;

import com.dino.back_end_for_TTECH.features.identity.application.provider.IIdentitySecurityProvider;
import com.dino.back_end_for_TTECH.features.profile.application.mapper.UserMapper;
import com.dino.back_end_for_TTECH.features.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
import com.dino.back_end_for_TTECH.features.profile.domain.repository.UserRepository;
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
public class UserServiceLegacy implements IUserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
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

    @Override
    public Optional<User> findUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    // WRITE //

    @Override
    public User createCustomer(String name, String email, String phone, String password) {
        String passHashed = this.securityProvider.hashPassword(password);
        User userToCreate = User.createCustomer(name, email, phone, passHashed);
        return this.userRepository.save(userToCreate);
    }

    @Override
    public User createCustomer(String name, String email) {
        User user = User.createThirdCustomer(name, email);
        return this.userRepository.save(user);
    }

    @Override
    public User createAdmin(String username, String email, String password) {
        String passHashed = this.securityProvider.hashPassword(password);
        User user = User.createAdmin(username, email, passHashed);
        return this.userRepository.save(user);
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
}
