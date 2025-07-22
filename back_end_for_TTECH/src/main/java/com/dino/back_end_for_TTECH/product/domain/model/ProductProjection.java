package com.dino.back_end_for_TTECH.product.domain.model;

import java.time.Instant;

import com.dino.back_end_for_TTECH.pricing.domain.ProductPrice;

public interface ProductProjection {
    Long getId();

    String getStatus();

    Instant getUpdatedAt();

    String getName();

    String getThumb();

    ProductMeta getMeta();

    ProductPrice getPrice();
}
