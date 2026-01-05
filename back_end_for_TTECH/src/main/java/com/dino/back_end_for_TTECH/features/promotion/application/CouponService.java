package com.dino.back_end_for_TTECH.features.promotion.application;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dino.back_end_for_TTECH.features.product.domain.repository.ProductRepository;
import com.dino.back_end_for_TTECH.features.promotion.application.mapper.CouponMapper;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CouponBody;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CouponData;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CouponUnitBody;
import com.dino.back_end_for_TTECH.features.promotion.domain.Coupon;
import com.dino.back_end_for_TTECH.features.promotion.domain.CouponUnit;
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
    // Convert body to coupon (exclude units)
    var coupon = this.couponMapper.toModel(body);

    // Process coupon units (products)
    if (coupon.getIsAllProducts() == false) {
      List<CouponUnit> newUnits = body.getUnits().stream()
          .map(unitBody -> this.createCouponUnit(coupon, unitBody))
          .collect(Collectors.toList());

      coupon.getUnits().addAll(newUnits);
    }

    // Save coupon (cascade will save units)
    var savedCoupon = this.couponRepo.save(coupon);

    return this.couponMapper.toData(savedCoupon.getId());
  }

  @Transactional
  public CouponData update(CouponBody body) {
    var coupon = this.couponRepo.getById(body.getId());

    // Convert body to coupon (exclude units)
    this.couponMapper.toModel(body, coupon);

    // Process coupon units (products)
    if (coupon.getIsAllProducts() == false) {
      this.processCouponUnits(coupon, body.getUnits());
    }

    // Save coupon (cascade and orphanRemoval will save units)
    var savedCoupon = this.couponRepo.save(coupon);

    return this.couponMapper.toData(savedCoupon.getId());
  }

  /**
   * Process CouponUnit list by "Compare 3 status" strategy
   * - Unit doesn't have id => CREATE
   * - Unit has id and exists in DB => UPDATE
   * - Unit exists in DB but doesn't exist in body => DELETE
   */
  private void processCouponUnits(Coupon coupon, List<CouponUnitBody> unitBodyList) {
    Map<Long, CouponUnit> currUnits = coupon.getUnits().stream()
        .filter(unit -> unit.getId() != null)
        .collect(Collectors.toMap(unit -> unit.getId(), unit -> unit));

    List<CouponUnit> updatedUnits = unitBodyList.stream()
        .map(unitBody -> {
          if (unitBody.getId() != null && currUnits.containsKey(unitBody.getId())) {
            // UPDATE
            CouponUnit existingUnit = currUnits.remove(unitBody.getId());
            this.updateCouponUnit(existingUnit, unitBody);
            return existingUnit;
          } else {
            // CREATE
            return this.createCouponUnit(coupon, unitBody);
          }
        })
        .toList();

    // DELETE
    coupon.getUnits().clear();
    coupon.getUnits().addAll(updatedUnits);
  }

  private void updateCouponUnit(CouponUnit unit, CouponUnitBody body) {
    Long newProductId = body.getProductId();
    Long currProductId = unit.getProduct() != null ? unit.getProduct().getId() : null;

    // Update product field
    if (!newProductId.equals(currProductId)) {
      var product = this.productRepo.getIdById(newProductId);
      unit.setProduct(product);
    }
  }

  private CouponUnit createCouponUnit(Coupon coupon, CouponUnitBody body) {
    var product = this.productRepo.getIdById(body.getProductId());

    var unit = new CouponUnit();
    unit.setCoupon(coupon);
    unit.setProduct(product);

    return unit;
  }

  public Object get(long id) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'get'");
  }

  public void delete(long id) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'delete'");
  }

}
