package com.dino.back_end_for_TTECH.product.application.model;

import java.util.List;

public record ProductQuery(
        String keywords,
        List<Integer> prices,
        Long category,
        Long supplier
) {
}