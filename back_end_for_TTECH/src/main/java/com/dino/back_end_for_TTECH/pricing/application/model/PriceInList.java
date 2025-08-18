package com.dino.back_end_for_TTECH.pricing.application.model;

import java.util.List;

public record PriceInList(
        long id,
        int mainPrice,
        int sidePrice,
        int discountPercent,

        Integer maxMainPrice,
        Integer maxSidePrice,
        Integer maxDiscountPercent,

        List<SkuPriceInList> skuPrices
) {
}
