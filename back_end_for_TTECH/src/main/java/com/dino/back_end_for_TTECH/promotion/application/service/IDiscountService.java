package com.dino.back_end_for_TTECH.promotion.application.service;

import com.dino.back_end_for_TTECH.promotion.domain.ProductDiscount;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.Sku;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;

import java.util.Optional;

public interface IDiscountService {
    // QUERY //

    Optional<ProductDiscount> canDiscount(Product product, CurrentUser currentUser);

    Optional<ProductDiscount> canDiscount(Sku sku, CurrentUser currentUser);
}
