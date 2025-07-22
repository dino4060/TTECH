package com.dino.back_end_for_TTECH.ordering.application.model;

import com.dino.back_end_for_TTECH.ordering.domain.model.*;
import com.dino.back_end_for_TTECH.profile.application.model.ShopLeanRes;

import java.util.List;

public record OrderRes(
        Long id,
        OrderStatus status,
        OrderTimeline timeline,
        CheckoutSnapshot checkoutSnapshot,
        PaymentMethod paymentMethod,
        ShopLeanRes shop,
        String note,
        List<OrderItemRes> orderItems,
        ShippingDetail shippingDetail,
        OrderAddress pickupAddress,
        OrderAddress deliveryAddress) {
}
