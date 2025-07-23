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

        // LEGACY //

        // QUERY //

        // lookupIdentifier //
        @GetMapping("/lookup")
        public ResponseEntity<LookupEmailRes> lookupIdentifier(
                @RequestParam("email") String email
        ) {
            return ResponseEntity.ok(this.authService.lookupEmail(email));
        }

        // COMMAND //

        // loginWithPassword //
        @PostMapping("/login/password")
        public ResponseEntity<AuthRes> loginWithPassword(
                @Valid @RequestBody AuthEmailReq request
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes body = this.authService.login(request, headers);

            return ResponseEntity.ok().headers(headers).body(body);
        }

        // loginOrSignupWithGoogle //
        @PostMapping("/oauth2/google")
        public ResponseEntity<AuthRes> loginOrSignupWithGoogle(
                @RequestBody AuthGoogleReq request
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes body = this.authService.loginOrSignup(request, headers);

            return ResponseEntity.ok().headers(headers).body(body);
        }

        // refreshToken //
        @PostMapping("/refresh")
        public ResponseEntity<AuthRes> refresh(
                @CookieValue(name = "REFRESH_TOKEN", required = false) String refreshToken
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes authResponse = authService.refresh(refreshToken, headers);

            return ResponseEntity.ok().headers(headers).body(authResponse);
        }

    }

    // PrivateBuyerAuthController //
    @RestController
    @RequestMapping("/api/v1/auth")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class PrivateBuyerAuthController {

        IAuthServiceForCustomer authService;

        // QUERY //

        // getCurrentUser //
        @GetMapping("/me")
        public ResponseEntity<CurrentUserRes> getCurrentUser(@AuthUser CurrentUser currentUser) {
            return ResponseEntity.ok(this.authService.getCurrentUser(currentUser));
        }

        // COMMAND //

        // logout //
        @PostMapping("/logout")
        public ResponseEntity<AuthRes> logout(
                @CookieValue(name = "REFRESH_TOKEN", required = false) String refreshToken
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes authResponse = this.authService.logout(refreshToken, headers);

            return ResponseEntity.ok().headers(headers).body(authResponse);
        }

    }
}
