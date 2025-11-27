package com.dino.back_end_for_TTECH.features.promotion.application.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
public class SaleData extends CampaignData {

    List<SaleUnitData> units;
}
