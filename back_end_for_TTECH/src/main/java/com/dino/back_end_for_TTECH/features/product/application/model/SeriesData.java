package com.dino.back_end_for_TTECH.features.product.application.model;

public record SeriesData(
        Long id,
        String name,
        Integer position,
        CategoryData category
) {
}
