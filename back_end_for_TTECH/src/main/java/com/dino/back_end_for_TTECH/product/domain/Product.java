package com.dino.back_end_for_TTECH.product.domain;

import com.dino.back_end_for_TTECH.pricing.domain.Price;
import com.dino.back_end_for_TTECH.product.domain.model.ProductSpecification;
import com.dino.back_end_for_TTECH.product.domain.model.ProductStatus;
import com.dino.back_end_for_TTECH.product.domain.model.ProductTierVariation;
import com.dino.back_end_for_TTECH.product.domain.model.SkuStatus;
import com.dino.back_end_for_TTECH.promotion.domain.Sales;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.*;

import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "products")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE products SET is_deleted = true WHERE product_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product extends BaseEntity {

    @Id
    @SequenceGenerator(name = "products_seq", allocationSize = 1)
    @Column(name = "product_id")
    Long id;

    @Column(nullable = false)
    String name;

    String serialNumber;

    int retailPrice;

    int guaranteeMonths;

    @Column(nullable = false)
    String thumb;

    String video;

    List<String> photos;

    String sizeGuidePhoto;

    @Column(columnDefinition = "text")
    String description;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    List<ProductSpecification> specifications;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    List<ProductTierVariation> tierVariations;

    @Enumerated(EnumType.STRING)
    ProductStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    Supplier supplier;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<Sales> discounts;

    @OneToOne(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    Price price;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<Sku> skus;

    // SETTERS //

    public void setStatus() {
        if (AppUtils.isEmpty(this.getSkus())) {
            this.status = ProductStatus.OUT_OF_STOCK;
            return;
        }

        if (skus.stream().allMatch(sku -> sku.getStatus() == SkuStatus.OUT_OF_STOCK)) {
            this.status = ProductStatus.OUT_OF_STOCK;
            return;
        }

        this.status = ProductStatus.LIVE;
    }

    // INSTANCE METHODS //

    public void create() {
        this.setStatus();
    }

    public void update() {
        this.setStatus();
    }

    public Optional<Sales> getActiveSales() {
        /*
         * get sales, check in period, in limit, is the highest priority (// TEMP)
         */
        return Optional.empty();
    }

    public boolean isInBusiness() {
        // logic: get skus > each sku > check non in cart item || in non order item > flag = false
        if (AppUtils.isEmpty(this.getSkus())) return false;

        return skus.stream().anyMatch(sku ->
                !AppUtils.isEmpty(sku.getCartItems()) || !AppUtils.isEmpty(sku.getOrderItems()));
    }
}
