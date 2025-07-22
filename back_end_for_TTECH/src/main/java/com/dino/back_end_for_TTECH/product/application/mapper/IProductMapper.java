package com.dino.back_end_for_TTECH.product.application.mapper;

import com.dino.back_end_for_TTECH.product.application.model.ProductOfShopRes;
import com.dino.back_end_for_TTECH.product.domain.model.ProductItemView;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.dino.back_end_for_TTECH.product.application.model.ProductWithPriceRes;
import com.dino.back_end_for_TTECH.product.application.model.ProductRes;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.model.ProductProjection;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IProductMapper {
    ProductRes toProductRes(Product product);

    ProductWithPriceRes toProductItemRes(ProductProjection product);

    ProductWithPriceRes toProductItemRes(ProductItemView product);

    ProductOfShopRes toProductOfShopRes(Product product);
}
