package com.dino.back_end_for_TTECH.ordering.application.service;

import com.dino.back_end_for_TTECH.ordering.application.model.*;
import com.dino.back_end_for_TTECH.ordering.domain.Cart;
import com.dino.back_end_for_TTECH.ordering.domain.CartItem;
import com.dino.back_end_for_TTECH.profile.domain.Shop;
import com.dino.back_end_for_TTECH.profile.domain.User;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.utils.Deleted;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

public interface ICartService {
    // HELPER //

    Optional<Cart> findCartWithShop(CurrentUser currentUser);

    Cart getCartWithShop(CurrentUser currentUser);

    Optional<Map<Shop, List<CartItem>>> groupCartItemByShop(Cart cart, Set<Long> cartItemIdsToFilter);

    // QUERY //

    CartRes get(CurrentUser currentUser);

    // COMMAND //

    void createCart(User seller);

    CartItemRes addCartItem(AddCartItemReq request, CurrentUser currentUser);

    CartItemRes updateQuantity(UpdateQuantityReq request, CurrentUser currentUser);

    Deleted removeCartItems(RemoveCartItemReq request, CurrentUser currentUser);

    Deleted removeCartItems(List<Long> skuIds, CurrentUser currentUser);
}