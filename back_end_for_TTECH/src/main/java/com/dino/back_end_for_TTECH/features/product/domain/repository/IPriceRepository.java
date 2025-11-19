package com.dino.back_end_for_TTECH.features.product.domain.repository;

import com.dino.back_end_for_TTECH.features.product.domain.Price;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPriceRepository extends JpaRepository<Price, Long> {
}
