package com.dino.back_end_for_TTECH.identity.api;

import com.dino.back_end_for_TTECH.identity.application.service.IAuthServiceForSeller;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminAuthController {

    // PublicSellerAuthController //
    @RestController
    @RequestMapping("/api/v1/public/seller/auth")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class PublicSellerAuthController {

        IAuthServiceForSeller authService;
    }

    // PrivateSellerAuthController //
    @RestController
    @RequestMapping("/api/v1/seller/auth")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class PrivateSellerAuthController {

        IAuthServiceForSeller authService;
    }
}
