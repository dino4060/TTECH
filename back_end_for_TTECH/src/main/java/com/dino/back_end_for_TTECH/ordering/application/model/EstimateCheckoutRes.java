package com.dino.back_end_for_TTECH.ordering.application.model;

import com.dino.back_end_for_TTECH.ordering.domain.model.CheckoutSnapshot;

public record EstimateCheckoutRes(Long cartId, CheckoutSnapshot checkoutSnapshot) {
}
