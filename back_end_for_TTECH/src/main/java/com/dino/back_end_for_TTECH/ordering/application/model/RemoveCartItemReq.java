package com.dino.back_end_for_TTECH.ordering.application.model;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record RemoveCartItemReq(
        @NotEmpty(message = "CART__ITEMS_EMPTY")
        List<Long> cartItemIds) {
}