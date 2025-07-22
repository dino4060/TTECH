package com.dino.back_end_for_TTECH.product.application.model;

import com.dino.back_end_for_TTECH.inventory.application.model.InventoryRes;
import com.dino.back_end_for_TTECH.product.domain.model.SkuStatus;

import java.util.List;

public record SkuRes(
        Long id,
        SkuStatus status,
        String code,
        List<Integer> tierOptionIndexes,
        String tierOptionValue,
        int retailPrice,
        Integer productionCost,

        InventoryRes inventory
) {
}
