
package com.dino.back_end_for_TTECH.product.domain.repository;

import com.dino.back_end_for_TTECH.product.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface IProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    @Query(value =
            "SELECT p FROM Product p " +
                    "LEFT JOIN FETCH p.price price " +
                    "LEFT JOIN FETCH price.skuPrices " +
                    "LEFT JOIN FETCH p.skus s " +
                    "LEFT JOIN FETCH s.inventory " +
                    "LEFT JOIN FETCH p.category " +
                    "LEFT JOIN FETCH p.supplier",
            countQuery = "SELECT COUNT(p) FROM Product p")
    Page<Product> findAllWithRelations(Pageable pageable);
}
