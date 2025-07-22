package com.dino.back_end_for_TTECH.product.application.model;

import java.util.List;

public record ProductSearchParams(
        String keyword,
        List<Integer> categories,
        Integer[] priceRange
) {
}
