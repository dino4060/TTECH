package com.dino.back_end_for_TTECH.features.product.application.model;

import java.util.List;

import com.dino.back_end_for_TTECH.shared.application.model.PageQuery;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductQuery extends PageQuery {
    String keywords;
    Long category;
    Long series;
    List<Integer> prices;
}