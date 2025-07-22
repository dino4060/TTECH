package com.dino.back_end_for_TTECH.ordering.application.model;

import com.dino.back_end_for_TTECH.features.ordering.domain.model.*;
import com.dino.back_end_for_TTECH.ordering.domain.model.CheckoutSnapshot;
import com.dino.back_end_for_TTECH.ordering.domain.model.OrderStatus;
import com.dino.back_end_for_TTECH.ordering.domain.model.ShippingDetail;
import com.dino.back_end_for_TTECH.profile.application.model.ShopLeanRes;

import java.util.List;

public record DraftOrderRes(
        Long id,
        OrderStatus status,
        ShopLeanRes shop,
        String note,
        CheckoutSnapshot checkoutSnapshot,
        ShippingDetail shippingDetail,
        List<OrderItemRes> orderItems) {
}
