package com.dino.back_end_for_TTECH.features.product.application.model;

public record PriceData(
        long id,
        int retailPrice,
        int mainPrice,
        int sidePrice,
        int dealPercent
) {
}
