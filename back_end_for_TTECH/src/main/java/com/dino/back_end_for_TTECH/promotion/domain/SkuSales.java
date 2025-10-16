package com.dino.back_end_for_TTECH.promotion.domain;

import com.dino.back_end_for_TTECH.product.domain.Sku;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "sku_sales")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sku_sales SET is_deleted = true WHERE sku_discount_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SkuSales extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "sku_sale_id")
    Long id;

    Integer dealPrice;

    Integer dealPercent;

    Integer totalLimit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", updatable = false, nullable = false)
    Sku sku;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id", updatable = false, nullable = false)
    Sales sale;

    // FACTORY METHODS //

    public static Integer createDiscountPercent(Integer retailPrice, Integer dealPrice) {
        if (dealPrice == null)
            return 0;

        double discountRatio = 1 - (dealPrice.doubleValue() / retailPrice.doubleValue());
        int discountPercent = (int) Math.round(discountRatio * 100);

        if (discountPercent < 0) discountPercent = 0;
        if (discountPercent > 100) discountPercent = 100;  // đảm bảo từ 0..100

        return discountPercent;
    }

    public static Integer createDealPrice(Integer retailPrice, Integer discountPercent) {
        if (discountPercent == null)
            return retailPrice;

        double price = retailPrice * (100 - discountPercent) / 100.0;
        int dealPrice = (int) Math.round(price);

        if (dealPrice < 0) dealPrice = 0; // đảm bảo không âm

        return dealPrice;
    }
}
