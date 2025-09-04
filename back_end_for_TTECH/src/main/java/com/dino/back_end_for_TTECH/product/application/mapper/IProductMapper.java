package com.dino.back_end_for_TTECH.product.application.mapper;

import com.dino.back_end_for_TTECH.product.application.model.ProductInList;
import com.dino.back_end_for_TTECH.product.application.model.ProductToWrite;
import com.dino.back_end_for_TTECH.product.domain.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IProductMapper {
    ProductInList toProductInList(Product product);

    Product toProduct(ProductToWrite dto);

    @Mapping(target = "skus.inventory.stocks", ignore = true)
    void toProduct(ProductToWrite dto, @MappingTarget Product entity);
}
