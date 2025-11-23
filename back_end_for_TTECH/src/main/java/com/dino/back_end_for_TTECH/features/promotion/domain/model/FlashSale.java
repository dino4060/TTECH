package com.dino.back_end_for_TTECH.features.promotion.domain.model;

import com.dino.back_end_for_TTECH.features.promotion.domain.Sale;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlashSale extends Sale {
    // max 3 days

//    @Override
//    public int getPriority() {
//        return 1;
//    }
}
