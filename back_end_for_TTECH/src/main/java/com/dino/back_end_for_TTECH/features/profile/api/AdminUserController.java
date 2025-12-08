package com.dino.back_end_for_TTECH.features.profile.api;

import com.dino.back_end_for_TTECH.features.profile.application.UserService;
import com.dino.back_end_for_TTECH.features.profile.application.model.UserQuery;
import com.dino.back_end_for_TTECH.shared.api.constant.HasRole;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize(HasRole.ADMIN)
@AllArgsConstructor
public class AdminUserController {

    private final UserService userService;

    @GetMapping("/customers")
    public ResponseEntity<?> listCustomers(
            @ModelAttribute UserQuery query
    ) {
        var data = this.userService.listCustomers(query);
        return ResponseEntity.ok(data);
    }
}
