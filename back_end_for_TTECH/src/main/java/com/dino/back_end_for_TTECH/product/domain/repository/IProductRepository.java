
package com.dino.back_end_for_TTECH.product.domain.repository;

import com.dino.back_end_for_TTECH.product.domain.Product;
import com.dino.back_end_for_TTECH.product.domain.model.ProductProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface IProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    Page<ProductProjection> findAllProjectedBy(@NonNull Pageable pageable);

    @EntityGraph(attributePaths = {
            "skus",
            "skus.price",
            "skus.inventory"
    })
    Page<Product> findAllByShopSellerId(@NonNull Pageable pageable, @NonNull Long sellerId);

    @EntityGraph(attributePaths = {
            "price",
            "skus",
            "skus.price",
            "skus.inventory",
            "categoryBranch",
            "categoryBranch.level1Category",
            "categoryBranch.level2Category",
            "categoryBranch.level3Category",
            "shop"})
    Optional<Product> findWithSkusAndShopById(@NonNull Long id);
}
