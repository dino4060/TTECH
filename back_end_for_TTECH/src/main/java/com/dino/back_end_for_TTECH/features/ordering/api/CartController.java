package com.dino.back_end_for_TTECH.features.ordering.api;

import com.dino.back_end_for_TTECH.features.ordering.application.CartService;
import com.dino.back_end_for_TTECH.features.ordering.application.mapper.CartMapper;
import com.dino.back_end_for_TTECH.features.ordering.application.model.CartBody;
import com.dino.back_end_for_TTECH.features.ordering.application.model.CartData;
import com.dino.back_end_for_TTECH.features.ordering.application.model.CartLineBody;
import com.dino.back_end_for_TTECH.features.ordering.application.model.CartLineData;
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
@RequestMapping("/api/carts")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartController {

    CartService cartService;
    CartMapper cartMapper;

    @GetMapping
    public ResponseEntity<CartData> get(
            @AuthUser CurrentUser currentUser
    ) {
        var cart = this.cartService.get(currentUser);
        return ResponseEntity.ok(this.cartMapper.toCartData(cart));
    }

    @PostMapping("/lines")
    public ResponseEntity<CartLineData> addLineItem(
            @Valid @RequestBody CartLineBody body,
            @AuthUser CurrentUser currentUser
    ) {
        var line = this.cartService.addLineItem(body, currentUser);
        return ResponseEntity.ok(line);
    }

    @PatchMapping("/lines")
    public ResponseEntity<CartLineData> updateQuantity(
            @Valid @RequestBody CartLineBody body,
            @AuthUser CurrentUser currentUser
    ) {
        var updatedItem = this.cartService.updateQuantity(body, currentUser);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/lines")
    public ResponseEntity<Deleted> removeLines(
            @Valid @RequestBody CartBody body,
            @AuthUser CurrentUser currentUser
    ) {
        var deleteRes = this.cartService.removeLineItems(body, currentUser);
        return ResponseEntity.ok(deleteRes);
    }
}
