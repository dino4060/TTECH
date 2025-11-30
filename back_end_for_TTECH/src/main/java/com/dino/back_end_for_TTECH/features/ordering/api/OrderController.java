package com.dino.back_end_for_TTECH.features.ordering.api;

import com.dino.back_end_for_TTECH.features.ordering.application.OrderService;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderBody;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderEditBody;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderQuery;
import com.dino.back_end_for_TTECH.shared.api.annotation.AuthUser;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {

    OrderService orderService;

    @GetMapping
    public ResponseEntity<?> list(
            @ModelAttribute OrderQuery query,
            @AuthUser CurrentUser user
    ) {
        var data = this.orderService.list(query, user);
        return ResponseEntity.ok(data);
    }

    @PostMapping
    public ResponseEntity<?> checkout(
            @Valid @RequestBody OrderBody body,
            @AuthUser CurrentUser user
    ) {
        var data = this.orderService.checkout(body, user);
        return ResponseEntity.ok(data);
    }

    @PatchMapping
    public ResponseEntity<?> edit(
            @Valid @RequestBody OrderEditBody body,
            @AuthUser CurrentUser user
    ) {
        var data = this.orderService.editPartially(body, user);
        return ResponseEntity.ok(data);
    }
}
