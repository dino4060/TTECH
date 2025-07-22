package com.dino.back_end_for_TTECH.ordering.api;

import com.dino.back_end_for_TTECH.ordering.application.model.*;
import com.dino.back_end_for_TTECH.ordering.application.service.ICartService;
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
public class BuyerCartController {

    // BuyerPublicCartController //

    // BuyerPrivateCartController //
    @RestController
    @RequestMapping("/api/v1/carts")
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public static class BuyerPrivateCartController {

        ICartService cartService;

        // QUERY //

        // getCart //
        @GetMapping("/get")
        public ResponseEntity<CartRes> getCart(
                @AuthUser CurrentUser currentUser) {
            var cart = this.cartService.get(currentUser);
            return ResponseEntity.ok(cart);
        }

        // COMMAND //

        // addCartItem //
        @PostMapping("/items/add")
        public ResponseEntity<CartItemRes> addCartItem(
                @Valid @RequestBody AddCartItemReq request,
                @AuthUser CurrentUser currentUser) {
            var addedItem = this.cartService.addCartItem(request, currentUser);
            return ResponseEntity.ok(addedItem);
        }

        // updateQuantity //
        @PatchMapping("/items/quantity/update")
        public ResponseEntity<CartItemRes> updateCartItemQuantity(
                @Valid @RequestBody UpdateQuantityReq request,
                @AuthUser CurrentUser currentUser) {
            var updatedItem = this.cartService.updateQuantity(request, currentUser);
            return ResponseEntity.ok(updatedItem);
        }

        // removeCartItems //
        @DeleteMapping("/items/remove")
        public ResponseEntity<Deleted> removeCartItems(
                @Valid @RequestBody RemoveCartItemReq request,
                @AuthUser CurrentUser currentUser) {
            var deleteRes = this.cartService.removeCartItems(request, currentUser);
            return ResponseEntity.ok(deleteRes);
        }
    }
}