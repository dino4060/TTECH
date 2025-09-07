package com.dino.back_end_for_TTECH.promotion.domain.repository;

import java.util.List;

import com.dino.back_end_for_TTECH.promotion.domain.Sales;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

public interface IProductDiscountRepository
        extends JpaRepository<Sales, Long>, JpaSpecificationExecutor<Sales> {

    List<Sales> findByProductId(@NonNull Long productId);

    @EntityGraph(attributePaths = { "discount" })
    List<Sales> findEagerByProductId(@NonNull Long productId);
}
