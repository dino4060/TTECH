package com.dino.back_end_for_TTECH.pricing.application.model;

public record ProductItemPriceRes(
        Long id,
        int mainPrice,
        int discountPercent,
        Integer sidePrice,

        Integer maxMainPrice,
        Integer maxDiscountPercent,
        Integer maxSidePrice
) {
}
