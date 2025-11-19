package com.dino.back_end_for_TTECH.features.product.application.mapper;

import com.dino.back_end_for_TTECH.features.product.application.model.ProductBody;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductData;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductFull;
import com.dino.back_end_for_TTECH.features.product.application.model.ProductQuery;
import com.dino.back_end_for_TTECH.features.product.domain.Product;
import com.dino.back_end_for_TTECH.features.product.domain.specification.ProductSpecification;
import com.dino.back_end_for_TTECH.shared.application.mapper.PageMapper;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.jpa.domain.Specification;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper extends PageMapper {

    default Specification<Product> toQueryable(ProductQuery query) {
        return ProductSpecification.build(query);
    }

    ProductData toProductData(Product product);

    ProductFull toProductFull(Product product);

    Product toProduct(ProductBody body);

    void toProduct(ProductBody body, @MappingTarget Product product);
}
