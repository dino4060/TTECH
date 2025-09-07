package com.dino.back_end_for_TTECH.product.domain;

import com.dino.back_end_for_TTECH.inventory.domain.Inventory;
import com.dino.back_end_for_TTECH.ordering.domain.CartItem;
import com.dino.back_end_for_TTECH.ordering.domain.OrderItem;
import com.dino.back_end_for_TTECH.product.domain.model.ProductTierVariation;
import com.dino.back_end_for_TTECH.promotion.domain.SkuSales;
import com.dino.back_end_for_TTECH.product.domain.model.SkuStatus;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
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

    @OneToOne(mappedBy = "sku")
    Inventory inventory; // YELLOW: always eager loading

    @OneToMany(mappedBy = "sku", fetch = FetchType.LAZY)
    List<SkuSales> skuDiscounts;

    @OneToMany(mappedBy = "sku", fetch = FetchType.LAZY)
    List<CartItem> cartItems;

    @OneToMany(mappedBy = "sku", fetch = FetchType.LAZY)
    List<OrderItem> orderItems;

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

    // INSTANCE //

    public void createSku() {
        this.status = SkuStatus.LIVE;
    }

    public void updateStocks(int quantity) {
        this.inventory.updateStocks(quantity);
    }

}
