package com.dino.back_end_for_TTECH.features.promotion.application.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CouponBody extends CampaignBody {

  Long id;

  Integer discountAmount;

  Integer discountPercent;

  Integer minSpend;

  Integer maxDiscount;

  Integer expiryClaimDays;

  Integer totalLimit;

  Integer limitPerClient;

  Boolean isAllProducts;

  List<CouponUnitBody> units = new ArrayList<>();
}
