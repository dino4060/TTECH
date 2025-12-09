package com.dino.back_end_for_TTECH.features.product.application.model;

import com.dino.back_end_for_TTECH.shared.application.utils.AppId;

public record SeriesBody(
        String name,
        Integer position,
        AppId category
) {
}
