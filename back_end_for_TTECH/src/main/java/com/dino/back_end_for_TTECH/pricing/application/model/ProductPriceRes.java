package com.dino.back_end_for_TTECH.pricing.application.model;

import java.util.List;

public record ProductPriceRes(
        Long id,
        int mainPrice,
        int discountPercent,
        Integer sidePrice,

        Integer maxMainPrice,
        Integer maxDiscountPercent,
        Integer maxSidePrice,

        List<SkuPriceRes> skuPrices
) {
}
