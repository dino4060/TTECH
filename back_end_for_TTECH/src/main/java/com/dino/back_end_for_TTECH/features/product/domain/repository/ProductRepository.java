
package com.dino.back_end_for_TTECH.features.product.domain.repository;

import com.dino.back_end_for_TTECH.features.product.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    @Query(value =
            "SELECT p FROM Product p " +
                    "LEFT JOIN FETCH p.price " +
                    "LEFT JOIN FETCH p.stock " +
                    "LEFT JOIN FETCH p.category " +
                    "LEFT JOIN FETCH p.series",
            countQuery = "SELECT COUNT(p) FROM Product p")
    Page<Product> findAllWithRelations(Pageable pageable);
}
