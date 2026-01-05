
package com.dino.back_end_for_TTECH.features.product.domain.repository;

import com.dino.back_end_for_TTECH.features.product.domain.Product;
import com.dino.back_end_for_TTECH.shared.domain.BaseRepository;

public interface ProductRepository extends BaseRepository<Product, Long> {

  @Override
  default String customModelName() {
    return Product.class.getName();
  }
}
