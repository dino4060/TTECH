package com.dino.back_end_for_TTECH.ordering.application.model;

import com.dino.back_end_for_TTECH.pricing.application.model.PriceData;
import com.dino.back_end_for_TTECH.product.application.model.ProductLeanRes;

public record CartLineData(
        Long id,
        int quantity,
        String photo,
        ProductLeanRes product,
        PriceData price
) {
}