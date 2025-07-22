package com.dino.back_end_for_TTECH.ordering.application.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateQuantityReq(
        @NotNull(message = "CART__ITEMS_EMPTY")
        Long cartItemId,

        @Min(value = 1, message = "CART__QUANTITY_MIN_INVALID")
        @Max(value = 100, message = "CART__QUANTITY_MAX_INVALID")
        int quantity) {
}