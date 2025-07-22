package com.dino.back_end_for_TTECH.ordering.domain.model;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderTimeline {
    Instant orderDate;
    Instant paymentDate;
    Instant shipmentDate;
    Instant deliveryDate;

    // FACTORY //

    public static OrderTimeline beginRecording() {
        return new OrderTimeline();
    }

    // INSTANCE METHOD //

    public void recordOrdering() {
        this.setOrderDate(Instant.now());
    }

    public void recordShipment() {
        this.setShipmentDate(Instant.now());
    }

    public void recordDelivery() {
        this.setDeliveryDate(Instant.now());
    }
}
