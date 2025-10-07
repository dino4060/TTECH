package com.dino.back_end_for_TTECH.ordering.domain;

import com.dino.back_end_for_TTECH.product.domain.Sku;
import com.dino.back_end_for_TTECH.profile.domain.User;
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
    List<CartLine> cartLines;

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

        cart.setCartLines(new ArrayList<>());
        cart.setTotal(0);
        cart.setBuyer(buyer);

        return cart;
    }

    // INSTANCE METHODS //

    /**
     * addCartItem.
     */
    public CartLine addCartItem(Sku sku, int quantity) {
        CartLine item = CartLine.createCartItem(this, sku, quantity);

        this.getCartLines().add(item);
        this.setTotal(this.getTotal() + 1);

        return item;
    }

    /**
     * addOrUpdateCartItem.
     * (check CartItem is existing => increaseQuantity or addCartItem)
     */
    public CartLine addOrUpdateCartItem(Sku sku, int quantity) {
        return this.cartLines.stream()
                .filter(item -> item.getSku().getId().equals(sku.getId()))
                .findFirst()
                .map(cartItem -> {
                    cartItem.increaseQuantity(quantity);
                    return cartItem;
                })
                .orElseGet(() -> {
                    return this.addCartItem(sku, quantity);
                });
    }

    /**
     * updateQuantity.
     * (check CartItem is existing => updateQuantity or CART__ITEM_NOT_FOUND)
     */
    public CartLine updateQuantity(Long skuId, int quantity) {
        return this.getCartLines().stream()
                .filter(cartItem -> cartItem.getSku().getId().equals(skuId))
                .findFirst()
                .map(cartItem -> {
                    cartItem.updateQuantity(quantity);
                    return cartItem;
                })
                .orElseThrow(() -> new AppException(ErrorCode.CART__ITEM_NOT_FOUND));
    }

    /**
     * removeCartItems.
     */
    public List<CartLine> removeCartItems(List<Long> skuIds) {
        // NOTE: orphanRemoval
        // 1. filter CartItems (objects on memory) to remove
        var cartItemsToRemove = this.getCartLines().stream()
                .filter(cartItem -> skuIds.contains(cartItem.getSku().getId()))
                .toList();

        // 2. removeAll items => JPA note they are orphan => orphanRemoval auto delete
        this.getCartLines().removeAll(cartItemsToRemove);
        this.setTotal(this.getTotal() - cartItemsToRemove.size());

        return cartItemsToRemove;
    }

    public List<CartLine> removeCartItemsBySkuIds(List<Long> skuIds) {
        // NOTE: orphanRemoval
        // 1. filter CartItems (objects on memory) to remove
        var cartItemsToRemove = this.getCartLines().stream()
                .filter(cartItem -> skuIds.contains(cartItem.getSku().getId()))
                .toList();

        // 2. removeAll items => JPA note they are orphan => orphanRemoval auto delete
        this.getCartLines().removeAll(cartItemsToRemove);
        this.setTotal(this.getTotal() - cartItemsToRemove.size());

        return cartItemsToRemove;
    }
}
