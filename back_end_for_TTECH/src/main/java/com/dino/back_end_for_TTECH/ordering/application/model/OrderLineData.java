package com.dino.back_end_for_TTECH.ordering.application.model;

import com.dino.back_end_for_TTECH.product.application.model.ProductLeanRes;

public record OrderLineData(
        ProductLeanRes product,
        int quantity,
        int mainPrice,
        int sidePrice
) {
}
