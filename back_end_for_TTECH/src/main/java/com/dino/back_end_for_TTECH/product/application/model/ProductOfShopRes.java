package com.dino.back_end_for_TTECH.product.application.model;

import com.dino.back_end_for_TTECH.product.domain.model.ProductMeta;
import com.dino.back_end_for_TTECH.product.domain.model.ProductSpecification;
import com.dino.back_end_for_TTECH.product.domain.model.ProductTierVariation;

import java.util.List;

public record ProductOfShopRes(
        Long id,
        String status,
        String name,
        String slug,
        String thumb,
        List<String> photos,
        String sizeGuidePhoto,
        String video,
        int retailPrice,
        String description,
        List<ProductSpecification> specifications,
        List<ProductTierVariation> tierVariations,
        ProductMeta meta,

        List<SkuRes> skus,
        CategoryBranchRes categoryBranch
) {
}
