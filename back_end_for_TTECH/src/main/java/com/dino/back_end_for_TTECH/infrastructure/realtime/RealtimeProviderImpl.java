package com.dino.back_end_for_TTECH.infrastructure.realtime;

import com.dino.back_end_for_TTECH.features.product.application.provider.PriceRealtimeProvider;
import com.dino.back_end_for_TTECH.features.product.domain.Price;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RealtimeProviderImpl implements PriceRealtimeProvider {

    SimpMessagingTemplate messagingTemplate;

    @Override
    public void publishPriceUpdate(Long productId, Price updatedPrice) {
        // Publish to queue at topic /topic/allPrice/{productId}
        messagingTemplate.convertAndSend("/topic/allPrice/" + productId, updatedPrice);
    }
}

