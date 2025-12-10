package com.dino.back_end_for_TTECH.features.product.application.model;

import com.dino.back_end_for_TTECH.shared.application.model.PageQuery;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeriesQuery extends PageQuery {
        Long category;
}
