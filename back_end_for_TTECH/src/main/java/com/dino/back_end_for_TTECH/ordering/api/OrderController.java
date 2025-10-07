package com.dino.back_end_for_TTECH.ordering.api;

import com.dino.back_end_for_TTECH.ordering.application.OrderService;
import com.dino.back_end_for_TTECH.ordering.application.model.OrderBody;
import com.dino.back_end_for_TTECH.ordering.application.model.OrderData;
import com.dino.back_end_for_TTECH.product.application.model.ProductInList;
import com.dino.back_end_for_TTECH.shared.api.annotation.AuthUser;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.utils.AppPage;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {

    OrderService orderService;

    @GetMapping
    public ResponseEntity<AppPage<OrderData>> list(
            @PageableDefault(
                    page = 0, size = 50, sort = "id", direction = Sort.Direction.DESC
            ) Pageable pageable,
            @AuthUser CurrentUser user
    ) {
        var result = this.orderService.list(pageable, user);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<Void> checkout(
            @Valid @RequestBody OrderBody body,
            @AuthUser CurrentUser user
    ) {
        this.orderService.checkout(body, user);
        return ResponseEntity.ok(null);
    }
}
