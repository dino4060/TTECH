package com.dino.back_end_for_TTECH.shared.test.event;

import com.dino.back_end_for_TTECH.features.ordering.domain.event.PlacedOrderEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {


    public void notifyPlacedOrder(PlacedOrderEvent event) {
        System.out.println("📨 Send an email: The successful placed order: " + event);
    }
}
