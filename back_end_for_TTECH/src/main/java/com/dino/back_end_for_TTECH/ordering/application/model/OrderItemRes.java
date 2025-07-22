package com.dino.back_end_for_TTECH.ordering.application.model;

import com.dino.back_end_for_TTECH.product.application.model.ProductLeanRes;
import com.dino.back_end_for_TTECH.product.application.model.SkuLeanRes;

public record OrderItemRes(
        Long id,
        String photo,
        int quantity,
        int mainPrice,
        Integer sidePrice,
        ProductLeanRes product,
        SkuLeanRes sku
) {
}
