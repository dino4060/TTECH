package com.dino.back_end_for_TTECH.product.domain;

import com.dino.back_end_for_TTECH.inventory.domain.Inventory;
import com.dino.back_end_for_TTECH.inventory.domain.model.InventoryStatus;
import com.dino.back_end_for_TTECH.ordering.domain.CartLine;
import com.dino.back_end_for_TTECH.ordering.domain.OrderLine;
import com.dino.back_end_for_TTECH.pricing.domain.SkuPrice;
import com.dino.back_end_for_TTECH.product.domain.model.SkuStatus;
import com.dino.back_end_for_TTECH.product.domain.model.ProductTierVariation;
import com.dino.back_end_for_TTECH.promotion.domain.SkuSales;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skus")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE skus SET is_deleted = true WHERE sku_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Sku extends BaseEntity {

    @Id
    @SequenceGenerator(name = "skus_seq", allocationSize = 1)
    @Column(name = "sku_id")
    Long id;

    String no;

    List<Integer> tierOptionIndexes;

    String tierOptionValue;

    Integer productionCost;

    int retailPrice;

    @Enumerated(EnumType.STRING)
    SkuStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", updatable = false, nullable = false)
    Product product;

    @OneToOne(mappedBy = "sku", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    Inventory inventory; // YELLOW: always eager loading

    @OneToOne(mappedBy = "sku", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    SkuPrice price;

    @OneToMany(mappedBy = "sku", fetch = FetchType.LAZY)
    List<SkuSales> sales;

    @OneToMany(mappedBy = "sku", fetch = FetchType.LAZY)
    List<CartLine> cartLines;

    @OneToMany(mappedBy = "sku", fetch = FetchType.LAZY)
    List<OrderLine> orderLines;

    // FACTORY METHOD //

    public static List<Integer> createTierOptionIndexes(
            List<Integer> tierOptionIndexes, List<ProductTierVariation> tierVariations) {
        if (tierOptionIndexes.size() != tierVariations.size())
            throw new AppException(ErrorCode.SKU__TIER_OPTION_INDEXES_INVALID);

        List<Integer> result = new ArrayList<>();

        for (int i = 0; i < tierOptionIndexes.size(); i++) {
            var tierOptionIndex = createTierOptionIndex(tierOptionIndexes.get(i), tierVariations.get(i));
            result.add(tierOptionIndex);
        }

        return List.copyOf(result);
    }

    public static Integer createTierOptionIndex(
            Integer tierOptionIndex, ProductTierVariation tierVariation) {
        if (tierOptionIndex == null || tierOptionIndex < 0 || tierOptionIndex >= tierVariation.getOptions().size())
            throw new AppException(ErrorCode.SKU__TIER_OPTION_INDEXES_INVALID);

        return tierOptionIndex;
    }

    // SETTERS //

    public void setStatus() {
        if (AppUtils.isNull(this.getInventory())) {
            this.status = SkuStatus.OUT_OF_STOCK;
            return;
        }

        if (this.getInventory().getStatus() == InventoryStatus.OUT_OF_STOCK) {
            this.status = SkuStatus.OUT_OF_STOCK;
            return;
        }

        this.status = SkuStatus.LIVE;
    }

    // INSTANCE METHODS //

    public void create() {
        this.setStatus();
    }

    public void update() {
        this.setStatus();
    }
}
