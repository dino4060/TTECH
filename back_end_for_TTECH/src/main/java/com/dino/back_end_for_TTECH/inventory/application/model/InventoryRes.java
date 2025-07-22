package com.dino.back_end_for_TTECH.inventory.application.model;

public record InventoryRes(
        Long id,
        int stocks,
        int sales,
        int total
) {
}
