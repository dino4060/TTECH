package com.dino.back_end_for_TTECH.infrastructure.schedule;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CheckoutScheduler {

    // ICheckoutService checkoutService;

    @SuppressWarnings("unused")
    final Duration DRAFT_ORDER_TTL = Duration.ofMinutes(10);

    @Scheduled(fixedRate = 10 * 1000 * 60)
    public void cancelCheckout() {
        log.info(">>> Start the cancelCheckout task.");

        // this.checkoutService.cancelCheckout(DRAFT_ORDER_TTL);

        log.info(">>> End the cancelCheckout task.");
    }
}
