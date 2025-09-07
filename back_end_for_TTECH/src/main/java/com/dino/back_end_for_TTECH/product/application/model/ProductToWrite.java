package com.dino.back_end_for_TTECH.product.application.model;

import com.dino.back_end_for_TTECH.pricing.application.model.PriceToWrite;
import com.dino.back_end_for_TTECH.shared.application.utils.AppId;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record ProductToWrite(
        String name,
        String serialNumber,
        int retailPrice,
        int guaranteeMonths,
        String thumb,
        List<String> photos,
        String description,

        AppId category,
        AppId supplier,

        PriceToWrite price,

        @NotEmpty(message = "PRODUCT__SKUS_VALIDATION")
        List<SkuToWrite> skus
) {
}
