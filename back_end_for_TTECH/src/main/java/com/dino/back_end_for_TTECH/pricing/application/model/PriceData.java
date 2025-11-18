package com.dino.back_end_for_TTECH.pricing.application.model;

public record PriceData(
        long id,
        int mainPrice,
        int sidePrice,
        int dealPercent
) {
}
