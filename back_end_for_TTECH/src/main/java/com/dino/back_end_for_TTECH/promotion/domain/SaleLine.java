package com.dino.back_end_for_TTECH.promotion.domain;

import com.dino.back_end_for_TTECH.product.domain.Product;
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
@Table(name = "sale_lines")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sale_lines SET is_deleted = true WHERE line_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SaleLine extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sale_lines_seq")
    @SequenceGenerator(name = "sale_lines_seq", allocationSize = 1)
    @Column(name = "line_id")
    Long id;

    Boolean isEffective;

    Integer dealPrice;

    Integer dealPercent;

    Integer totalLimit;

    Integer usedCount;

    String levelType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id", updatable = false, nullable = false)
    Sale sale;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", updatable = false, nullable = false)
    Product product;

    @OneToMany(mappedBy = "line", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<SkuSaleLine> skuLines;

    // INSTANCE METHODS //

    private boolean isWithinTotalLimit() {
        if (this.totalLimit == null || this.usedCount == null)
            return true;

        return this.usedCount < this.totalLimit;
    }

    public boolean canApply(@Nullable CurrentUser currentUser) {
        if (!this.isWithinTotalLimit())
            return false;

        if (currentUser != null)
            return false;

        return this.sale.isActive();
    }
}
