package com.dino.back_end_for_TTECH.product.domain.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductPriceView {
    Long id;
    int mainPrice;
    Integer sidePrice;
    int discountPercent;

    Integer maxMainPrice;
    Integer maxSidePrice;
    Integer maxDiscountPercent;
}
