package com.dino.back_end_for_TTECH.pricing.application.model;

public record PriceToWrite(
        int mainPrice,
        int sidePrice,
        int discountPercent,

        Integer maxMainPrice,
        Integer maxSidePrice,
        Integer maxDiscountPercent,

        int retailPrice
) {
}
