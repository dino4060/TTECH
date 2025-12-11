package com.dino.back_end_for_TTECH.features.product.application.model;

public record StockData(
        long id,
        int available,
        int sold,
        int total,
        Integer views,
        Integer carts
) {
}
