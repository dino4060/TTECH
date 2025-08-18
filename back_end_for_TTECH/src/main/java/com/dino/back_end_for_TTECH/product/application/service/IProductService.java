package com.dino.back_end_for_TTECH.product.application.service;

import com.dino.back_end_for_TTECH.product.application.model.ProductInList;
import com.dino.back_end_for_TTECH.product.application.model.ProductToWrite;
import com.dino.back_end_for_TTECH.shared.application.utils.AppPage;
import org.springframework.data.domain.Pageable;

public interface IProductService {
    AppPage<ProductInList> listProducts(Pageable pageable);

    ProductInList createProduct(ProductToWrite body);

    ProductInList updateProduct(long id, ProductToWrite body);

    void deleteProduct(long id);
}
