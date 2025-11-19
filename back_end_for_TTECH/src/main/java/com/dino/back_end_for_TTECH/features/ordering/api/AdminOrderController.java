package com.dino.back_end_for_TTECH.features.ordering.api;

import com.dino.back_end_for_TTECH.features.ordering.application.OrderService;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderData;
import com.dino.back_end_for_TTECH.features.ordering.application.model.OrderQuery;
import com.dino.back_end_for_TTECH.shared.application.utils.AppPage;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/orders")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminOrderController {

    OrderService orderService;

    @GetMapping
    public ResponseEntity<AppPage<OrderData>> list(
            @PageableDefault(
                    page = 0, size = 50, sort = "id", direction = Sort.Direction.DESC
            ) Pageable pageable,
            @ModelAttribute OrderQuery query
    ) {
        var result = this.orderService.list(query, pageable);
        return ResponseEntity.ok(result);
    }
}
