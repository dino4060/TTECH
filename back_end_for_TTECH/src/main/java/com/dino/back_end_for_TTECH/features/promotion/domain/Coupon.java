package com.dino.back_end_for_TTECH.features.promotion.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.annotations.Type;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "vouchers")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE vouchers SET is_deleted = true WHERE campaign_id=?")
@SQLRestriction("is_deleted = false")
@DiscriminatorValue("VOUCHER")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "promotion_type", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PROTECTED)
public class Coupon extends Campaign {

  Integer discountAmount;

  Integer discountPercent;

  Integer minSpend;

  Integer maxDiscount;

  Integer expiryClaimDays;

  Integer totalLimit;

  Integer limitPerClient;

  Integer usedCount = 0;

  @Type(JsonType.class)
  @Column(columnDefinition = "jsonb")
  private Map<Long, Integer> countPerClient;

  Boolean isAllProducts;

  @OneToMany(mappedBy = "voucher", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  List<CouponUnit> units = new ArrayList<>();
}