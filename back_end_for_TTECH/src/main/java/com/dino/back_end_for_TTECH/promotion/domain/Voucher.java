package com.dino.back_end_for_TTECH.promotion.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

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
public abstract class Voucher extends Campaign {

    int validityDays;

    String discountType;

    int discountValue;

    int minSpend;

    int totalLimit;

    int clientLimit;

    String applyType;

    @OneToMany(mappedBy = "voucher", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<VoucherLine> lines;

}