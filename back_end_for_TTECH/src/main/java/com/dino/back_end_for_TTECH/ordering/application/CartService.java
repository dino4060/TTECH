package com.dino.back_end_for_TTECH.ordering.application;

import com.dino.back_end_for_TTECH.ordering.application.mapper.ICartMapper;
import com.dino.back_end_for_TTECH.ordering.application.model.CartLineBody;
import com.dino.back_end_for_TTECH.ordering.application.model.CartLineData;
import com.dino.back_end_for_TTECH.ordering.application.model.CartBody;
import com.dino.back_end_for_TTECH.ordering.domain.Cart;
import com.dino.back_end_for_TTECH.ordering.domain.CartLine;
import com.dino.back_end_for_TTECH.ordering.domain.repository.ICartRepository;
import com.dino.back_end_for_TTECH.product.application.service.ISkuService;
import com.dino.back_end_for_TTECH.profile.application.service.IUserService;
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
    ISkuService skuService;
    ICartRepository cartRepository;
    ICartMapper cartMapper;

    // HELPER //

    private Optional<Cart> findCartWithSku(CurrentUser currentUser) {
        return this.cartRepository.findWithSkuByBuyerId(currentUser.id());
    }

    private Cart getCartWithSku(CurrentUser currentUser) {
        return this.cartRepository.findWithSkuByBuyerId(currentUser.id())
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
        Cart cart = this.findCartWithSku(currentUser)
                .orElseGet(() -> this.createCart(currentUser));

        cart.getCartLines().sort(
                Comparator.comparing(CartLine::getId).reversed());

        return cart;
    }

    // COMMAND //

    @Transactional
    public CartLineData addCartItem(CartLineBody request, CurrentUser currentUser) {
        var cart = this.findCartWithSku(currentUser).orElseGet(() -> createCart(currentUser));
        var sku = this.skuService.getSku(request.skuId());

        // 1. addOrUpdateCartItem
        var upsertedCartItem = cart.addOrUpdateCartItem(sku, request.quantity());
        this.cartRepository.save(cart);

        return this.cartMapper.toCartLineData(upsertedCartItem);
    }

    @Transactional
    public CartLineData updateQuantity(CartLineBody request, CurrentUser currentUser) {
        var cart = this.getCartWithSku(currentUser);

        var updatedCartItem = cart.updateQuantity(request.skuId(), request.quantity());
        this.cartRepository.save(cart);

        return this.cartMapper.toCartLineData(updatedCartItem);
    }

    @Transactional
    public Deleted removeCartItems(CartBody request, CurrentUser currentUser) {
        var cart = this.getCartWithSku(currentUser);

        var removedCartItems = cart.removeCartItems(request.skuIds());
        this.cartRepository.save(cart);

        return Deleted.success(removedCartItems.size());
    }

    @Transactional
    public Deleted removeCartItems(List<Long> skuIds, CurrentUser currentUser) {
        var cart = this.getCartWithSku(currentUser);

        var removedCartItems = cart.removeCartItemsBySkuIds(skuIds);
        this.cartRepository.save(cart);

        return Deleted.success(removedCartItems.size());
    }
}