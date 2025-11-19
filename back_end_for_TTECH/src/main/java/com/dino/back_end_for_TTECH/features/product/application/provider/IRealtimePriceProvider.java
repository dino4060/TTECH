package com.dino.back_end_for_TTECH.features.product.application.provider;

import com.dino.back_end_for_TTECH.features.product.domain.Price;

public interface IRealtimePriceProvider {

    void publishPriceUpdate(Long productId, Price productPrice);
}
