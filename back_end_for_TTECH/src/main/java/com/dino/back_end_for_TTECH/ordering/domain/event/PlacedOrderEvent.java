package com.dino.back_end_for_TTECH.ordering.domain.event;

public record PlacedOrderEvent(
        Long orderId,
        Long userId,
        Double total
) {
}
