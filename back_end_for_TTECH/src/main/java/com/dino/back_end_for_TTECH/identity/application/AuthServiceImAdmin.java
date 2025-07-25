package com.dino.back_end_for_TTECH.identity.application;

import com.dino.back_end_for_TTECH.identity.application.pattern.AuthFacade;
import com.dino.back_end_for_TTECH.identity.application.pattern.AuthTemplate;
import com.dino.back_end_for_TTECH.identity.application.service.IAuthServiceForAdmin;
import com.dino.back_end_for_TTECH.identity.application.service.ITokenService;
import com.dino.back_end_for_TTECH.identity.domain.model.Role;
import com.dino.back_end_for_TTECH.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.profile.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthServiceImAdmin extends AuthTemplate implements IAuthServiceForAdmin {

    private final IUserService userService;

    private final ITokenService tokenService;

    public AuthServiceImAdmin(
            AuthFacade authFacade, IUserService userService, ITokenService tokenService
    ) {
        super(authFacade);
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @Override
    protected Role getRole() {
        return Role.ADMIN;
    }

    // QUERY //

    @Override
    public void initAdmin() {
        var username = "admin";
        var password = "top1ttech";

        var optional = this.userService.findUserByUsername(username);

        if (optional.isEmpty()) {
            User admin = this.userService.createAdmin(username, password);
            this.tokenService.createToken(admin);
        }
        log.info(">>> Admin is ready. Username: {}. Password: {}", username, password);
    }
}
