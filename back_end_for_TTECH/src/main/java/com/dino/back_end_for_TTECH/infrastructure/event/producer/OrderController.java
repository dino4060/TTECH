package com.dino.back_end_for_TTECH.infrastructure.event.producer;

import com.dino.back_end_for_TTECH.infrastructure.event.config.OrderPlacedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderController {

    //private final OrderRepository orderRepository;
    private final KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;

    @GetMapping("/api/public/kafka")
    public String createOrder() {
        // Gửi event Kafka
        OrderPlacedEvent event = OrderPlacedEvent.builder()
                .orderId(61L)
                .userId(11L)
                .total(161000.0)
                .build();

        kafkaTemplate.send("order-topic", event);
        return "📤 Đã gửi Kafka event: " + event;
    }
}