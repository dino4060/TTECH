package com.dino.back_end_for_TTECH.product.application.mapper;

import com.dino.back_end_for_TTECH.product.application.model.ProductInList;
import com.dino.back_end_for_TTECH.product.application.model.ProductToWrite;
import com.dino.back_end_for_TTECH.product.application.model.SkuToWrite;
import com.dino.back_end_for_TTECH.product.domain.Category;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.Sku;
import com.dino.back_end_for_TTECH.product.domain.Supplier;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IProductMapper {
    ProductInList toProductInList(Product product);

    Product toProduct(ProductToWrite dto);

    @Mapping(target = "category", ignore = true)
    @Mapping(target = "supplier", ignore = true)
    @Mapping(target = "skus", ignore = true)
    void toProduct(ProductToWrite dto, @MappingTarget Product entity);

    @Mapping(target = "inventory", ignore = true)
    void toSku(SkuToWrite dto, @MappingTarget Sku entity);

    default void toProduct2(ProductToWrite body, @MappingTarget Product product) {
        var sku = product.getSkus().getFirst();
        var skuBody = body.skus().getFirst();
        var category = new Category(body.category().id());
        var supplier = new Supplier(body.supplier().id());

        this.toProduct(body, product);
        this.toSku(skuBody, sku);

        product.setCategory(category);
        product.setSupplier(supplier);
    }
}
