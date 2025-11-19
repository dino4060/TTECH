package com.dino.back_end_for_TTECH.ordering.domain;

import com.dino.back_end_for_TTECH.features.product.domain.Product;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import com.dino.back_end_for_TTECH.shared.domain.model.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Table(name = "cart_lines")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE cart_lines SET is_deleted = true WHERE line_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartLine extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cart_lines_seq")
    @SequenceGenerator(name = "cart_lines_seq", allocationSize = 1)
    @Column(name = "line_id")
    Long id;

    int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false, updatable = false)
    @JsonIgnore
    Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false, updatable = false)
    Product product;

    // SETTER METHODS //

    public void setQuantity(int quantity) {
        if (quantity < 1)
            throw new AppException(ErrorCode.CART__QUANTITY_MIN_INVALID);
        if (quantity > 100)
            throw new AppException(ErrorCode.CART__QUANTITY_MAX_INVALID);

        this.quantity = quantity;
    }

    // FACTORY METHODS //

    public static CartLine createCartItem(Cart cart, Product product, int quantity) {
        CartLine item = new CartLine();
        item.setQuantity(quantity);
        item.setCart(cart);
        item.setProduct(product);

        return item;
    }

    public void increaseQuantity(int increment) {
        this.setQuantity(this.getQuantity() + increment);
    }

    public void updateQuantity(int quantity) {
        this.setQuantity(quantity);
    }
}
