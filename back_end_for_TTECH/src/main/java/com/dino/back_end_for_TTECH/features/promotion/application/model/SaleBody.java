package com.dino.back_end_for_TTECH.features.promotion.application.model;

import com.dino.back_end_for_TTECH.features.promotion.domain.Sale;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class SaleBody extends Sale {
    @Override
    public int getPriority() {
        return 0;
    }
}
