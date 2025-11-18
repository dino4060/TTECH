package com.dino.back_end_for_TTECH.pricing.application.model;

public record PriceInList(
        long id,
        int mainPrice,
        int sidePrice,
        int dealPercent,

        Integer maxMainPrice,
        Integer maxSidePrice,
        Integer maxDealPercent
) {
}
