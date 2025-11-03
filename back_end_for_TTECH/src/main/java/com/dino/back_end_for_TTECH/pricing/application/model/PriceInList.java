package com.dino.back_end_for_TTECH.pricing.application.model;

import java.util.List;

public record PriceInList(
        long id,
        int mainPrice,
        int sidePrice,
        int dealPercent,

        Integer maxMainPrice,
        Integer maxSidePrice,
        Integer maxDealPercent,

        List<SkuPriceInList> skuPrices
) {
}
