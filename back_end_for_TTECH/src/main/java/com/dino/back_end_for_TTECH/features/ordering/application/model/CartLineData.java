package com.dino.back_end_for_TTECH.features.ordering.application.model;

import com.dino.back_end_for_TTECH.features.product.application.model.ProductLeanData;

public record CartLineData(
        Long id,
        int quantity,
        ProductLeanData product
) {
}