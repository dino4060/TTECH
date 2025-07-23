package com.dino.back_end_for_TTECH.profile.api;

import com.dino.back_end_for_TTECH.identity.application.model.CurrentUserRes;
import com.dino.back_end_for_TTECH.profile.application.model.UserToUpdateBody;
import com.dino.back_end_for_TTECH.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.shared.api.annotation.AuthUser;
import com.dino.back_end_for_TTECH.shared.api.constant.AuthConst;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    // PrivateUserController //
    @RestController
    @RequestMapping("/api/users")
    @PreAuthorize(AuthConst.CUSTOMER)
    @AllArgsConstructor
    public static class PrivateUserController {

        private final IUserService userService;

        // QUERY //

        // updateUser //
        @PutMapping("/update")
        public ResponseEntity<CurrentUserRes> updateUser(
                @RequestBody UserToUpdateBody body,
                @AuthUser CurrentUser currentUser
        ) {
            return ResponseEntity.ok(this.userService.updateCustomer(body, currentUser));
        }
    }
}
