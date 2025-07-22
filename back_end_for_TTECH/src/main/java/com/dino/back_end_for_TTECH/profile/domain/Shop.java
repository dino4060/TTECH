package com.dino.back_end_for_TTECH.profile.domain;

import com.dino.back_end_for_TTECH.ordering.domain.Order;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.profile.domain.model.BusinessType;
import com.dino.back_end_for_TTECH.profile.domain.model.ShopStatus;
import com.dino.back_end_for_TTECH.promotion.domain.ProductDiscountProgram;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Entity
@Table(name = "shops")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE shops SET is_deleted = true WHERE shop_id=?")
@SQLRestriction("is_deleted = false")
@SuperBuilder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Shop extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "shop_id")
    Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    ShopStatus status;

    String code;

    String name;

    String photo;

    String contactEmail;

    String contactPhone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    BusinessType businessType;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false, updatable = false)
    @JsonIgnore
    @ToString.Exclude
    User seller;

    @OneToMany(mappedBy = "shop", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    List<Product> products;

    @OneToMany(mappedBy = "shop", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    List<ProductDiscountProgram> discountPrograms;

    @OneToMany(mappedBy = "shop", fetch = FetchType.LAZY)
    @JsonIgnore
    @ToString.Exclude
    List<Order> orders;

    // FACTORY //

    public static Shop createShop(User seller) {
        Shop shop = new Shop();

        shop.setId(seller.getId());
        shop.setStatus(ShopStatus.VERIFYING);
        shop.setCode("shop" + System.currentTimeMillis());
        shop.setContactEmail(seller.getEmail());
        shop.setContactPhone(seller.getPhone());
        shop.setSeller(seller);

        return shop;
    }

    // INSTANCE //

    public void maskAsReviewing(
            BusinessType businessType, String name, String contactEmail, String contactPhone
    ) {
        boolean condition = this.status == ShopStatus.VERIFYING;

        if (!condition) throw new AppException(ErrorCode.SHOP__NOT_UPDATABLE);

        this.setStatus(ShopStatus.REVIEWING);
        this.setBusinessType(businessType);
        this.setName(name);
        this.setContactEmail(contactEmail);
        this.setContactPhone(contactPhone);
    }

    public void maskAsLive() {
        boolean condition = this.status == ShopStatus.REVIEWING;

        if (!condition) throw new AppException(ErrorCode.SHOP__NOT_UPDATABLE);

        this.setStatus(ShopStatus.LIVE);
    }
}

// location => address

// stars => review

// sales => product metrics

// returning customers => product metrics

// mall, vietnam => meta
