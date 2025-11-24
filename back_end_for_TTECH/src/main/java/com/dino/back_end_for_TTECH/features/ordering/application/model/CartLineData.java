package com.dino.back_end_for_TTECH.features.ordering.application.model;

import com.dino.back_end_for_TTECH.features.product.application.model.ProductLean;

public record CartLineData(
        Long id,
        int quantity,
        ProductLean product
) {
}