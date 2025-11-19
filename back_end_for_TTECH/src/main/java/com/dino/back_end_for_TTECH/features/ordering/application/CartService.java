package com.dino.back_end_for_TTECH.ordering.application;

import com.dino.back_end_for_TTECH.ordering.application.mapper.ICartMapper;
import com.dino.back_end_for_TTECH.ordering.application.model.CartLineBody;
import com.dino.back_end_for_TTECH.ordering.application.model.CartLineData;
import com.dino.back_end_for_TTECH.ordering.application.model.CartBody;
import com.dino.back_end_for_TTECH.ordering.domain.Cart;
import com.dino.back_end_for_TTECH.ordering.domain.CartLine;
import com.dino.back_end_for_TTECH.ordering.domain.repository.ICartRepository;
import com.dino.back_end_for_TTECH.features.product.domain.Product;
import com.dino.back_end_for_TTECH.features.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.utils.Deleted;
import com.dino.back_end_for_TTECH.shared.domain.exception.AppException;
import com.dino.back_end_for_TTECH.shared.domain.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartService {

    IUserService userService;
    ICartRepository cartRepository;
    ICartMapper cartMapper;

    // HELPER //

    private Optional<Cart> findCartWithProduct(CurrentUser currentUser) {
        return this.cartRepository.findWithProductByBuyerId(currentUser.id());
    }

    private Cart getCartWithProduct(CurrentUser currentUser) {
        return this.cartRepository.findWithProductByBuyerId(currentUser.id())
                .orElseThrow(() -> new AppException(ErrorCode.CART__NOT_FOUND));
    }

    private Cart createCart(CurrentUser currentUser) {
        // exclude deleted carts
        this.cartRepository.findIsDeletedByBuyerId(currentUser.id())
                .ifPresent(ignore -> {
                    throw new AppException(ErrorCode.CART__IS_DELETED);
                });
        // create
        var buyer = this.userService.getUser(currentUser);
        var newCart = Cart.createCart(buyer);
        return this.cartRepository.save(newCart);
    }

    // QUERY //

    public Cart get(CurrentUser currentUser) {
        Cart cart = this.findCartWithProduct(currentUser)
                .orElseGet(() -> this.createCart(currentUser));

        cart.getLines().sort(
                Comparator.comparing(CartLine::getId).reversed());

        return cart;
    }

    // COMMAND //

    @Transactional
    public CartLineData addCartItem(CartLineBody request, CurrentUser currentUser) {
        var cart = this.findCartWithProduct(currentUser).orElseGet(() -> createCart(currentUser));
        var product = new Product(); // todo1: this.productService.getProduct(request.productId());

        // 1. addOrUpdateCartItem
        var newProduct = cart.addOrUpdateLine(product, request.quantity());
        this.cartRepository.save(cart);

        return this.cartMapper.toLineData(newProduct);
    }

    @Transactional
    public CartLineData updateQuantity(CartLineBody request, CurrentUser currentUser) {
        var cart = this.getCartWithProduct(currentUser);

        var updatedCartItem = cart.updateQuantity(request.productId(), request.quantity());
        this.cartRepository.save(cart);

        return this.cartMapper.toLineData(updatedCartItem);
    }

    @Transactional
    public Deleted removeCartItems(CartBody request, CurrentUser currentUser) {
        var cart = this.getCartWithProduct(currentUser);

        var removedCartItems = cart.removeLines(request.productIds());
        this.cartRepository.save(cart);

        return Deleted.success(removedCartItems.size());
    }

    @Transactional
    public Deleted removeCartItems(List<Long> productIds, CurrentUser currentUser) {
        var cart = this.getCartWithProduct(currentUser);

        var removedCartItems = cart.removeLinesByProductIds(productIds);
        this.cartRepository.save(cart);

        return Deleted.success(removedCartItems.size());
    }
}