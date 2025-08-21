package com.dino.back_end_for_TTECH.product.application.model;

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

        @NotEmpty(message = "PRODUCT__SKUS_VALIDATION")
        List<SkuToWrite> skus
) {
}
