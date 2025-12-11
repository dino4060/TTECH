package com.dino.back_end_for_TTECH.features.product.application.model;

public record ProductLeanData(
        Long id,
        String name,
        String thumb,

        PriceData price,
        StockData stock
) {
}
