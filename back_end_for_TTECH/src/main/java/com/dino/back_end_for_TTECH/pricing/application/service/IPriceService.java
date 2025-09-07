package com.dino.back_end_for_TTECH.pricing.application.service;

import com.dino.back_end_for_TTECH.pricing.application.model.PriceToWrite;
import com.dino.back_end_for_TTECH.pricing.domain.Price;
import com.dino.back_end_for_TTECH.product.domain.Product;

public interface IPriceService {
    void create(Product product);

    void recalculate(Price price, PriceToWrite priceBody);
}
