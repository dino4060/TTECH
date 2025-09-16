package com.dino.back_end_for_TTECH.shared.test.event;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/api/test/orders/place")
    public String place() {
        return this.orderService.place();
    }
}