package com.dino.back_end_for_TTECH.product.application.service;

import com.dino.back_end_for_TTECH.product.application.model.ProductOfShopRes;
import com.dino.back_end_for_TTECH.shared.api.model.CurrentUser;
import com.dino.back_end_for_TTECH.shared.application.utils.Id;
import lombok.NonNull;
import org.springframework.data.domain.Pageable;

import com.dino.back_end_for_TTECH.product.application.model.ProductWithPriceRes;
import com.dino.back_end_for_TTECH.product.application.model.ProductRes;
import com.dino.back_end_for_TTECH.shared.application.utils.PageRes;

public interface IProductService {
    // QUERY //

    PageRes<ProductWithPriceRes> listProducts(Pageable pageable);

    PageRes<ProductOfShopRes> listProductsOfShop(Pageable pageable, CurrentUser currentUser);

    ProductRes getProduct(Id productId);

    ProductOfShopRes getProductOfShop(@NonNull Long productId, @NonNull CurrentUser currentUser);
}
