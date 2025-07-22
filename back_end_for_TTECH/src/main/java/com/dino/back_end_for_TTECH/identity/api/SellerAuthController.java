package com.dino.back_end_for_TTECH.identity.api;

import com.dino.back_end_for_TTECH.identity.application.model.AuthEmailReq;
import com.dino.back_end_for_TTECH.identity.application.model.AuthRes;
import com.dino.back_end_for_TTECH.identity.application.model.CurrentShopRes;
import com.dino.back_end_for_TTECH.identity.application.service.IAuthServiceForSeller;
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
public class SellerAuthController {

    // PublicSellerAuthController //
    @RestController
    @RequestMapping("/api/v1/public/seller/auth")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class PublicSellerAuthController {

        IAuthServiceForSeller authService;

        // QUERY //

        // COMMAND //

        // login //
        @PostMapping("/login/email")
        public ResponseEntity<AuthRes> login(
                @Valid @RequestBody AuthEmailReq request
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes body = this.authService.login(request, headers);

            return ResponseEntity.ok().headers(headers).body(body);
        }

        // signup //
        @PostMapping("/signup/email")
        public ResponseEntity<AuthRes> signup(
                @Valid @RequestBody AuthEmailReq request
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes body = this.authService.signup(request, headers);

            return ResponseEntity.ok().headers(headers).body(body);
        }

        // refresh //
        @PostMapping("/refresh")
        public ResponseEntity<AuthRes> refresh(
                @CookieValue(name = "REFRESH_TOKEN", required = false) String refreshToken
        ) {
            HttpHeaders headers = new HttpHeaders();
            AuthRes authResponse = authService.refresh(refreshToken, headers);

            return ResponseEntity.ok().headers(headers).body(authResponse);
        }

    }

    // PrivateSellerAuthController //
    @RestController
    @RequestMapping("/api/v1/seller/auth")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class PrivateSellerAuthController {

        IAuthServiceForSeller authService;

        // QUERY //

        // getCurrentShop //
        @GetMapping("/me")
        public ResponseEntity<CurrentShopRes> getCurrentShop(
                @AuthUser CurrentUser currentUser
        ) {
            return ResponseEntity.ok(this.authService.getCurrentShop(currentUser));
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
