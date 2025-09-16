package com.dino.back_end_for_TTECH.infrastructure.event;

import com.dino.back_end_for_TTECH.ordering.domain.event.PlacedOrderEvent;
import com.dino.back_end_for_TTECH.shared.test.event.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventListener {

    private final EmailService emailService;

    @KafkaListener(topics = EventTopic.ORDER_PLACED)
    public void onPlacedOrder(PlacedOrderEvent event) {
        this.emailService.notifyPlacedOrder(event);
    }
}
