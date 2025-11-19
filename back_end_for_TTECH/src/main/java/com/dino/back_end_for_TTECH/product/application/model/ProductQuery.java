package com.dino.back_end_for_TTECH.product.application.model;

import com.dino.back_end_for_TTECH.shared.application.model.PageQuery;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductQuery extends PageQuery {
    String keywords;
    List<Integer> prices;
    Long category;
    Long supplier;
}