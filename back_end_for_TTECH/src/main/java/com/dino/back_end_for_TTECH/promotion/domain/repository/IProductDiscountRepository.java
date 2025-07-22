package com.dino.back_end_for_TTECH.promotion.domain.repository;

import java.util.List;

import com.dino.back_end_for_TTECH.promotion.domain.ProductDiscount;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

public interface IProductDiscountRepository
        extends JpaRepository<ProductDiscount, Long>, JpaSpecificationExecutor<ProductDiscount> {

    List<ProductDiscount> findByProductId(@NonNull Long productId);

    @EntityGraph(attributePaths = { "discount" })
    List<ProductDiscount> findEagerByProductId(@NonNull Long productId);
}
