package com.dino.back_end_for_TTECH.pricing.application.model;

public record PriceUpdateMessage(
        Long productId,
        Long skuId,
        Double newPrice
) {
}
