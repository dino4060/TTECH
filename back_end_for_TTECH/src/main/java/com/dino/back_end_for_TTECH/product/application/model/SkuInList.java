package com.dino.back_end_for_TTECH.product.application.model;

import com.dino.back_end_for_TTECH.inventory.application.model.InventoryInList;
import com.dino.back_end_for_TTECH.product.domain.model.SkuStatus;

public record SkuInList(
        Long id,
        String no,
        int retailPrice,
        SkuStatus status,

        InventoryInList inventory
) {
}
