package com.dino.back_end_for_TTECH.product.application.model;

import com.dino.back_end_for_TTECH.shared.application.utils.AppId;

public record StockBody(
        AppId product,
        int available,
        int restock
) {
}
