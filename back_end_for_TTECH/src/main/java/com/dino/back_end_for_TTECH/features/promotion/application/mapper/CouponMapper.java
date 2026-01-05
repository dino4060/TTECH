package com.dino.back_end_for_TTECH.features.promotion.application.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import com.dino.back_end_for_TTECH.features.promotion.application.model.CouponBody;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CouponData;
import com.dino.back_end_for_TTECH.features.promotion.domain.Coupon;
import com.dino.back_end_for_TTECH.shared.application.mapper.BodyMapper;
import com.dino.back_end_for_TTECH.shared.application.mapper.DataMapper;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CouponMapper extends BodyMapper<Coupon, CouponBody>, DataMapper<Coupon, CouponData> {

  @Mapping(target = "units", ignore = true)
  Coupon toModel(CouponBody body);

  @Mapping(target = "units", ignore = true)
  void toModel(CouponBody body, @MappingTarget Coupon model);
}
