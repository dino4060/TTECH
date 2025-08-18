
package com.dino.back_end_for_TTECH.product.domain.repository;

import com.dino.back_end_for_TTECH.product.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    @EntityGraph(attributePaths = {
            "price",
            "price.skuPrices",
            "skus",
            "skus.inventory",
            "category",
            "supplier",
    })
    Page<Product> findAll(@NonNull Pageable pageable);

    List<Product> findBySerialNumber(int serialNumber);
}
