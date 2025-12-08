package com.dino.back_end_for_TTECH.features.profile.api;

import com.dino.back_end_for_TTECH.features.profile.application.model.UserData;
import com.dino.back_end_for_TTECH.features.profile.application.UserService;
import com.dino.back_end_for_TTECH.features.profile.application.model.UserBody;
import com.dino.back_end_for_TTECH.shared.api.annotation.AuthUser;
import com.dino.back_end_for_TTECH.shared.api.constant.HasRole;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@PreAuthorize(HasRole.CUSTOMER + " or " + HasRole.ADMIN)
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping
    public ResponseEntity<UserData> edit(
            @Valid @RequestBody UserBody body,
            @AuthUser CurrentUser currentUser
    ) {
        return ResponseEntity.ok(this.userService.edit(body, currentUser));
    }

}
