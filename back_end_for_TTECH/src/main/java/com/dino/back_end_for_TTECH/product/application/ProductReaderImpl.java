package com.dino.back_end_for_TTECH.product.application;

import com.dino.back_end_for_TTECH.product.application.mapper.IProductMapper;
import com.dino.back_end_for_TTECH.product.application.model.ProductWithPriceRes;
import com.dino.back_end_for_TTECH.product.application.model.ProductSearchParams;
import com.dino.back_end_for_TTECH.product.application.reader.IProductReader;
import com.dino.back_end_for_TTECH.product.application.service.IProductService;
import com.dino.back_end_for_TTECH.product.domain.query.IProductQuery;
import com.dino.back_end_for_TTECH.shared.application.utils.AppUtils;
import com.dino.back_end_for_TTECH.shared.application.utils.PageRes;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductReaderImpl implements IProductReader {

    IProductService productService;
    IProductQuery productQuery;
    IProductMapper productMapper;

    @Override
    public List<ProductWithPriceRes> searchProducts(ProductSearchParams searchParams) {
        if (AppUtils.isBlank(searchParams.keyword()))
            return this.productService.listProducts(AppUtils.defaultPageable()).getItems();

        var products = this.productQuery.searchByMultiParams(
                searchParams.keyword(), searchParams.categories(), searchParams.priceRange());

        return products.stream()
                .map(p -> this.productMapper.toProductItemRes(p))
                .toList();
    }

    @Override
    public PageRes<ProductWithPriceRes> searchProducts(ProductSearchParams searchParams, Pageable pageable) {
        var pageDomain = this.productQuery.searchByMultiParams(
                searchParams.keyword(), searchParams.categories(), searchParams.priceRange(), pageable);

        var productList = pageDomain.getContent().stream()
                .map(p -> this.productMapper.toProductItemRes(p))
                .toList();

        return PageRes.from(pageDomain, productList);
    }
}
