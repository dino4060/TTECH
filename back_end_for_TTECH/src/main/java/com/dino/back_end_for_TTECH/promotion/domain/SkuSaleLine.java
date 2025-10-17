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
@Table(name = "sku_sale_lines")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sku_sale_lines SET is_deleted = true WHERE sku_line_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SkuSaleLine extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sku_sale_lines_seq")
    @SequenceGenerator(name = "sku_sale_lines_seq", allocationSize = 1)
    @Column(name = "sku_line_id")
    Long id;

    Integer dealPrice;

    Integer dealPercent;

    Integer totalLimit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "line_id", updatable = false, nullable = false)
    SaleLine line;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", updatable = false, nullable = false)
    Sku sku;

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
