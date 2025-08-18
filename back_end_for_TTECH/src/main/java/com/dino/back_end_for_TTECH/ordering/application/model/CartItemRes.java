package com.dino.back_end_for_TTECH.ordering.application.model;

import com.dino.back_end_for_TTECH.pricing.application.model.SkuPriceInList;
import com.dino.back_end_for_TTECH.product.application.model.ProductLeanRes;
import com.dino.back_end_for_TTECH.product.application.model.SkuLeanRes;

public record CartItemRes(
        Long id,
        int quantity,
        String photo,
        ProductLeanRes product,
        SkuLeanRes sku,
        SkuPriceInList price
) {
}