package com.dino.back_end_for_TTECH.product.application.model;

import com.dino.back_end_for_TTECH.pricing.application.model.ProductItemPriceRes;
import com.dino.back_end_for_TTECH.product.domain.model.ProductMeta;

import java.time.Instant;

public record ProductWithPriceRes(
        Long id,
        String status,
        Instant updatedAt,
        String name,
        String thumb,
        ProductMeta meta,
        ProductItemPriceRes price
) {
}
