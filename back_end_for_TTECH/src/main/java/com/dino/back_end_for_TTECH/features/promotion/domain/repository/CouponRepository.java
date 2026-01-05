package com.dino.back_end_for_TTECH.features.promotion.domain.repository;

import org.springframework.stereotype.Repository;

import com.dino.back_end_for_TTECH.features.promotion.domain.Coupon;
import com.dino.back_end_for_TTECH.shared.domain.BaseRepository;

@Repository
public interface CouponRepository extends BaseRepository<Coupon, Long> {

  @Override
  default String customModelName() {
    return Coupon.class.getName();
  }

}
