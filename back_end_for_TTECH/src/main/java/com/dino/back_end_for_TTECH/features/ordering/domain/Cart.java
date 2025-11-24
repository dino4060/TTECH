package com.dino.back_end_for_TTECH.features.ordering.domain;

import com.dino.back_end_for_TTECH.features.product.domain.Product;
import com.dino.back_end_for_TTECH.features.profile.domain.User;
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

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
@DynamicInsert
@DynamicUpdate
@SQLDelete(sql = "UPDATE carts SET is_deleted = true WHERE cart_id=?")
@SQLRestriction("is_deleted = false")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Cart extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "carts_seq")
    @SequenceGenerator(name = "carts_seq", allocationSize = 1)
    @Column(name = "cart_id")
    Long id;

    int total;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", nullable = false, updatable = false)
    @JsonIgnore
    User buyer;

    @OneToMany(mappedBy = "cart", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<CartLine> lines;

    // SETTERS //

    public void setTotal(int total) {
        if (total < 0)
            throw new AppException(ErrorCode.CART__TOTAL_MIN_INVALID);
        if (total > 100)
            throw new AppException(ErrorCode.CART__TOTAL_MAX_INVALID);

        this.total = total;
    }

    // FACTORY METHODS //

    /**
     * createCart.
     */
    public static Cart createCart(User buyer) {
        Cart cart = new Cart();

        cart.setLines(new ArrayList<>());
        cart.setTotal(0);
        cart.setBuyer(buyer);

        return cart;
    }

    // INSTANCE METHODS //

    /**
     * addCartItem.
     */
    public CartLine addLine(Product product, int quantity) {
        CartLine item = CartLine.createCartItem(this, product, quantity);

        this.getLines().add(item);
        this.setTotal(this.getTotal() + 1);

        return item;
    }

    /**
     * addOrUpdateCartItem.
     * (check CartItem is existing => increaseQuantity or addCartItem)
     */
    public CartLine addOrUpdateLine(Product product, int quantity) {
        return this.lines.stream()
                .filter(line -> line.getProduct().getId().equals(product.getId()))
                .findFirst()
                .map(line -> {
                    line.increaseQuantity(quantity);
                    return line;
                })
                .orElseGet(() -> this.addLine(product, quantity));
    }

    /**
     * updateQuantity.
     * (check CartItem is existing => updateQuantity or CART__ITEM_NOT_FOUND)
     */
    public CartLine updateQuantity(Long productId, int quantity) {
        return this.getLines().stream()
                .filter(line -> line.getProduct().getId().equals(productId))
                .findFirst()
                .map(line -> {
                    line.updateQuantity(quantity);
                    return line;
                })
                .orElseThrow(() -> new AppException(ErrorCode.CART__ITEM_NOT_FOUND));
    }

    /**
     * removeCartItems.
     */
    public List<CartLine> removeLines(List<Long> productIds) {
        // NOTE: orphanRemoval
        // 1. filter CartItems (objects on memory) to remove
        var cartItemsToRemove = this.getLines().stream()
                .filter(line -> productIds.contains(line.getProduct().getId()))
                .toList();

        // 2. removeAll items => JPA note they are orphan => orphanRemoval auto delete
        this.getLines().removeAll(cartItemsToRemove);
        this.setTotal(this.getTotal() - cartItemsToRemove.size());

        return cartItemsToRemove;
    }

    public List<CartLine> removeLinesByProductIds(List<Long> productIds) {
        // NOTE: orphanRemoval
        // 1. filter CartItems (objects on memory) to remove
        var cartItemsToRemove = this.getLines().stream()
                .filter(line -> productIds.contains(line.getProduct().getId()))
                .toList();

        // 2. removeAll items => JPA note they are orphan => orphanRemoval auto delete
        this.getLines().removeAll(cartItemsToRemove);
        this.setTotal(this.getTotal() - cartItemsToRemove.size());

        return cartItemsToRemove;
    }
}
