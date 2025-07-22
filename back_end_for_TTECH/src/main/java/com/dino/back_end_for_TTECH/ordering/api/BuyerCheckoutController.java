package com.dino.back_end_for_TTECH.ordering.api;

import com.dino.back_end_for_TTECH.features.ordering.application.model.*;
import com.dino.back_end_for_TTECH.ordering.application.model.*;
import com.dino.back_end_for_TTECH.ordering.application.service.ICheckoutService;
import com.dino.back_end_for_TTECH.shared.api.annotation.AuthUser;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class BuyerCheckoutController {

    // BuyerPublicCheckoutController //

    // BuyerPrivateCheckoutController //
    @RestController
    @RequestMapping("/api/v1/checkout")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class BuyerPrivateCheckoutController {

        ICheckoutService checkoutService;

        // QUERY //

        /**
         * estimateCheckout
         * (preview checkout of CartItem list)
         */
        @PostMapping("/estimate")
        public ResponseEntity<EstimateCheckoutRes> estimateCheckout(
                @Valid @RequestBody EstimateCheckoutReq request,
                @AuthUser CurrentUser currentUser) {
            var checkout = this.checkoutService.estimateCheckout(request, currentUser);
            return ResponseEntity.ok(checkout);
        }

        // COMMAND //

        /**
         * startCheckout
         */
        @PostMapping("/start")
        public ResponseEntity<StartCheckoutRes> startCheckout(
                @Valid @RequestBody StartCheckoutReq request,
                @AuthUser CurrentUser currentUser) {
            var checkout = this.checkoutService.startCheckout(request, currentUser);
            return ResponseEntity.ok(checkout);
        }

        /**
         * confirm
         * (end the checkout process)
         */
        @PatchMapping("/confirm")
        public ResponseEntity<ConfirmCheckoutRes> confirmCheckout(
                @Valid @RequestBody ConfirmCheckoutReq request,
                @AuthUser CurrentUser currentUser) {
            var checkout = this.checkoutService.confirmCheckout(request, currentUser);
            return ResponseEntity.ok(checkout);
        }
    }
}
