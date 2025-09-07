package com.dino.back_end_for_TTECH.pricing.application.model;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record PriceToWrite(
        int retailPrice,

        @NotEmpty(message = "PRICE__SKU_PRICES_VALIDATION")
        List<SkuPriceToWrite> skuPrices
) {
}
