package com.dino.back_end_for_TTECH.pricing.application.model;

public record SkuPriceRes(
        Long id,
        int mainPrice,
        int discountPercent,
        Integer sidePrice
) {
}
