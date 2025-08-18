package com.dino.back_end_for_TTECH.pricing.application.provider;

import com.dino.back_end_for_TTECH.pricing.domain.Price;

public interface IRealtimePriceProvider {

    void publishPriceUpdate(Long productId, Price productPrice);
}
