package com.dino.back_end_for_TTECH.profile.api;

import com.dino.back_end_for_TTECH.profile.application.model.VerifyShopReq;
import com.dino.back_end_for_TTECH.profile.application.model.VerifyShopRes;
import com.dino.back_end_for_TTECH.profile.application.service.IShopService;
import com.dino.back_end_for_TTECH.shared.api.annotation.AuthUser;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SellerShopController {

    // PublicSellerShopController //

    // PrivateSellerShopController //
    @RestController
    @RequestMapping("/api/v1/seller/shops")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class PrivateSellerShopController {

        IShopService shopService;

        // QUERY //

        // COMMAND //

        // verifyShop //
        @PostMapping("/verify")
        public ResponseEntity<VerifyShopRes> verifyShop(
                @RequestBody VerifyShopReq request, @AuthUser CurrentUser currentUser
        ) {
            return ResponseEntity.ok(this.shopService.verifyShop(request, currentUser));
        }
    }
}
