package com.dino.back_end_for_TTECH.features.promotion.application.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.Valid;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CouponBody extends CampaignBody {

  Integer discountAmount;

  Integer discountPercent;

  Integer minSpend;

  Integer maxDiscount;

  Integer expiryClaimDays;

  Integer totalLimit;

  Integer limitPerClient;

  Boolean isAllProducts;

  @Valid
  List<CouponUnitBody> units = new ArrayList<>();
}
