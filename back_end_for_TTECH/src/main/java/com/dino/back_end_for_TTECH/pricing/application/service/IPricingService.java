package com.dino.back_end_for_TTECH.pricing.application.service;

import com.dino.back_end_for_TTECH.ordering.domain.CartItem;
import com.dino.back_end_for_TTECH.ordering.domain.OrderItem;
import com.dino.back_end_for_TTECH.ordering.domain.model.CheckoutSnapshot;

import java.util.List;

public interface IPricingService {

    CheckoutSnapshot checkoutOrder(List<OrderItem> orderItems);

    CheckoutSnapshot checkoutCartGroup(List<CartItem> cartItems);
}
