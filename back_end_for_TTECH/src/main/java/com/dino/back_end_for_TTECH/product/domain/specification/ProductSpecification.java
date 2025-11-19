package com.dino.back_end_for_TTECH.product.domain.specification;

import com.dino.back_end_for_TTECH.product.application.model.ProductQuery;
import com.dino.back_end_for_TTECH.product.domain.Product;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class ProductSpecification {

    public static Specification<Product> likeFullText(String text) {
        return (root, query, builder) -> {
            if (text == null || text.trim().isEmpty()) return null;
            String pattern = "%" + text.toLowerCase() + "%";

            return builder.or(
                    builder.like(builder.lower(root.get("name")), pattern),
                    builder.like(builder.lower(root.get("description")), pattern)
            );
        };
    }

    public static Specification<Product> hasSupplierId(Long supplierId) {
        return (root, query, builder) -> {
            if (supplierId == null) return null;
            return builder.equal(root.get("supplier").get("id"), supplierId);
        };
    }

    public static Specification<Product> hasCategoryId(Long categoryId) {
        return (root, query, builder) -> {
            if (categoryId == null) return null;
            return builder.equal(root.get("category").get("id"), categoryId);
        };
    }

    public static Specification<Product> fromMinPrice(Integer minPrice) {
        return (root, query, builder) -> {
            if (minPrice == null) return null;
            return builder.greaterThanOrEqualTo(root.join("allPrice").get("mainPrice"), minPrice);
        };
    }

    public static Specification<Product> toMaxPrice(Integer maxPrice) {
        return (root, query, builder) -> {
            if (maxPrice == null) return null;
            return builder.lessThanOrEqualTo(root.join("allPrice").get("mainPrice"), maxPrice);
        };
    }

    public static Specification<Product> inPriceRange(List<Integer> prices) {
        if (prices == null || prices.isEmpty()) return null;
        Integer minPrice = prices.get(0) > 0 ? prices.get(0) : null;
        Integer maxPrice = prices.size() > 1 && prices.get(1) > 0 ? prices.get(1) : null;

        return Specification
                .where(fromMinPrice(minPrice))
                .and(toMaxPrice(maxPrice));
    }


    public static Specification<Product> build(ProductQuery query) {
        return Specification
                .where(likeFullText(query.getKeywords()))
                .and(hasSupplierId(query.getSupplier()))
                .and(hasCategoryId(query.getCategory()))
                .and(inPriceRange(query.getPrices()));
    }
}

