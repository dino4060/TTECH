package com.dino.back_end_for_TTECH.ordering.application.model;

import com.dino.back_end_for_TTECH.ordering.domain.model.CheckoutSnapshot;

import java.util.List;

public record StartCheckoutRes(
        Long checkoutId, // first order id
        CheckoutSnapshot totalCheckoutSnapshot,
        List<DraftOrderRes> orders) {
}
