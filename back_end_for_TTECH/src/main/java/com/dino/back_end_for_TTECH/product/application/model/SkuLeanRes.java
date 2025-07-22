package com.dino.back_end_for_TTECH.product.application.model;

import java.util.List;

public record SkuLeanRes(
        Long id,
        String code,
        List<Integer> tierOptionIndexes,
        String tierOptionValue
) {
}