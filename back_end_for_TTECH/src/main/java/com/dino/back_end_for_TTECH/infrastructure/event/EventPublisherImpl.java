package com.dino.back_end_for_TTECH.infrastructure.event;

import com.dino.back_end_for_TTECH.ordering.application.event.IOrderEventPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventPublisherImpl implements IOrderEventPublisher {

    // private final KafkaTemplate<String, PlacedOrderEvent> kafkaPublisher;

//    @Override
//    public void send(PlacedOrderEvent event) {
//        kafkaPublisher.send(EventTopic.ORDER_PLACED, event);
//    }
}
