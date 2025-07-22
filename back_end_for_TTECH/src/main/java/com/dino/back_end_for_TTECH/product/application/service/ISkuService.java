package com.dino.back_end_for_TTECH.product.application.service;

import java.util.Optional;

import com.dino.back_end_for_TTECH.product.domain.Sku;

public interface ISkuService {
    // DOMAIN //

    Sku getSku(Long skuId);

    Optional<Sku> findSku(Long skuId);

    String getPhoto(Sku sku);
}
