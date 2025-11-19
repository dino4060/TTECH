package com.dino.back_end_for_TTECH.product.application.provider;

import com.dino.back_end_for_TTECH.product.domain.Price;

public interface IRealtimePriceProvider {

    void publishPriceUpdate(Long productId, Price productPrice);
}
