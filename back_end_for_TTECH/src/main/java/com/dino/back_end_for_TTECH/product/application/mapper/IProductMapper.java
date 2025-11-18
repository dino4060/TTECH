package com.dino.back_end_for_TTECH.product.application.mapper;

import com.dino.back_end_for_TTECH.pricing.application.model.PriceToWrite;
import com.dino.back_end_for_TTECH.product.application.model.ProductData;
import com.dino.back_end_for_TTECH.product.application.model.ProductToSell;
import com.dino.back_end_for_TTECH.product.application.model.ProductToWrite;
import com.dino.back_end_for_TTECH.product.domain.Category;
import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.Supplier;
import com.dino.back_end_for_TTECH.promotion.application.mapper.PageMapper;
import com.dino.back_end_for_TTECH.shared.application.utils.AppId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IProductMapper extends PageMapper {
    ProductData toProductData(Product product);

    ProductToSell toProductToSell(Product product);

    Product toProduct(ProductToWrite body);

    default void toProduct(ProductToWrite body, @MappingTarget Product product) {
        var category = toCategoryPartially(body.category());
        var supplier = toSupplierPartially(body.supplier());
        product.setCategory(category);
        product.setSupplier(supplier);

        this.toProductPartially(body, product);
    }

    // SIDE MAPPINGS //

    @Mapping(target = "category", ignore = true)
    @Mapping(target = "supplier", ignore = true)
    @Mapping(target = "price", ignore = true)
    void toProductPartially(ProductToWrite body, @MappingTarget Product product);

    Category toCategoryPartially(AppId categoryBody);

    Supplier toSupplierPartially(AppId supplierBody);

    PriceToWrite getPriceBody(ProductToWrite body);
}
