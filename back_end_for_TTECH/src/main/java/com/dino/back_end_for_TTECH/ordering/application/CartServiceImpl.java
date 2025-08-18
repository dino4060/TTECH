package com.dino.back_end_for_TTECH.ordering.application;

import com.dino.back_end_for_TTECH.ordering.application.mapper.ICartMapper;
import com.dino.back_end_for_TTECH.ordering.application.model.*;
import com.dino.back_end_for_TTECH.ordering.application.service.ICartService;
import com.dino.back_end_for_TTECH.ordering.domain.Cart;
import com.dino.back_end_for_TTECH.ordering.domain.CartItem;
import com.dino.back_end_for_TTECH.ordering.domain.repository.ICartRepository;
import com.dino.back_end_for_TTECH.product.application.service.ISkuService;
import com.dino.back_end_for_TTECH.profile.application.service.IUserService;
import com.dino.back_end_for_TTECH.profile.domain.Shop;
import com.dino.back_end_for_TTECH.profile.domain.User;
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

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CartServiceImpl implements ICartService {

    IUserService userService;
    ISkuService skuService;
    ICartRepository cartRepository;
    ICartMapper cartMapper;

    // HELPER //

    /**
     * findCartWithSku.
     */
    private Optional<Cart> findCartWithSku(CurrentUser currentUser) {
        return this.cartRepository.findWithSkuByBuyerId(currentUser.id());
    }

    /**
     * getCartWithSku.
     */
    private Cart getCartWithSku(CurrentUser currentUser) {
        return this.cartRepository.findWithSkuByBuyerId(currentUser.id())
                .orElseThrow(() -> new AppException(ErrorCode.CART__NOT_FOUND));
    }

    /**
     * findCartWithShop.
     */
    @Override
    public Optional<Cart> findCartWithShop(CurrentUser currentUser) {
        return cartRepository.findWithShopByBuyerId(currentUser.id());
    }

    /**
     * getCartWithShop.
     */
    @Override
    public Cart getCartWithShop(CurrentUser currentUser) {
        return this.cartRepository.findWithShopByBuyerId(currentUser.id())
                .orElseThrow(() -> new AppException(ErrorCode.CART__NOT_FOUND));
    }

    /**
     * groupCartItemByShop.
     */
    @Override
    public Optional<Map<Shop, List<CartItem>>> groupCartItemByShop(Cart cart, Set<Long> cartItemIdsToFilter) {
//        Map<Shop, List<CartItem>> itemsGroupedByShop = cart.getCartItems().stream()
//                .filter(item -> cartItemIdsToFilter.contains(item.getId()))
//                .collect(Collectors.groupingBy(item -> item.getSku().getProduct().getShop()));
//
//        return itemsGroupedByShop.isEmpty() ? Optional.empty() : Optional.of(itemsGroupedByShop);
        return Optional.empty();
    }

    private Optional<Map<Shop, List<CartItem>>> groupCartItemByShop(Cart cart) {
//        Map<Shop, List<CartItem>> itemsGroupedByShop = cart.getCartItems().stream()
//                .collect(Collectors.groupingBy(item -> item.getSku().getProduct().getShop()));
//
//        return itemsGroupedByShop.isEmpty() ? Optional.empty() : Optional.of(itemsGroupedByShop);
        return Optional.empty();
    }

    /**
     * buildCartGroup.
     */
    private Optional<CartGroupRes> buildCartGroupRes(Map.Entry<Shop, List<CartItem>> entry) {
        Shop shop = entry.getKey();
        List<CartItem> cartItems = entry.getValue();

        List<CartItemRes> cartItemsRes = cartItems.stream()
                .map(item -> {
                    var photo = skuService.getPhoto(item.getSku());
                    return cartMapper.toCartItemRes(item, photo);
                })
                .sorted(Comparator.comparing(CartItemRes::id).reversed())
                .toList();

        return cartItemsRes.isEmpty()
                ? Optional.empty()
                : Optional.of(cartMapper.toCartGroupRes(cartItemsRes.getFirst().id(), shop, cartItemsRes));
    }

    /**
     * createCart.
     */
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

    /**
     * get. (get or create cart, map to response dto)
     */
    @Override
    public CartRes get(CurrentUser currentUser) {
        Cart cart = this.findCartWithShop(currentUser)
                .orElseGet(() -> this.createCart(currentUser));

        // 1. group CartItems by Shop
        Map<Shop, List<CartItem>> itemsGroupedByShop = this.groupCartItemByShop(cart)
                .orElse(Collections.emptyMap());

        // 2. build and sort CartGroups
        List<CartGroupRes> cartGroups = itemsGroupedByShop.entrySet().stream()
                .map(entry -> this.buildCartGroupRes(entry).orElse(null))
                .filter(Objects::nonNull)
                .sorted(Comparator.comparing(CartGroupRes::id).reversed())
                .toList();

        return this.cartMapper.toCartRes(cart, cartGroups);
    }
    // COMMAND //

    /**
     * createCart
     */
    @Override
    public void createCart(User buyer) {
        var cart = Cart.createCart(buyer);
        this.cartRepository.save(cart);
    }


    /**
     * addCartItem
     */
    @Override
    @Transactional
    public CartItemRes addCartItem(AddCartItemReq request, CurrentUser currentUser) {
        var cart = this.findCartWithSku(currentUser).orElseGet(() -> createCart(currentUser));
        var sku = this.skuService.getSku(request.skuId());

        // 1. addOrUpdateCartItem
        var upsertedCartItem = cart.addOrUpdateCartItem(sku, request.quantity());
        this.cartRepository.save(cart);

        return this.cartMapper.toCartItemRes(upsertedCartItem);
    }

    /**
     * updateQuantity
     */
    @Override
    public CartItemRes updateQuantity(UpdateQuantityReq request, CurrentUser currentUser) {
        var cart = this.getCartWithSku(currentUser);

        // 1. updateQuantity
        var updatedCartItem = cart.updateQuantity(request.cartItemId(), request.quantity());
        this.cartRepository.save(cart);

        return this.cartMapper.toCartItemRes(updatedCartItem);
    }

    /**
     * removeCartItems
     */
    @Override
    public Deleted removeCartItems(RemoveCartItemReq request, CurrentUser currentUser) {
        var cart = this.getCartWithSku(currentUser);

        var removedCartItems = cart.removeCartItems(request.cartItemIds());
        this.cartRepository.save(cart);

        return Deleted.success(removedCartItems.size());
    }

    @Override
    public Deleted removeCartItems(List<Long> skuIds, CurrentUser currentUser) {
        var cart = this.getCartWithSku(currentUser);

        var removedCartItems = cart.removeCartItemsBySkuIds(skuIds);
        this.cartRepository.save(cart);

        return Deleted.success(removedCartItems.size());
    }
}