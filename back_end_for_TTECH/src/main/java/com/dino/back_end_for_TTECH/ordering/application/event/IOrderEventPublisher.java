package com.dino.back_end_for_TTECH.ordering.application.event;

import com.dino.back_end_for_TTECH.ordering.domain.event.PlacedOrderEvent;

public interface IOrderEventPublisher {
    void send(PlacedOrderEvent event);
}
