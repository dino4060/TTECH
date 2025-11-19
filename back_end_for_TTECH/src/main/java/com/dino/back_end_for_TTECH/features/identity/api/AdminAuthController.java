package com.dino.back_end_for_TTECH.features.identity.api;

import com.dino.back_end_for_TTECH.features.identity.application.model.AuthRes;
import com.dino.back_end_for_TTECH.features.identity.application.model.LoginUsernameBody;
import com.dino.back_end_for_TTECH.features.identity.application.service.IAuthServiceForAdmin;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminAuthController {

    // PublicSellerAuthController //
    @RestController
    @RequestMapping("/api/public/admin/auth")
    @AllArgsConstructor
    public static class PublicAdminAuthController {

        private final IAuthServiceForAdmin authService;

        // login with username //
        @PostMapping("/login/username")
        public ResponseEntity<AuthRes> login(
                @Valid @RequestBody LoginUsernameBody body
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes result = this.authService.login(body, headers);
            return ResponseEntity.ok().headers(headers).body(result);
        }
    }
}
