package com.dino.back_end_for_TTECH.product.application.service;

import com.dino.back_end_for_TTECH.product.application.model.SkuToWrite;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.Sku;

import java.util.List;
import java.util.Optional;

public interface ISkuService {
    // DOMAIN //

    Sku getSku(Long skuId);

    Optional<Sku> findSku(Long skuId);

    String getPhoto(Sku sku);

    void createList(Product product);

    void updateList(List<Sku> skus, List<SkuToWrite> bodies);
}
