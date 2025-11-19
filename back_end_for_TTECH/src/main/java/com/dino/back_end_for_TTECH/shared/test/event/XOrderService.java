package com.dino.back_end_for_TTECH.shared.test.event;

import com.dino.back_end_for_TTECH.features.ordering.application.event.IOrderEventPublisher;
import com.dino.back_end_for_TTECH.features.ordering.domain.event.PlacedOrderEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class XOrderService {

    private final IOrderEventPublisher orderEventPublisher;

    public String place() {
        var event = new PlacedOrderEvent(1L, 2L, 12.2004);

//        this.orderEventPublisher.send(event);

        return "📤 Place order successfully";
    }
}
