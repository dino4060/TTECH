package com.dino.back_end_for_TTECH.ordering.domain;

import com.dino.back_end_for_TTECH.product.domain.Sku;
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

@Entity
@Table(name = "cart_items")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE cart_items SET is_deleted = true WHERE cart_item_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "cart_item_id")
    Long id;

    int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false, updatable = false)
    @JsonIgnore
    Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sku_id", nullable = false)
    Sku sku;

    // SETTER METHODS //

    public void setQuantity(int quantity) {
        if (quantity < 1)
            throw new AppException(ErrorCode.CART__QUANTITY_MIN_INVALID);
        if (quantity > 100)
            throw new AppException(ErrorCode.CART__QUANTITY_MAX_INVALID);

        this.quantity = quantity;
    }

    // FACTORY METHODS //

    public static CartItem createCartItem(Cart cart, Sku sku, int quantity) {
        CartItem item = new CartItem();
        item.setQuantity(quantity);
        item.setCart(cart);
        item.setSku(sku);

        return item;
    }

    public void increaseQuantity(int increment) {
        this.setQuantity(this.getQuantity() + increment);
    }

    public void updateQuantity(int quantity) {
        this.setQuantity(quantity);
    }
}
