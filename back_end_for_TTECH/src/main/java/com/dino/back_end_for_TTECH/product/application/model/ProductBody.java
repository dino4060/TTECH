package com.dino.back_end_for_TTECH.product.application.model;

import com.dino.back_end_for_TTECH.shared.application.utils.AppId;

import java.util.List;

public record ProductBody(
        String name,
        String thumb,
        String version,
        String color,

        int retailPrice,
        int guaranteeMonths,
        List<String> photos,
        String description,

        AppId category,
        AppId supplier,

        PriceBody price,
        StockBody stock
) {
}
