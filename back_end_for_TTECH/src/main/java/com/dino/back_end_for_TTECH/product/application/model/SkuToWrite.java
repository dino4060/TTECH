package com.dino.back_end_for_TTECH.product.application.model;

import com.dino.back_end_for_TTECH.inventory.application.model.InventoryToWrite;

public record SkuToWrite(
        String no,
        int retailPrice,

        InventoryToWrite inventory
) {
}
