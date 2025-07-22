package com.dino.back_end_for_TTECH.pricing.application;

import com.dino.back_end_for_TTECH.ordering.domain.CartItem;
import com.dino.back_end_for_TTECH.ordering.domain.OrderItem;
import com.dino.back_end_for_TTECH.ordering.domain.model.CheckoutSnapshot;
import com.dino.back_end_for_TTECH.pricing.application.service.IPricingService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PricingServiceImpl implements IPricingService {

    // CHECKOUT //

    @Override
    public CheckoutSnapshot checkoutOrder(List<OrderItem> orderItems) {
        int totalMainPrice = orderItems.stream()
                .mapToInt(item -> item.getMainPrice() * item.getQuantity())
                .sum();

        return CheckoutSnapshot.createSnapshot(totalMainPrice);
    }

    @Override
    public CheckoutSnapshot checkoutCartGroup(List<CartItem> cartItems) {
        int totalMainPrice = cartItems.stream()
                .mapToInt(item -> item.getSku().getPrice().getMainPrice() * item.getQuantity())
                .sum();

        return CheckoutSnapshot.createSnapshot(totalMainPrice);
    }
}
