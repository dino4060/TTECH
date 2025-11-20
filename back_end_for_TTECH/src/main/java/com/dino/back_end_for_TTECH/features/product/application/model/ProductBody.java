package com.dino.back_end_for_TTECH.features.product.application.model;

import com.dino.back_end_for_TTECH.shared.application.utils.AppId;

import java.util.List;

public record ProductBody(
        String name,
        String thumb,
        String version,
        String color,

        List<String> photos,
        String description,
        int guaranteeMonths,

        AppId category,
        AppId series,
        PriceBody price,
        StockBody stock
) {
}
