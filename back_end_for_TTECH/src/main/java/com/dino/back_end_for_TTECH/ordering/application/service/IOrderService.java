package com.dino.back_end_for_TTECH.ordering.application.service;

import com.dino.back_end_for_TTECH.ordering.domain.CartItem;
import com.dino.back_end_for_TTECH.ordering.domain.Order;
import com.dino.back_end_for_TTECH.profile.domain.Shop;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.utils.Deleted;

import java.time.Duration;
import java.util.List;

public interface IOrderService {
    // QUERY //

    List<Order> getOrdersByIds(List<Long> orderIds, CurrentUser currentUser);

    // COMMAND //

    Order createDraftOrder(List<CartItem> cartItems, Shop shop, CurrentUser currentUser);

    Order markAsPending(Order order);

    Deleted cleanupDraftOrders(Duration orderTtl);
}