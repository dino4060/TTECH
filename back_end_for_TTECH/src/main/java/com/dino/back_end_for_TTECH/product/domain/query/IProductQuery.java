package com.dino.back_end_for_TTECH.product.domain.query;

import com.dino.back_end_for_TTECH.product.domain.model.ProductItemView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.util.List;

public interface IProductQuery {
    List<ProductItemView> searchByMultiParams(
            String keyword, List<Integer> categories, Integer[] priceRange
    );

    Page<ProductItemView> searchByMultiParams(
            @Nullable String keyword,
            @Nullable List<Integer> categories,
            @Nullable Integer[] priceRange,
            @NonNull Pageable pageable
    );
}
