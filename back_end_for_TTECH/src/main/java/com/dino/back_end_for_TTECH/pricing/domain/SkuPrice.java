package com.dino.back_end_for_TTECH.pricing.domain;

import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.Sku;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "sku_prices")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE sku_prices SET is_deleted = true WHERE sku_price_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SkuPrice extends BaseEntity {

    @Id
    @SequenceGenerator(name = "sku_prices_seq", allocationSize = 1)
    @Column(name = "sku_price_id")
    Long id;

    int mainPrice;

    int sidePrice;

    int discountPercent;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", updatable = false, nullable = false)
    Sku sku;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "price_id", updatable = false, nullable = false)
    Price price;

    // INSTANCE METHODS //

    public void create() {
    }

    public void update() {
    }
}
