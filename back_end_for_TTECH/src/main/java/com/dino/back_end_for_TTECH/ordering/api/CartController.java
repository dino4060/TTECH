package com.dino.back_end_for_TTECH.ordering.api;

import com.dino.back_end_for_TTECH.ordering.application.CartServiceImpl;
import com.dino.back_end_for_TTECH.ordering.application.model.*;
import com.dino.back_end_for_TTECH.shared.api.annotation.AuthUser;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.utils.Deleted;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartController {

    // BuyerPublicCartController //

    // BuyerPrivateCartController //
    @RestController
    @RequestMapping("/api/carts")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class BuyerPrivateCartController {

        CartServiceImpl cartService;

        @GetMapping
        public ResponseEntity<CartRes> get(
                @AuthUser CurrentUser currentUser
        ) {
            var cart = this.cartService.get(currentUser);
            return ResponseEntity.ok(cart);
        }

        @PostMapping("/lines")
        public ResponseEntity<CartItemRes> addLine(
                @Valid @RequestBody AddCartItemReq dto,
                @AuthUser CurrentUser currentUser
        ) {
            var line = this.cartService.addCartItem(dto, currentUser);
            return ResponseEntity.ok(line);
        }

        @PatchMapping("/lines")
        public ResponseEntity<CartItemRes> updateQuantity(
                @Valid @RequestBody UpdateQuantityReq request,
                @AuthUser CurrentUser currentUser
        ) {
            var updatedItem = this.cartService.updateQuantity(request, currentUser);
            return ResponseEntity.ok(updatedItem);
        }

        @DeleteMapping("/lines")
        public ResponseEntity<Deleted> removeLines(
                @Valid @RequestBody RemoveCartItemReq request,
                @AuthUser CurrentUser currentUser
        ) {
            var deleteRes = this.cartService.removeCartItems(request, currentUser);
            return ResponseEntity.ok(deleteRes);
        }
    }
}