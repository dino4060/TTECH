package com.dino.back_end_for_TTECH.infrastructure.realtime;

import com.dino.back_end_for_TTECH.pricing.application.provider.IRealtimePriceProvider;
import com.dino.back_end_for_TTECH.pricing.domain.Price;
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
public class RealtimeProviderImpl implements IRealtimePriceProvider {

    SimpMessagingTemplate messagingTemplate;

    @Override
    public void publishPriceUpdate(Long productId, Price updatedPrice) {
        // Publish to queue at topic /topic/price/{productId}
        messagingTemplate.convertAndSend("/topic/price/" + productId, updatedPrice);
    }
}

