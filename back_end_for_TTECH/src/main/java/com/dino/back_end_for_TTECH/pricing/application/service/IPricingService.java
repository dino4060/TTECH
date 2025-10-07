package com.dino.back_end_for_TTECH.pricing.application.service;

import com.dino.back_end_for_TTECH.ordering.domain.CartLine;
import com.dino.back_end_for_TTECH.ordering.domain.OrderLine;
import com.dino.back_end_for_TTECH.ordering.domain.model.CheckoutSnapshot;

import java.util.List;

public interface IPricingService {

    CheckoutSnapshot checkoutOrder(List<OrderLine> orderItems);

    CheckoutSnapshot checkoutCartGroup(List<CartLine> cartItems);
}
