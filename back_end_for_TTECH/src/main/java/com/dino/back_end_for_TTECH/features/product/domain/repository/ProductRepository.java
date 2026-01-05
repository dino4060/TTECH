
package com.dino.back_end_for_TTECH.features.product.domain.repository;

import com.dino.back_end_for_TTECH.features.product.domain.Product;
import com.dino.back_end_for_TTECH.shared.application.exception.NotFoundE;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

  default Product getByID(@NonNull Long id) {
    var product = this
        .findById(id)
        .orElseThrow(() -> new NotFoundE("Product not found with ID " + id));
    return product;
  }
}
