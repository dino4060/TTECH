package com.dino.back_end_for_TTECH.features.product.application.model;

public record StockData(
        int available,
        int sold,
        int total
) {
}
