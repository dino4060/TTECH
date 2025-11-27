package com.dino.back_end_for_TTECH.features.promotion.domain;

import com.dino.back_end_for_TTECH.features.product.domain.Product;
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

@Entity
@Table(name = "sale_units")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sale_units SET is_deleted = true WHERE unit_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SaleUnit extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sale_lines_seq")
    @SequenceGenerator(name = "sale_lines_seq", allocationSize = 1)
    @Column(name = "unit_id")
    Long id;

    boolean isOn;

    int dealPrice;

    int dealPercent;

    int totalLimit;

    int usedCount = 0;

    String levelType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id", updatable = false, nullable = false)
    Sale sale;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", updatable = false, nullable = false)
    Product product;

    // INSTANCE METHODS //

    private boolean isWithinTotalLimit() {
        if (this.totalLimit == -1 || this.usedCount == -1)
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
