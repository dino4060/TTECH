package com.dino.back_end_for_TTECH.features.promotion.application.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
public class SaleBody extends CampaignBody {

    List<SaleUnitBody> units = new ArrayList<>();
}
