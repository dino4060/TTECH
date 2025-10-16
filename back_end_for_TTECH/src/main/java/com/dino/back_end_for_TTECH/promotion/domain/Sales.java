package com.dino.back_end_for_TTECH.promotion.domain;

import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.promotion.domain.model.LevelType;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.lang.Nullable;
import org.springframework.util.CollectionUtils;

import java.util.List;

/**
 * Represents a allDiscount that:
 * - Be part of a allDiscount program,
 * - Can be applied to a product or multiple skuPrices.
 * <p>
 * Note for properties:
 * - totalLimit, buyerLimit == NULL is unlimited.
 */
@Entity
@Table(name = "sales")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sales SET is_deleted = true WHERE sale_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Sales extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "sale_id")
    Long id;

    Boolean isEffective;

    Integer dealPrice;

    Integer discountPercent;

    Integer totalLimit;

    Integer usedCount;

    List<Long> usedBuyerIds;

    String levelType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", updatable = false, nullable = false)
    Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", updatable = false, nullable = false)
    SaleCampaign campaign;

    @OneToMany(mappedBy = "sale", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<SkuSales> skuSales;

    // INSTANCE METHODS //

    private boolean isWithinTotalLimit() {
        if (this.totalLimit == null || this.usedCount == null)
            return true;

        return this.usedCount < this.totalLimit;
    }

//    private boolean isWithinBuyerLimit(CurrentUser currentUser) {
//        if (this.buyerLimit == null || CollectionUtils.isEmpty(this.usedBuyerIds))
//            return true;
//
//        long count = this.usedBuyerIds.stream()
//                .filter(id -> id.equals(currentUser.id()))
//                .count();
//        return count < this.buyerLimit;
//    }

    // canApply //
    public boolean canApply(@Nullable CurrentUser currentUser) {
        if (!this.isWithinTotalLimit())
            return false;

        if (currentUser != null) // && !this.isWithinBuyerLimit(currentUser))
            return false;

        return this.campaign.isActive();
    }
}
