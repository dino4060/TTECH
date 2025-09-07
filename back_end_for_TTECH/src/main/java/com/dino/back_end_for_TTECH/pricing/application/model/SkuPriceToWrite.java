package com.dino.back_end_for_TTECH.pricing.application.model;

public record SkuPriceToWrite(
        int mainPrice,
        int sidePrice,
        int discountPercent,

        int retailPrice
) {
}
