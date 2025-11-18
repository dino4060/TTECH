package com.dino.back_end_for_TTECH.product.application.model;

import com.dino.back_end_for_TTECH.pricing.application.model.PriceData;

import java.util.List;

public record ProductToSell(
        long id,
        String name,
        String serialNumber,
        int retailPrice,
        int guaranteeMonths,
        String thumb,
        List<String> photos,
        String description,

        CategoryInList category,
        SupplierInList supplier,
        PriceData price
) {
}
