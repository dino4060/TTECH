package com.dino.back_end_for_TTECH.infrastructure.event;

import com.dino.back_end_for_TTECH.ordering.application.event.IOrderEventPublisher;
import com.dino.back_end_for_TTECH.ordering.domain.event.PlacedOrderEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventPublisherImpl implements IOrderEventPublisher {

    private final KafkaTemplate<String, PlacedOrderEvent> kafkaPublisher;

    @Override
    public void send(PlacedOrderEvent event) {
        kafkaPublisher.send(EventTopic.ORDER_PLACED, event);
    }
}
