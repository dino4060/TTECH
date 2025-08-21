package com.dino.back_end_for_TTECH.pricing.domain;

import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.Sku;
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
@Table(name = "prices")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE prices SET is_deleted = true WHERE price_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Price extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "price_id")
    Long id;

    int mainPrice;

    int sidePrice;

    int discountPercent;

    Integer maxMainPrice;

    Integer maxSidePrice;

    Integer maxDiscountPercent;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false, updatable = false)
    Product product;

    @OneToMany(mappedBy = "price", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<SkuPrice> skuPrices;

    // INSTANCE METHODS //

    public void create() {
        this.mainPrice = this.product.getRetailPrice();
        this.sidePrice = 0;
        this.discountPercent = 0;
        this.maxMainPrice = this.mainPrice;
        this.maxSidePrice = this.sidePrice;
        this.maxDiscountPercent = this.discountPercent;
        this.skuPrices = new ArrayList<>();

        for (Sku sku : this.product.getSkus()) {
            SkuPrice skuPrice = new SkuPrice();
            this.skuPrices.add(skuPrice);

            skuPrice.setPrice(this);
            skuPrice.setSku(sku);
            skuPrice.create();
        }
    }
}
