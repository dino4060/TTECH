package com.dino.back_end_for_TTECH.ordering.application.model;

import jakarta.validation.constraints.NotEmpty;

import java.util.Set;

public record EstimateCheckoutReq(

        @NotEmpty(message = "CART__ITEMS_EMPTY")
        Set<Long> cartItemIds
) {
}
