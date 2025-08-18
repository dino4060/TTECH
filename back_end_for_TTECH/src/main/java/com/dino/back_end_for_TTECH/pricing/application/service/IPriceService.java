package com.dino.back_end_for_TTECH.pricing.application.service;

import com.dino.back_end_for_TTECH.product.domain.Product;

public interface IPriceService {
    void createPriceForProduct(Product product);
}
