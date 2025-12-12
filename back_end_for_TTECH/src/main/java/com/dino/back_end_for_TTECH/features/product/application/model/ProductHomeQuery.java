package com.dino.back_end_for_TTECH.features.product.application.model;

import com.dino.back_end_for_TTECH.shared.application.model.PageQuery;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.FieldDefaults;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductHomeQuery extends PageQuery {
    String keywords;
    Long category;
    Long series;
    List<Integer> prices;

    @Pattern(regexp = "trendy|bestseller|favorite|discount|new|flop",
            message = "Statistics should be trendy, bestseller, favorite, discount, new, flop")
    String statistics = "new";
}