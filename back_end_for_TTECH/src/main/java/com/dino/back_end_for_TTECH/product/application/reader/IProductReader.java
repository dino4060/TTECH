package com.dino.back_end_for_TTECH.product.application.reader;

import com.dino.back_end_for_TTECH.product.application.model.ProductWithPriceRes;
import com.dino.back_end_for_TTECH.product.application.model.ProductSearchParams;
import com.dino.back_end_for_TTECH.shared.application.utils.PageRes;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductReader {

    List<ProductWithPriceRes> searchProducts(ProductSearchParams searchParams);

    PageRes<ProductWithPriceRes> searchProducts(ProductSearchParams searchParams, Pageable pageable);
}
