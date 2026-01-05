package com.dino.back_end_for_TTECH.features.promotion.api;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dino.back_end_for_TTECH.features.promotion.application.CouponService;
import com.dino.back_end_for_TTECH.features.promotion.application.model.CouponBody;
import com.dino.back_end_for_TTECH.shared.application.exception.BadRequestE;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/admin/campaigns/coupons")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminCouponController {

  CouponService couponService;

  @PostMapping
  public ResponseEntity<?> create(
      @Valid @RequestBody CouponBody body) {

    var result = this.couponService.create(body);
    return ResponseEntity.ok(result);
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> update(
      @Valid @RequestBody CouponBody body) {

    if (body.getId() == null) {
      throw new BadRequestE("CouponBody.id is required");
    }
    var result = this.couponService.update(body);
    return ResponseEntity.ok(result);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> get(
      @PathVariable long id) {

    var data = this.couponService.get(id);
    return ResponseEntity.ok(data);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(
      @PathVariable long id) {

    this.couponService.delete(id);
    return ResponseEntity.ok(Map.of());
  }
}
