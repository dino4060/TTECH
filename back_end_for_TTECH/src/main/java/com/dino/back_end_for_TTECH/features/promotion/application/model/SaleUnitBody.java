package com.dino.back_end_for_TTECH.features.promotion.application.model;

import com.dino.back_end_for_TTECH.shared.application.utils.AppId;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class SaleUnitBody {

    @JsonProperty("isLive")
    boolean isLive;

    int dealPrice;

    int dealPercent;

    int totalLimit;

    int usedCount;

    String levelType;

    AppId product;
}
