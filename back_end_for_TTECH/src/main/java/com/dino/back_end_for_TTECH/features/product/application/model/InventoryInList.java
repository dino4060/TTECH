package com.dino.back_end_for_TTECH.features.product.application.model;

public record InventoryInList(
        long id,
        int total,
        int sold,
        int available
) {
}
