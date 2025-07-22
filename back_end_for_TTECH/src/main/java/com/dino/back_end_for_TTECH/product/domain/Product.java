package com.dino.back_end_for_TTECH.product.domain;

import com.dino.back_end_for_TTECH.pricing.domain.ProductPrice;
import com.dino.back_end_for_TTECH.product.domain.model.ProductMeta;
import com.dino.back_end_for_TTECH.product.domain.model.ProductSpecification;
import com.dino.back_end_for_TTECH.product.domain.model.ProductStatus;
import com.dino.back_end_for_TTECH.product.domain.model.ProductTierVariation;
import com.dino.back_end_for_TTECH.promotion.domain.ProductDiscount;
import com.dino.back_end_for_TTECH.profile.domain.Shop;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.*;

import java.util.List;

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
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "product_id")
    Long id;

    @Enumerated(EnumType.STRING)
    ProductStatus status;

    @Column(nullable = false)
    String name;

    String slug;

    @Column(nullable = false)
    String thumb;

    List<String> photos;

    String sizeGuidePhoto;

    String video;

    int retailPrice;

    @Column(columnDefinition = "text")
    String description;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    List<ProductSpecification> specifications;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    List<ProductTierVariation> tierVariations;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    ProductMeta meta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_branch_id")
    CategoryBranch categoryBranch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", updatable = false, nullable = false)
    Shop shop;

    @OneToOne(mappedBy = "product")
    ProductPrice price;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<Sku> skus;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<ProductDiscount> discounts;
}
