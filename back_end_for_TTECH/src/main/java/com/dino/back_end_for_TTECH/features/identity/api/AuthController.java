package com.dino.back_end_for_TTECH.identity.api;

import com.dino.back_end_for_TTECH.identity.application.model.*;
import com.dino.back_end_for_TTECH.identity.application.service.IAuthServiceForCustomer;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
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
            AuthRes auth = this.authService.registerCustomer(body, headers);
            return ResponseEntity.ok().headers(headers).body(auth);
        }

        // login with phone //
        @PostMapping("/login/phone")
        public ResponseEntity<AuthRes> login(
                @Valid @RequestBody LoginPhoneBody body
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes result = this.authService.login(body, headers);

            return ResponseEntity.ok().headers(headers).body(result);
        }

        // login with Google //
        @PostMapping("/login/google")
        public ResponseEntity<AuthRes> login(
                @RequestBody LoginGoogleBody body
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes result = this.authService.login(body, headers);

            return ResponseEntity.ok().headers(headers).body(result);
        }
    }
}
