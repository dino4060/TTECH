package com.dino.back_end_for_TTECH.features.promotion.application.model;

import com.dino.back_end_for_TTECH.shared.application.utils.AppId;

import lombok.Data;

@Data
public class CouponUnitBody {

  Long id;

  AppId product;
}
