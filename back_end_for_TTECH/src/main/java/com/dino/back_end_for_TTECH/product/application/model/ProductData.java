package com.dino.back_end_for_TTECH.product.application.model;

import com.dino.back_end_for_TTECH.pricing.application.model.PriceData;

import java.util.List;

public record ProductData(
        long id,
        String name,
        String thumb,
        PriceData price,

        List<String> photos,
        String description,
        String serialNumber,
        int retailPrice,
        int guaranteeMonths,

        CategoryInList category,
        SupplierInList supplier
) {
}
