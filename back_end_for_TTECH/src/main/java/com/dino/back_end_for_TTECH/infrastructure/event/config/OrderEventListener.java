package com.dino.back_end_for_TTECH.infrastructure.event.config;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class OrderEventListener {

    @KafkaListener(topics = "order-topic")
    public void handleOrderEvent(OrderPlacedEvent event) {
        System.out.println("📨 Nhận được event từ Kafka: " + event);
        // Thực hiện gửi email ở đây

    }
}
