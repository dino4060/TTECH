package com.dino.back_end_for_TTECH.product.application.model;

public record CategoryBranchRes(
        Long id,
        CategoryLeanRes level1Category,
        CategoryLeanRes level2Category,
        CategoryLeanRes level3Category
) {
}
