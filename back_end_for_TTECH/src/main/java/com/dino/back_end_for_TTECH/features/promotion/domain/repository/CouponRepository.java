package com.dino.back_end_for_TTECH.features.promotion.domain.repository;

import com.dino.back_end_for_TTECH.features.promotion.domain.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

}
