package com.dino.back_end_for_TTECH.product.application.model;

public record PriceBody(
        int mainPrice,
        int sidePrice,
        int discountPercent,

        int retailPrice
) {
}
