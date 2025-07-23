package com.dino.back_end_for_TTECH.identity.api;

import com.dino.back_end_for_TTECH.identity.application.model.*;
import com.dino.back_end_for_TTECH.identity.application.service.IAuthServiceForCustomer;
import com.dino.back_end_for_TTECH.shared.api.annotation.AuthUser;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    // PublicAuthController //
    @RestController
    @RequestMapping("/api/public/auth")
    @AllArgsConstructor
    public static class PublicAuthController {

        private final IAuthServiceForCustomer authService;

        // WRITE //

        // register //
        @PostMapping("/register")
        public ResponseEntity<AuthRes> register(
                @Valid @RequestBody RegisterBody body
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes auth = this.authService.register(body, headers);
            return ResponseEntity.ok().headers(headers).body(auth);
        }

        // loginWithPhone //
        @PostMapping("/login/phone")
        public ResponseEntity<AuthRes> loginWithPhone(
                @Valid @RequestBody LoginPhoneBody body
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes result = this.authService.login(body, headers);

            return ResponseEntity.ok().headers(headers).body(result);
        }

        // loginWithGoogle //
        @PostMapping("/login/google")
        public ResponseEntity<AuthRes> loginWithGoogle(
                @RequestBody LoginGoogleBody body
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes result = this.authService.login(body, headers);

            return ResponseEntity.ok().headers(headers).body(result);
        }
    }
}
