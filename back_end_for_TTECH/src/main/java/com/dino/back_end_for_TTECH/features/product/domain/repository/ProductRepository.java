
package com.dino.back_end_for_TTECH.features.product.domain.repository;

import com.dino.back_end_for_TTECH.features.product.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
}
