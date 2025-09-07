package com.dino.back_end_for_TTECH.product.application.mapper;

import com.dino.back_end_for_TTECH.pricing.application.model.PriceToWrite;
import com.dino.back_end_for_TTECH.pricing.domain.Price;
import com.dino.back_end_for_TTECH.pricing.domain.SkuPrice;
import com.dino.back_end_for_TTECH.product.application.model.ProductInList;
import com.dino.back_end_for_TTECH.product.application.model.ProductToWrite;
import com.dino.back_end_for_TTECH.product.application.model.SkuToWrite;
import com.dino.back_end_for_TTECH.product.domain.Category;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.Sku;
import com.dino.back_end_for_TTECH.product.domain.Supplier;
import com.dino.back_end_for_TTECH.shared.application.utils.AppId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IProductMapper {
    ProductInList toProductInList(Product product);

    Product toProduct(ProductToWrite body);

    default void toProduct(ProductToWrite body, @MappingTarget Product product) {
        var category = toCategoryPartially(body.category());
        var supplier = toSupplierPartially(body.supplier());
        product.setCategory(category);
        product.setSupplier(supplier);

        var sku = product.getSkus().getFirst();
        var skuBody = body.skus().getFirst();
        this.toProductPartially(body, product);
        this.toSkuPartially(skuBody, sku);
    }

    // SIDE MAPPINGS //

    @Mapping(target = "category", ignore = true)
    @Mapping(target = "supplier", ignore = true)
    @Mapping(target = "skus", ignore = true)
    @Mapping(target = "price", ignore = true)
    void toProductPartially(ProductToWrite body, @MappingTarget Product product);

    Category toCategoryPartially(AppId categoryBody);

    Supplier toSupplierPartially(AppId supplierBody);

    @Mapping(target = "inventory", ignore = true)
    void toSkuPartially(SkuToWrite body, @MappingTarget Sku sku);

    @Mapping(source = "skus", target = "skuPrices")
    PriceToWrite getPriceBody(ProductToWrite body);
}
