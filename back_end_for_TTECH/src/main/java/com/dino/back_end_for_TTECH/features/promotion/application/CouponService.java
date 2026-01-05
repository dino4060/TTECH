package com.dino.back_end_for_TTECH.features.promotion.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dino.back_end_for_TTECH.features.product.domain.repository.ProductRepository;
import com.dino.back_end_for_TTECH.features.promotion.application.mapper.CouponMapper;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CouponBody;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CouponData;
import com.dino.back_end_for_TTECH.features.promotion.domain.repository.CouponRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CouponService {

  CouponRepository couponRepo;
  CouponMapper couponMapper;

  ProductRepository productRepo;

  @Transactional
  public CouponData create(CouponBody body) {
    var coupon = this.couponMapper.toModel(body);

    // Process coupon units (products)
    if (coupon.getUnits() != null && !coupon.getUnits().isEmpty()) {
      for (var unit : coupon.getUnits()) {
        var product = this.productRepo.getByID(unit.getProduct().getId());

        unit.setCoupon(coupon);
        unit.setProduct(product);
      }
    }

    // Save coupon (cascade will save units)
    var savedCoupon = this.couponRepo.save(coupon);

    return this.couponMapper.toData(savedCoupon);
  }

  public Object get(long id) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'get'");
  }

  public void edit(CouponBody body) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'edit'");
  }

  public void delete(long id) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'delete'");
  }

}
