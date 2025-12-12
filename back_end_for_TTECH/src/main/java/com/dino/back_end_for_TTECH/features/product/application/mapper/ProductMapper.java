package com.dino.back_end_for_TTECH.features.product.application.mapper;

import com.dino.back_end_for_TTECH.features.product.application.model.*;
import com.dino.back_end_for_TTECH.features.product.domain.Product;
import com.dino.back_end_for_TTECH.features.product.domain.specification.ProductSpec;
import com.dino.back_end_for_TTECH.shared.application.mapper.PageMapper;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.Map;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper extends PageMapper {

    Map<String, Sort.Order> sortMap = Map.of(
            "trendy", new Sort.Order(Sort.Direction.DESC, "stock.views"),
            "favorite", new Sort.Order(Sort.Direction.DESC, "stock.carts"),
            "bestseller", new Sort.Order(Sort.Direction.DESC, "stock.sold"),
            "flop", new Sort.Order(Sort.Direction.ASC, "stock.sold"),
            "discount", new Sort.Order(Sort.Direction.DESC, "price.dealPercent"),
            "new", new Sort.Order(Sort.Direction.DESC, "createdAt")
    );

    default Pageable toPageable(ProductHomeQuery query) {
        var pageNumber = query.getPage() - 1;
        var sizeNumber = query.getSize();
        var sort = Sort.by(sortMap.get(query.getStatistics()));
        return PageRequest.of(pageNumber, sizeNumber, sort);
    }

    default Specification<Product> toQueryable(ProductHomeQuery query) {
        return ProductSpec.fromQuery(query);
    }

    default Specification<Product> toQueryable(ProductQuery query) {
        return ProductSpec.fromQuery(query);
    }

    ProductData toProductData(Product product);

    ProductFullData toProductFullData(Product product);

    Product toProduct(ProductBody body);

    void toProduct(ProductBody body, @MappingTarget Product product);
}
