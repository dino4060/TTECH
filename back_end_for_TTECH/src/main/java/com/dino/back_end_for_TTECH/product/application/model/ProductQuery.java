package com.dino.back_end_for_TTECH.product.application.model;

public record ProductQuery(
        String name,
        Integer[] range,
        Integer category,
        Integer supplier
) {
}