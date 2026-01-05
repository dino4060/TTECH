package com.dino.back_end_for_TTECH.features.promotion.application.model;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CouponUnitBody {

  Long id;

  @NotNull(message = "CouponUnitBody.productId is required")
  Long productId;
}
